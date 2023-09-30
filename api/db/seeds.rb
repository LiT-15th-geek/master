users = [
    { id:"aaa",name: "たけし", email: "takeshi@example.com", icon: "https://example.com/images/soccer.png" },
    { id:"bbb",name: "さおり", email: "saori@example.com",  icon: "https://example.com/images/volleyball.png" },
    { id:"ccc",name: "たろう", email: "taro@example.com", icon: "https://example.com/images/baseball.png" }
]

users.each do |user| 
    # ハッシュのキーを利用した分割代入
    id, name,email,icon = user.values_at(:id,:name,:email,:icon)
  User.create(id:id,name: name, email: email, icon: icon)
end