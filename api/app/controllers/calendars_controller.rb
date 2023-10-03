class CalendarsController < ApplicationController

    # #get 参加者
    # def show
    #     is_Private = Calendar.find(params[:id]).is_private
    #     nicknameArray = []
    #     nicknames = Calendar.joins(:bookedUser).select('nickname').where(id: params[:id])
    #     nicknames.each do |nickname|
    #         nicknameArray.push(nickname.nickname)
    #     end
    
    #     team_title = Calendar.find(params[:id]).team_title
    #     render json: {
    #       is_Private: is_Private,
    #       nicknames: nicknames,
    #       team_title: team_title
    #     }
    # end

    def authenticate
        targetBookedUser = Calendar.joins(:bookedUser).select('password,bookeduser.id').where(bookedusers: {nickname: params[:nickname]},id: params[:id])
        if targetBookedUser.password == params[:password]
            state = true
        else
            state = false
        end
    
        render json: {state: state}
    end

    def top
        targetCalendar = Calender.where(id:params[:id]).select('team_title, description, user_id')
        nicknameArray = []
        nicknames = Bookeduser.where(calendar_id: params[:id]).select('nickname')
        nicknames.each do |nickname|
            nicknameArray.push(nickname.nickname)
        end
        targetEvents = Event.joins(:BookedUserSchedule).where(booked_user_schedules: {id: session[:bookeduser_id]}).select('title, decidedTime')
        futureEvents = []
        pastEvents = []

        targetEvents.each do |targetEvent|
            if targetEvent.decidedTime.nil? || targetEvent.decidedTime > DateTime.now
                futureEvents << targetEvent
            else
                pastEvents << targetEvent
            end

        end

        render json: {
          calendar: targetCalendar,
          members: nicknameArray,
          futureEvents: futureEvents,
          pastEvents: pastEvents
        }
    end

    def exit
        booked_user = BookedUser.find_by(id: session[:id])
        if booked_user
            #user_calendarからデータ消去
            user_id = booked_user.user_id
            if user_id
                user_calendar = UserCalendar.where(user_id: user_id, calender_id: params[:id])
                user_calendar.destroy
            end
            #bookeduserからデータ消去
            booked_user.destroy

            render json: {state: true}
        else
            render json: {state: false}
        end
    end

    def destroy
        calendar = Calendar.find(params[:id])

        if calendar.user_id == session[:user_id]
            #カレンダーが正常に論理削除される処理
            calendar.is_delete = true
            render json: {state: true}
        else
            #論理削除できなかった場合
            render json: {state: false}
        end    
    end

    def edit
        calendar = Calendar.find(params[:id])

        is_Private = calendar.is_Private

        nicknameArray = []
        nicknames = Calendar.joins(:bookedUser).select('nickname').where(id: params[:id])

        nicknames.each do |nickname|
            nicknameArray.push(nickname.nickname)
        end

        team_title = calendar.team_title
        description = calendar.description

        render json: {
            is_Private: is_Private,
            nicknames: nicknames,
            team_title: team_title
            description: description
        }
    end

    def new
        @calendar = Calendar.new

        rendar json: @calendar.to_json(only:[:team_title, :description, :is_Private])
    end

    def update
        calendar = Calendar.find(params[:id])

        if calendar.user_id == session[:user_id]
            #カレンダー更新 チーム名と説明のみ更新可（is_privateとbookeduserは更新不可）
            updated_calendar = calendar.update(calendar_params)
            #正常に更新できた場合trueを返す
            render json: {state: true}
        else
            #user_idが主催者のものではないため、正常に更新できない場合falseを返す
            render json: {state: false}
        end

        redirect_to home/:user_id
    end
    
    def create
        #bookeduserがuser_idを持っていたら（アカウントを持っていたら）カレンダー作成可
        if bookedUser.find(session[:user_id]).user_id
            calendar = calendar.create(calendar_params.merge(user_id: session[:user_id], is_delete:false))

            nicknameArray = params[:nicknameArray]
            nicknameArray.each do |nickname|
                random_password = generate(6)

                new_bookeduser = bookedUser.create(calendar_id: calendar.id, nickname: nickname, user_id: session[:user_id])
                if calendar.is_private
                    random_password = generate_random_password(6)
                    bookedUser.find(new_bookeduser.id).update(password: random_password)
                end
            end
            render json: {state: true}
        else
            render json: {state: false}
        end
    end

    #calendar paramsからデータ取り出し
    def calendar_params
        params.require(:calendar).permit(:team_title, :description, :is_private)
    end

    #ランダムパスワード生成　require sequrerandomが必要
    def generate_random_password(length)
        characters = ('a'..'z').to_a + ('A'..'Z').to_a + ('0'..'9').to_a
        password = ''
        length.times { password << characters[SecureRandom.random_number(characters.length)] }
        password
    end

end
