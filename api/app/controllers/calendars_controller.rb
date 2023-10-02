class CalendarsController < ApplicationController
    before_action :find_calendar, only: [:edit, :update, :destroy]

    def index
        render json: Calendar.all
    end

    #get 主催者
    def new
        @calendar = Calendar.new
    end

    def edit
        if @calendar.user_id != params[:user_id].to_i
            #Calendarが存在するけど、user_idが主催者のものではないから編集不可（エラー）
            render plain: 'Unauthorized', status: :Unauthorized
        else
            #Calendarが存在して、user_idも主催者のものと一致するため編集可
            #before_actionで書いてるけどもう一回書く必要ある、、？
            @calendar = Calendar.find_by(calendar_id: params[:calendar_id])
        end
    end

    #post 主催者
    def create
        #カレンダー新規作成
        @calendar = Calendar.new(team_title: params[:team_title], description: params[:description], user_id: params[:user_id], is_private: params[:is_private], is_delete: params[:is_delete])

        if @calendar.save
            #保存出来たらマイページにリダイレクト(user_pathは仮)
            redirect_to user_path
        end
    end

    def update
        if @calendar.user_id != params[:user_id].to_i
            #Calendarが存在するけど、user_idが主催者のものではないから編集不可（エラー）
            render plain: 'Unauthorized', status: :Unauthorized
        else
            #Calendarが存在して、user_idも主催者のものと一致するため編集
            #もう一回書く必要ある、、？
            @calendar = Calendar.update(team_title: params[:team_title], description: params[:description], user_id: params[:user_id], is_private: params[:is_private], is_delete: params[:is_delete])
        end
    end

    def destroy
        @calendar = Calendar.find_by(id: params[:id])
        if @calendar.nil?
          render plain: 'Calendar not found', status: :not_found
        elsif @calendar.user_id != params[:user_id].to_i
          render plain: 'Unauthorized', status: :unauthorized # :Unauthorized ではなく :unauthorized と小文字にする必要があります
        else
          @calendar.destroy
          render plain: 'Calendar deleted', status: :ok # deleted successfully ではなく :ok とする必要があります
        end
      end

    #get 参加者
    def show
        is_Private = Calendar.find(params[:id]).is_private
        nicknameArray = []
        nicknames = Calendar.joins(:bookedUser).select('nickname').where(id: params[:id])
        nicknames.each do |nickname|
            nicknameArray.push(nickname.nickname)
        end
    
        team_title = Calendar.find(params[:id]).team_title
        render json: {
          is_Private: is_Private,
          nicknames: nicknames,
          team_title: team_title
        }
    end

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

    def find_calendar
        @calendar = Calendar.find_by(calendar_id: params[:calendar_id])
    end

end
