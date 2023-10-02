users = [
    { id:"aaa",name: "たけし", email: "takeshi@example.com", icon: "https://example.com/images/soccer.png" },
    { id:"bbb",name: "さおり", email: "saori@example.com",  icon: "https://example.com/images/volleyball.png" },
    { id:"ccc",name: "たろう", email: "taro@example.com", icon: "https://example.com/images/baseball.png" }
]

booked_users = [
  { calendar_id: 1, nickname: "マエヒロ", password: "lifeistech", user_id: "uuid"}
]

# users.each do |user| 
    # ハッシュのキーを利用した分割代入
    # id, name,email,icon = user.values_at(:id,:name,:email,:icon)
#   User.create(id:id,name: name, email: email, icon: icon)
# end

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