Rails.application.routes.draw do
  #get '/user/:id', to: 'user#show', as: 'user'


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

  #参加/主催カレンダー一覧表示
  get '/user/:id/calendar/participate', to: 'calendars#participate'
  get '/user/:id/calendar/organize', to:  'calendars#organize'



  #ログイン/新規作成
  post '/user/new', to: 'user#login'
  #マイページ表示
  get '/user/:id/home', to: 'user#home'
  #プロフィール編集画面
  get '/user/:id/settings', to:'user#edit'
  #プロフィール編集を保存
  post '/user/:id/settings', to:'user#update'

  #イベントのトップ画面表示
  get '/event/:id/top/:bookedUser_id', to:'event#show'
  #質問に解答した時
  post '/event/:id/answer', to: 'event#answer'
  #開催日時の決定
  post '/event/:id/decide', to: 'event#decide'
  #日付入力
  post '/event/:id/input', to:'event#input'
  #イベント編集画面表示
  get '/event/:id/input', to:'event#edit'
  #イベント新規作成・保存
  post '/calendar/:id/event/save', to:'event#create'

end
