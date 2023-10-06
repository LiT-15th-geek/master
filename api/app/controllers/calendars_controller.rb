class CalendarsController < ApplicationController

    # #get 参加者
    def show
        is_Private = Calendar.find(params[:id]).is_private

        nicknameArray = []
        nicknames = Calendar.joins(:booked_users).select(:nickname).where(id: params[:id])
        nicknames.each do |nickname|
            nicknameArray.push(nickname.nickname)
        end
        #users = Calendar.joins(:bookedUser).select(:nickname, :password).where(id: params[:id])
        team_title = Calendar.find(params[:id]).team_title
         render json: {
           is_Private: is_Private,
           nicknameArray: nicknameArray,
           team_title: team_title
         }
    end

    def authenticate
        request_data = JSON.parse(request.body.read, symbolize_names: true)
        targetBookedUser = Calendar.joins(:booked_users).select(:password,:booked_user.id).find(booked_users: {nickname: request_data[:nickname]},id: params[:id])
        if targetBookedUser.password == request_data[:password]
            render json: {state: true, bookedUser_id: targetBookedUser.id}
        else
            render json: {state: false}
        end
    end

    def top
        users = BookedUser.select(:nickname, :password).where(calendar_id: params[:id])
        targetCalendar = Calendar.select(:team_title, :description, :user_id).find_by(id: params[:id])
        targetEvents = Event.select(:event_title, :desidedTime).where(Calendar_id: params[:id])
        futureEvents = []
        pastEvents = []

        current_time = Time.current
        # p targetEvents
        targetEvents.each do |targetEvent|
            if targetEvent.desidedTime.nil? || targetEvent.desidedTime > current_time
                futureEvents << targetEvent

            elsif targetEvent.desidedTime < current_time
                pastEvents << targetEvent
            end
        end

        render json: {
          calendar: targetCalendar,
          users: users,
          futureEvents: futureEvents,
          pastEvents: pastEvents
        }
    end

    def exit
        request_data = JSON.parse(request.body.read, symbolize_names: true)
        booked_user = BookedUser.find_by(id: request_data[:bookedUser_id])
        if booked_user
            #user_calendarからデータ消去
            user_id = booked_user.user_id
            if user_id
                user_calendar = UserCalendar.where(user_id: user_id, calendar_id: params[:id])
                user_calendar.destroy
            end
            #bookedUserからデータ消去
            booked_user.destroy
            targetPriority = Priority.find_by(bookedUser_id: request_data[:bookedUser_id])
            targetPriority.destroy
            targetQuestionAnswers = QuestionAnswer.where(bookedUser_id: request_data[:bookedUser_id])
            targetQuestionAnswers.each do |targetQuestionAnswer|
                targetQuestionAnswer.destroy
            end
            render json: {state: true}
        else
            render json: {state: false}
        end
    end

    def destroy
        request_data = JSON.parse(request.body.read, symbolize_names: true)
        calendar = Calendar.find(params[:id])

        if calendar.user_id == request_data[:user_id]
            #カレンダーが正常に論理削除される処理
            calendar.is_delete = true
            render json: {state: true}
        else
            #論理削除できなかった場合
            render json: {state: false}
        end    
    end
    #topと被っちゃってるかも…編集はモーダルだからgetいらないらしい。eventの情報があるからtop使ったほうがいいかもまじごめん
    #def edit
    #    calendar = Calendar.find(params[:id])
    #
    #   is_Private = calendar.is_Private
    #
    #    nicknameArray = []
    #    nicknames = Calendar.joins(:bookedUser).select('nickname').where(id: params[:id])

    #    nicknames.each do |nickname|
    #        nicknameArray.push(nickname.nickname)
    #    end

    #    team_title = calendar.team_title
    #    description = calendar.description

    #    render json: {
    #        is_Private: is_Private,
    #       nicknames: nicknames,
    #       team_title: team_title,
    #        description: description
    #    }
    #end

    #def new
    #    @calendar = Calendar.new

    #    rendar json: @calendar.to_json(only:[:team_title, :description, :is_Private])
    #end

    def update
        request_data = JSON.parse(request.body.read, symbolize_names: true)
        calendar = Calendar.find(params[:id])

        if calendar.user_id == request_data[:user_id]
            #カレンダー更新 チーム名と説明のみ更新可（is_privateとbookeduserは更新不可）
            updated_calendar = calendar.update(team_title: request_data[:team_title], description: request_data[:description])
            #正常に更新できた場合trueを返す
            if updated_calendar
                render json: {state: true}
            else
                render json: {state: false}
            end
        else
            #user_idが主催者のものではないため、正常に更新できない場合falseを返す
            render json: {state: false}
        end
        #画面遷移はフロントでやるらしい？
        #redirect_to home/:user_id
    end
    
    def create
        request_data = JSON.parse(request.body.read, symbolize_names: true)
        #bookeduserがuser_idを持っていたら（アカウントを持っていたら）カレンダー作成可
        # ログインしてるかフロントで判定&表示してもらったほうがいいかも
        #if bookedUser.find(session[:user_id]).user_id
            calendar = Calendar.create(user_id: request_data[:user_id], team_title: request_data[:team_title], description: request_data[:description],is_private: request_data[:is_private], is_delete:false)

            nicknameArray = request_data[:nicknameArray]
            nicknameArray.each do |nickname|
                #random_password = generate(6)
                new_bookeduser = BookedUser.create(calendar_id: calendar.id, nickname: nickname)
                if calendar.is_private
                    random_password = generate_random_password(6)
                    BookedUser.find(new_bookeduser.id).update(password: random_password)
                end
            end
            render json: {state: true, calendar_id: calendar.id}
        #else
            render json: {state: false}
        #end
    end
    #カレンダーを作成しました画面
    def created
        targetCalendar = Calendar.find(params[:id])
        bookedusers = BookedUser.select(:nickname, :password, :user_id).where(calendar_id: params[:id])
        if targetCalendar.is_Private == true
            render json:{ bookedUsers: bookedusers }
        end
    end

    #ランダムパスワード生成　require sequrerandomが必要
    def generate_random_password(length)
        characters = ('a'..'z').to_a + ('A'..'Z').to_a + ('0'..'9').to_a
        password = Array.new(length) { characters.sample }.join
        #password = ''
        #length.times { password << characters[SecureRandom.random_number(characters.length)] }
        password
    end


    def participate
        responseArray = []

        calendars = Calendar.joins(:booked_users).select(:title, :id).where(booked_users: { user_id: params[:id] })
        calendars.eah do |calendar|
            iconArray = []
            users = BookedUser.where(calendar_id: calendar.id)
            users.each do |user|
                unless user.user_id.nil?
                    iconArray << user.icon
                end
            end

            eventsArray = []
            events = Event.where(Calendar_id: calendar.id)
            events.each do |event|
                eventsArray << {title: event.event_title, id: event.id}
            end

            responseArray << {calendar: calendar, icon: iconArray, event: eventsArray}
        end

        render json: responseArray
    end

    def organize
        responseArray = []

        calendars = Caleder.select(:title, :id).where(user_id: params[:id])
        calendars.eah do |calendar|
            iconArray = []
            users = BookedUser.where(calendar_id: calendar.id)
            users.each do |user|
                unless user.user_id.nil?
                    iconArray << user.icon
                end
            end

            eventsArray = []
            events = Event.where(Calendar_id: calendar.id)
            events.each do |event|
                eventsArray << {title: event.event_title, id: event.id}
            end

            responseArray << {calendar: calendar, icon: iconArray, event: eventsArray}
        end

        render json: responseArray
    end

end
