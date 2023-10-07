class EventsController < ApplicationController
  def show
    #pointsはロジックかけた後の結果
    # pointカラム未実装
    points = BookedUserSchedule.select(:startTime, :endTime, :point).where(event_id: params[:id]).sort_by(&:point).reverse



    bookedUser= BookedUser.find(params[:bookeduser_id])
    calendars = Calendar.where(id: bookedUser.calendar_id)

    schedule = []

    calendars.each do |calendar|
      events = Event.where(Calendar_id: calendar.id)
      events.each do |event|
        unless event.desidedtime.nil?
          eachSchedule = Event.select(:desidedTime, :event_title).find(event.id)
          eachSchedule >> schedule
        end
      end
    end

    targetEvent = Event.find(params[:id])
    members = BookedUser.joins(:priorities).select('booked_users.nickname, priorities.priority, priorities.must').where(id: params[:bookeduser_id])
    organizerQuestionArray =BookedUser.joins(question_answers: :question).select('booked_users.nickname, questions.answer').where(questions: {is_default: true} ).group(:title)
    participantQuestionArray = BookedUser.joins(question_answers: :question).select('questions.questionTitle, questions.id question_answers.answer').where(id: params[:bookeduser_id])

    render json:{
      targetEvent: targetEvent,
      members: members,
      organizerQuestionArray: organizerQuestionArray,
      participantQuestionArray: participantQuestionArray,
      schedule: schedule,
      points: points
    }


  end

  def answer

    request_data = JSON.parse(request.body.read, symbolize_names: true)
    targetQuestionAnswer = QuestionAnswer.find_or_initialize_by(BookedUser_id: request_data[:bookeduser_id], question_id: request_data[:question_id],answer: request_data[:answer])
    targetQuestionAnswer.update({
      BookedUser_id: request_data[:bookeduser_id],
      question_id: request_data[:question_id],
      answer: request_data[:answer]
    })
  end

  def decide
    request_data = JSON.parse(request.body.read, symbolize_names: true)
    targetEvent = Event.find_or_initialize_by(id: params[:id])
    targetEvent.update(desidedTime: request_data[:decidedTime])
  end

  def input
    request_data = JSON.parse(request.body.read, symbolize_names: true)
    if request_data[:bookedUser_id]
      BookedUserSchedule.create(BookedUser_id: request_data[:bookedUser_id],startTime: request_data[:startTime],endTime: request_data[:endTime],vague: request_data[:vague])
    end
end

  def edit
    targetEvent = Event.find(params[:id])
    members = BookedUser.joins(:priorities).select('booked_users.id, booked_users.nickname, priorities.priority, priorities.must').where(priorities: {event_id:params[:id]})
    questions = Question.joins(:event_questions).select('questions.id, questions.questionTitle, questions.is_default, event_questions.is_selected'),where(event_questions: {event_id: params[:id]})

    render json:{
      targetEvent: targetEvent,
      members: members,
      questions: questions
    }
  end


  def create
    request_data = JSON.parse(request.body.read, symbolize_names: true)

    event = Event.find_or_initialize_by(id: request_data[:event_id])
    event.update({
      Calendar_id: calendar_params,
      event_title: request_data[:event_title],
      description: request_data[:description],
      term_start_day: request_data[:term_start_day],
      term_end_day: request_data[:term_end_day],
      location: request_data[:location],
      user_id: request_data[:user_id],
      RequireTime: request_data[:requireTime],
      RequireSetting: false,
      is_delete: false
    })

    def calendar_params
      params.permit(:id)
    end

    members = request_data[:members]
    members.each do |member|
      priority = Priority.find_or_initialize_by(BookedUser_id: member[:id])
      priority.update({
                        bookedUser_id: member[:id],
                        event_id: event.id,
                        priority: member[:priority],
                        must: member[:must]
                      })
    end

    addQuestions = request_data[:additionalQuestions]
    addQuestions.each do |addQuestion|
      additionalQuestion = Questions.find_or_initialize_by(questionTitle: addQuestion)
      additionalQuestion.update(questionTitle: addQuestion, is_default: false)

      addEventQuestions = EventQuestions.find_or_initialize_by(question_id: additionalQuestion.id)
      addEventQuestions.update({question_id: additionalQuestion.id, event_id: request_data[:event_id]})
    end

    defaultQuestions = request_data[:defaultQuestions]
    defaultQuestions.each do |question|
    eventQuestion= EventQuestion.find_or_initialize_by(questions_id: question[:question_id], event_id: request_data[:event_id])
      eventQuestion.update({
                        question_id: question[:question_id],
                        event_id: request_data[:event_id],
                        is_selected: question[:is_selected]
                      })
    end
  end

  #計算ロジック
  def calculate(event_id)
    #Mustユーザーの入力したスケジュール全件取得
    must_ids = Priority.where(event_id: event_id, must: true).BookedUser_id
    must_records = BookedUserSchedule.where(BookedUser_id: must_ids)

    requireTime = Event.find(event_id).RequireTime * 3600

    #取得した全レコードの時間範囲が所要時間以上か確認
    must_records.each do |must_record|
      startTime = must_record.startTime.to_i
      endTime = must_record.endTime.to_i
      if endTime - startTime < requireTime
        BookedUserSchedule.find(must_record.id).alive = false
      end
    end

    event_records = BookedUserSchedule.where(event_id: event_id)

    Must_number = Priority.where(event_id: event_id, must: true).count
    if Must_number >= 2
      event_records.where(alive: true).each do |record1|
        date_value = record1.startTime.strftime('%Y-%m-%d')
        event_records.where("DATE(startTime) = ? and alive = ?", date_value, true).each do |record2|
          next if record1 == record2
          STARTTIME = record1.startTime.to_i
          ENDTIME = record1.endTime.to_i
          starttime = record2.startTime.to_i
          endtime = record2.endTime.to_i
          #パターン2の比較
          if starttime < STARTTIME && STARTTIME < endtime && endtime < ENDTIME
            if endtime - STARTTIME < requireTime
              other_records = event_records.where("DATE(startTime) = ? and alive = ? and BookedUser_id = ?", date_value, true, record1.BookedUser_id)
              if other_records.nil?
                BookedUserSchedule.find(record2.id).alive = false
              else
                FLAG = 0
                other_records.each do |other_record|
                  if other_record.endTime < STARTTIME && starttime < other_record.endTime
                    if other_record.endTime - starttime > requireTime
                      FLAG = 1
                    end
                  else
                    BookedUserSchedule.find(record2.id).alive = false
                  end
                end
                if FLAG = 0
                  BookedUserSchedule.find(record2.id).alive = false
                end
              end
            end
          #パターン3の比較
          elsif STARTTIME < starttime && starttime < ENDTIME && ENDTIME < endtime
            if ENDTIME - starttime < requireTime
              other_records = BookedUserSchedule.where("DATE(startTime) = ? and alive = ? and BookedUser_id = ?", date_value, true, record1.BookedUser_id)
              if other_records.nil?
                BookedUserSchedule.find(record2.id).alive = false
              else
                FLAG = 0
                other_records.each do |other_record|
                  if ENDTIME < other_record.startTime && other_record.startTime < endtime
                    if endtime - other_record.startTime > requireTime
                      FLAG = 1
                    end
                  else
                    BookedUserSchedule.find(record2.id).alive = false
                  end
                end
                if FLAG = 0
                  BookedUserSchedule.find(record2.id).alive = false
                end
              end
            end
          #パターン4の比較
          elsif STARTTIME < starttime && endtime < ENDTIME
            if endtime - starttime < requireTime
              BookedUserSchedule.find(record2.id).alive = false
            end
          end
        end
      end
    end

    #生き残りレコードに対して参加者ごとの点数を加算していく
    alive_records = BookedUserSchedule.where(event_id: event_id, alive: true)

    alive_records.each do |alive_record|
      normal_records = event_records.where.not(Priority: nil) #Mustユーザー以外のユーザー取得
      normal_records.each do |normal_record|
        priority_point = Priority.where(event_id: event_id, BookedUser_id: normal_record.BookedUser_id).priority
        vague_point = priority_point - 0.5
        STARTTIME = alive_record.startTime.to_i
        ENDTIME = alive_record.endTime.to_i
        starttime = normal_record.startTime.to_i
        endtime = normal_record.endTime.to_i
        added_record = BookedUserSchedule.find(alive_record.id)
        #パターン1
        if starttime < STARTTIME && ENDTIME < endtime
          if normal_record.vague == true
            added_record.update(point: added_record.point + vague_point)
          else
            added_record.update(point: added_record.point + priority_point)
          end
        #パターン2
        elsif starttime < STARTTIME && STARTTIME < endtime && endtime < ENDTIME
          if endtime - STARTTIME > requireTime
            if normal_record.vague == true
              added_record.update(point: added_record.point + vague_point)
            else
              added_record.update(point: added_record.point + priority_point)
            end
          end
        #パターン3
        elsif STARTTIME < starttime && starttime < ENDTIME && ENDTIME < endtime
          if ENDTIME - starttime > requireTime
            if normal_record.vague == true
              added_record.update(point: added_record.point + vague_point)
            else
              added_record.update(point: added_record.point + priority_point)
            end
          end
        #パターン4
        elsif STARTTIME < starttime && endtime < ENDTIME
          if endtime - starttime > requireTime
            if normal_record.vague == true
              added_record.update(point: added_record.point + vague_point)
            else
              added_record.update(point: added_record.point + priority_point)
            end
          end
        end
      end
    end
  end
end
