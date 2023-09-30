# Project

## 起動

# Rails
/api内に存在します。
先頭に`docker exec -it コンテナ名`をつける 91a45eb70415be1374aa87b63302d91e16414ac4d290ed3e83a7e1fce5eec479
## model create
```
docker exec -it コンテナ名 rails g model 名前 カラム:型 
```
例
```
docker exec -it コンテナ名 rails g model User name:string email:string icon:string
```
## migrate
```
docker exec -it コンテナ名 rails db:migrate    
```

## seeds(仮のデータを流し込む)
`./db/seeds.rb`に書き込む(書いてあるものが参考になると思います)

```
docker exec -it コンテナ名 rails db:seed
```

## routing
`./config/routes.rb`に書き込む

### get
例
```
get '/user/:id', to: 'users#show', as: 'user'
```
toでアクションを指定。asで名前をつけ、以後使いやすくする

## Controller
```
docker exec -it コンテナ名 rails g controller Users
```
できたコントローラーに以下のようにアクションを追加
例
```
def show
 user = User.find_by(id:user_id)
 render status: 200, json: { user: user }
end
```