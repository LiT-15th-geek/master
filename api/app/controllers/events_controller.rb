class EventsController < ApplicationController
  def show
    #pointsはロジックかけた後の結果
    points = BookedUserSchedule.select(:start_time, :end_time,:point).where(event_id: params[:id]).sort_by(&:point).reverse
    bookedUser= BookedUser.find(params[:bookedUser_id])
    calendars = Calendar.where(id: bookedUser.calendar_id)

    schedule = []

    calendars.each do |calendar|
      events = Event.where(calendar_id: calendar.id)
      events.each do |event|
        if event.decidedDate.nil?
        else
          eachSchedule = Event.select(:decidedDate, :title).find(event.id)
          eachSchedule >> schedule
        end
      end
    end

    targetEvent = Event.find(params[:id])
    members = BookedUser.joins(:Priority).select(:nickname, :priority, :must).where(id: params[:id])
    organizerQuestionArray =QuestionAnswer.joins(:questions, :bookedusers).select(:answer, :nickname).where(is_default: true).group(:title)
    participantQuestionArray = QuestionAnswer.joins(:questions, :bookedusers).select(:title,:answer,questions.id).where(bookedusers: {bookedUser_id: params[:bookeduser_id]})

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
    def answer_params
      params.permit(:id)
    end

    request_data = JSON.parse(request.body.read, symbolize_names: true)
    targetQuestionAnswer = QuestionAnswer.find_or_initialize_by(bookedUser_id: request_data[:bookedUser_id], question_id: request_data[:question_id],answer: request_data[:answer])
    targetQuestionAnswer.update({
      bookeduser_id: request_data[:bookeduser_id],
      question_id: request_data[:question_id],
      answer: request_data[:answer]
    })
  end

  def decide
    request_data = JSON.parse(request.body.read, symbolize_names: true)
    targetEvent = Event.find(params[:id])
    targetEvent.update(decidedTime: request_data[:decidedTime])
  end

  def input
    request_data = JSON.parse(request.body.read, symbolize_names: true)
    if request_data[:bookedUser_id]
    end
    BookedUserSchedule.create(bookedUser_id: request_data[:bookedUser_id],startTime: request_data[:startTime],endTime: request_data[:endTime],vague: request_data[:vague])
  end

  def edit
    targetEvent = Event.find(params[:id])
    members = BookedUser.joins(:Priority).select(:nickname, :priority, :must).where(id:params[:id])
    questions = Question.joins(:EventQuestions).select(:title, is_default, :is_selected),where(EventQuestions:{event_id: params[:id]})

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
      event_title: request_data[:event_title],
      description: request_data[:description],
      term_start_day: request_data[:term_start_day],
      term_end_day: request_data[:term_end_day],
      location: request_data[:location],
      user_id: request_data[:user_id],
      requireTime: request_data[:requireTime],
      requireSetting: false,
      is_delete: false
    })

    members = request_data[:members]
    members.each do |member|
      priority = Priority.find_or_initialize_by(id: member[:id])
      priority.update({
                        bookedUser_id: member[:bookeuUser_id],
                        event_id: request_data[:event_id],
                        priority: member[:priority],
                        must: member[:must]
                      })
    end

    addQuestions = request_data[:additionalQuestions]
    addQuestions.each do |addQuestion|
      additionalQuestion = Questions.find_or_initialize_by(title: addQuestion[:title])
      additionalQuestion.update(title: addQuestion[:title], is_default: false)

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
