class UserController < ApplicationController
    def index
        render json: User.all
    end
    
    def show
        render json: User.where(id:params[:id])
    end
    def user_params
        params.permit(:id)
    end

    def Bookeduser_params
        params.permit(:user_id)
    end

    def login
        request_data = JSON.parse(request.body.read, symbolize_names: true)
        if request_data[:status] == true
            #新規の場合、Userテーブルにid登録
            User.create(id: user_params)
        end
        if request_data[:bookedUser_id]
            #招待URL踏んで入った時、bookeduserのuser_id登録
            BookedUser.find(request_data[:bookedUser_id]).update(Bookeduser_params)

            #招待URL踏んで入った時、UserCalendarにuser_id登録
            calendar_id = Bookeduser.find(request_data[:bookedUser_id]).calendar_id
            UserCalendar.create(user_id: user_params, calendar_id: calendar_id)
            render json: {invite: true, calendar_id: calendar_id}
        else
            #いきなりログインページにアクセスされた
            render json: {invite: false}
        end
    end


    def home
        targetUser = User.find(params[:id])
        allCalendars = Calendar.where(user_id: params[:id])

        participateCalendars = Calendar.joins(:bookedUsers).where(booked_users:{ user_id: params[:id]}).select('id, team_title')
        participateCalendars.each do |participateCalendar|
            peventNumber = Event.where(calendar_id: participateCalendar.id).count
            participateCalendar.merge(count: peventNumber)
        end

        organizeCalendars = Calendar.where(user_id: params[:id]).select('id, team_title')
        organizeCalendars.each do |organizeCalendar|
            oeventNumber = Event.where(calendar_id: organizeCalendar.id).count
            organizeCalendar.merge(count: oeventNumber)
        end
        allEvents = []
        allCalendars.each do |eachCalendar|
            allEvents << Event.where(calendar_id: eachCalendar.id).select('id, title, decidedTime')
        end

        render json: {userInfo: targetUser,
                      participateCalendars: participateCalendars,
                      organizeCalendars: organizeCalendars,
                      calendarElements: allEvents}
    end

    def edit
        targetUser = User.find(params[:id]).select('name, icon')
        targetUserAnswers = UserAnswer.joins(:questions).where(questions: {is_default: true},user_id: params[:id]).select('questionTitle, answer')
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
        targetUser.update(editUser_params)

        #質問の答えをUserAnswerに登録
        answer = UserAnswer.find_or_initialize_by(user_id: params[:id],question_id: request_data[:questionAnswers][:id])
        answer.update(
            user_id: params[:id],
            question_id: request_data[:id],
            answer: request_data[:answer]
        )

    end
end
