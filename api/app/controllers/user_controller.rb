class UserController < ApplicationController
    def index
        render json: User.all
    end
    
    def show
        render json: User.where(id:params[:id])
    end

    def login
        request_data = JSON.parse(request.body.read, symbolize_names: true)
        if request_data[:status] == true
            #新規の場合、Userテーブルにid登録
            User.create(id: request_data[:user_id])
        end
        if request_data[:bookedUser_id]
            #招待URL踏んで入った時、bookeduserのuser_id登録
            BookedUser.find(request_data[:bookedUser_id]).update(request_data[:user_id])

            #招待URL踏んで入った時、UserCalendarにuser_id登録
            calendar_id = BookedUser.find(request_data[:bookedUser_id]).calendar_id
            UserCalendar.create(user_id: request_data[:user_id], calendar_id: calendar_id)

            #招待URL踏んで入ってきた時、UserAnswerをQuestionAnswerに登録
            userAnswers = UserAnswer.where(id: request_data[:user_id])
            if userAnswers
                userAnswers.each do |userAnswer|
                    QuestionAnswer.create(question_id: userAnswer.question_id, BookedUser_id: request_data[:bookedUser_id], answer: request_data[:answer])
                end
            end

            render json: {invite: true, calendar_id: calendar_id}
        else
            #いきなりログインページにアクセスされた
            render json: {invite: false}
        end
    end


    def home
        targetUser = User.find(params[:id])
        allCalendars = Calendar.where(user_id: params[:id])

        participateCalendars = Calendar.joins(:booked_users).select(:id, :team_title).where(booked_users:{ user_id: params[:id] })
        participateCalendars.each do |participateCalendar|
            peventNumber = Event.where(calendar_id: participateCalendar.id).count
            participateCalendar.merge(count: peventNumber)
        end

        organizeCalendars = Calendar.where(user_id: params[:id]).select(:id, :team_title)
        organizeCalendars.each do |organizeCalendar|
            oeventNumber = Event.where(calendar_id: organizeCalendar.id).count
            organizeCalendar.merge(count: oeventNumber)
        end
        allEvents = []
        allCalendars.each do |eachCalendar|
            allEvents << Event.where(calendar_id: eachCalendar.id).select(:id, :title, :desidedTime)
        end

        render json: {userInfo: targetUser,
                      participateCalendars: participateCalendars,
                      organizeCalendars: organizeCalendars,
                      calendarElements: allEvents}
    end

    def edit
        targetUser = User.select(:name, :icon).find(params[:id])
        targetUserAnswers = Question.joins(:user_answers).select(:questionTitle, :answer, :id).where(user_answers: {user_id: params[:id]}, is_default: true)
        render json: {userInfo: targetUser, questionAnswers: targetUserAnswers}
    end

    def editUser_params
        params.permit(:name, :icon)
    end

    def qanda_params
        params.require(:questionAnswers).permit(:id, :answer)
    end
    def update
        request_data = JSON.parse(request.body.read, symbolize_names: true)
        #Userの情報を更新
        targetUser = User.find(params[:id])
        targetUser.update(nickname: request_data[:name], icon: request_data[:icon])

        #質問の答えをUserAnswerに登録
        answer = UserAnswer.find_or_initialize_by(user_id: params[:id],question_id: request_data[:questionAnswers][:id])
        answer.update(
            user_id: params[:id],
            question_id: request_data[:questionAnswers][:id],
            answer: request_data[:questionAnswers][:answer]
        )

    end
end
