class BookedUsersController < ApplicationController
  def show
    @bookedUsers = booked_users.where(calendar_id: params[:calendar_id])
    #targetCalender = calendars.where(calendar_id: params[:calendar_id])
  end

  def authenticate
    targetBookedUser = booked_users.where(calendar_id: params[:calendar_id], nickname: params[:nickname])
    if targetBookedUser.password == params[:password]
      #ログイン画面にリダイレクト
    else
      redirect_to action: :show, status: :unauthorised, notice: 'パスワードが違います'
    end
  end

end
