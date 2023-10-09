
Event.delete_all()
# BookedUser.delete_all()
# Calendar.delete_all()
users = [
    { id:"aaa",name: "たけし", icon: "https://example.com/images/soccer.png" },
    { id:"bbb",name: "さおり",  icon: "https://example.com/images/volleyball.png" },
    { id:"ccc",name: "たろう", icon: "https://example.com/images/baseball.png" }
]



booked_users = [
  { calendar_id: 1, nickname: "マエヒロ", password: "lifeistech1", user_id: "uuid1"},
  { calendar_id: 2, nickname: "ピリ", password: "lifeistech2", user_id: "uuid2"},
  { calendar_id: 3, nickname: "かわすけ", password: "lifeistech3", user_id: "uuid3"}
]

#  users.each do |user|
#     #  ハッシュのキーを利用した分割代入
#      id, name,icon = user.values_at(:id,:name,:icon)
#    User.create(id:id,name: name, icon: icon)
#  end

calendars = [
    { team_title: "WebS 15h", description: "Lit WebS15h", user_id: "aaa", is_private: false, is_delete: false},
    { team_title: "iPhone 15h", description: "Lit iPhone15h", user_id: "bbb", is_private: false, is_delete: false},
    { team_title: "WebD 15h", description: "Lit WebD15h", user_id: "ccc", is_private: false, is_delete: false}
    # { id:"ggg", team_title: "Movie 15h", description: "Lit Movie15h", user_id: "ccc", is_private: false, is_delete: false}
]

calendars.each do |calendar|
    team_title, description, user_id, is_private, is_delete = calendar.values_at(:team_title, :description, :user_id, :is_private, :is_delete)
    Calendar.create(team_title: team_title, description: description, user_id: user_id, is_private: is_private, is_delete: is_delete)
end

booked_users.each do |booked_user|
    calendar_id, nickname, password, user_id = booked_user.values_at(:calendar_id, :nickname, :password, :user_id)
    BookedUser.create(calendar_id: calendar_id, nickname: nickname, password: password, user_id: user_id)
end

events = [
  {Calendar_id: 1, event_title: "勉強会", description: "勉強会です", term_start_day: "2023-9-11", term_end_day: "2023-9-20", location: "discord", user_id: "aaa", RecurrenceSetting: false, RequireTime: 2, decidedTime: "2023-10-15", is_delete: false, created_at: "2023-9-1", updated_at: "2023-9-1"},
  {Calendar_id: 1, event_title: "大阪キャラバン", description: "bbb", term_start_day: "2023-10-10", term_end_day: "2023-10-11", location: "discord", user_id: "aaa", RecurrenceSetting: false, RequireTime: 2, decidedTime: "2023-10-15", is_delete: false, created_at: "2023-9-1", updated_at: "2023-9-1"},
  {Calendar_id: 1, event_title: "技育展", description: "bbb", term_start_day: "2023-10-10", term_end_day: "2023-10-11", location: "discord", user_id: "aaa", RecurrenceSetting: false, RequireTime: 2, decidedTime: "2023-9-15", is_delete: false, created_at: "2023-9-1", updated_at: "2023-9-1"}
]

events.each do |event|
    term_start_day = Date.parse(event[:term_start_day])
    term_end_day = Date.parse(event[:term_end_day])
    decidedTime = Date.parse(event[:decidedTime])

    Event.create({
                   Calendar_id: event[:Calendar_id],
                   event_title: event[:event_title],
                   description: event[:description],
                   term_start_day: term_start_day,
                   term_end_day: term_end_day,
                   location: event[:location],
                   user_id: event[:user_id],
                   RecurrenceSetting: event[:RecurrenceSetting],
                   RequireTime: event[:RequireTime],
                   decidedTime: decidedTime,
                   is_delete: event[:is_delete],
                   created_at: event[:created_at],
                   updated_at: event[:updated_at]
                 })
end