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
  delete '/calendar/:id', to: 'calendars#exit'
  #カレンダー削除（主催者）
  delete '/calendar/:id', to: 'calendars#destroy'
  #カレンダー編集画面表示
  get '/calendar/:id/edit', to: 'calendars#edit'
  #カレンダー新規作成画面表示
  #get '/calendar/new', to: 'calendars#new'
  #カレンダー編集
  put '/calendar/:id/edit', to: 'calendars#update'
  #カレンダー作成
  post 'calendar/new', to: 'calendars#create'
  #カレンダー作成しました画面
  get '/calendar/new/:id', to: 'calendars#created'

  #ログイン/新規作成
  post '/user/new', to: 'user#login'
  #マイページ表示
  get '/user/:id/home', to: 'user#home'
  #プロフィール編集画面
  get '/user/:id/settings', to:'user#edit'
  #プロフィール編集を保存
  post '/user/:id/settings', to:'user#update'

end
