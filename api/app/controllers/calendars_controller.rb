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

    #delete 主催者
    def destroy
        if @calendar.nil?
            render plain: 'Calendar not found', status: :not_found
        elsif @calendar.user_id != params[:user_id].to_i
            render plain: 'Unauthorized', status: :Unauthorized
        else
            @calendar.destroy
            render plain: 'Calendar deleted', status: deleted successfully
        end
    end

    #get 参加者
    def show
        @calendar = Calendar.find_by(calendar_id: params[:calendar_id])
        @user = bookedUser.find_by(id: params[:bookedUser_id])
    end

    def find_calendar
        @calendar = Calendar.find_by(calendar_id: params[:calendar_id])
    end

end
