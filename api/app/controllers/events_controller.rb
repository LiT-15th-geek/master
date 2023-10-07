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

end
