Rails.application.routes.draw do
  get '/user/:id', to: 'user#show', as: 'user'

  get '/booked_users/:calendar_id', to: 'booked_users#show'
  post '/booked_users/:calendar_id/:nickname/:password', to: 'booked_users#authenticate'

end
