Rails.application.routes.draw do
  get '/user/:id', to: 'user#show', as: 'user'

  #主催者のカレンダートップ画面表示
  get '/calendar/organizer/:user_id/:calendar_id/top', to: 'calendars#show', as: 'calendar'
  #主催者が新しくカレンダーを作る画面を表示
  get '/calendar/organizer/:user_id/new', to: 'calendars#new', as: 'new_calendar'
  #主催者がすでにあるカレンダーの編集画面を表示
  get '/calendar/organizer/:user_id/edit/:calendar_id', to: 'calendars#edit', as: 'edit_calendar'

  #主催者が新しくカレンダーを作成
  post '/calendar/organizer/:user_id/new', to: 'calendars#create'
  #主催者がすでにあるカレンダーを編集
  post '/calendar/organizer/:user_id/edit/:calendar_id', to: 'calendars#update'

  #主催者がすでにあるカレンダーを削除
  delete '/calendar/organizer/:user_id/delete/:calendar_id', to: 'calendars#destroy'

  #参加者が自分が参加しているカレンダーを表示
  get '/calendar/participant/:calendar_id/:bookedUser_id', to: 'calendars#show', as: 'calendar'

  get '/booked_users/:calendar_id', to: 'booked_users#show'
  post '/booked_users/:calendar_id/:nickname/:password', to: 'booked_users#authenticate'

end
