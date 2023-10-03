Rails.application.routes.draw do
  get '/user/:id', to: 'user#show', as: 'user'


  #参加者が自分が参加しているカレンダーを表示
  # get '/calendar/participant/:calendar_id/:bookedUser_id', to: 'calendars#show'

  #URL踏んだ後名前選択画面
  get '/calendar/:id/bookedUser', to: 'calendars#show'
  put '/calendar/:id/bookedUser', to: 'calendars#authenticate'

  #カレンダーのトップ画面(主催者&参加者)
  get '/calendar/:id', to: 'calendars#top'
  #カレンダー退出
  delete '/calendar/:id', to: 'calendar#exit'
  #カレンダー削除（主催者）
  delete '/calendar/:id', to: 'calendar#destroy'
  #カレンダー編集画面表示
  get '/calendar/:id/edit', to: 'calendar#edit'
  #カレンダー新規作成画面表示
  get '/calendar/new', to: 'calendar#new'
  #カレンダー編集
  put '/calendar/:id/edit', to: 'calendar#update'
  #カレンダー作成
  post 'calendar/new', to: 'calendar#create'

end
