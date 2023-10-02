class CreateBookedUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :booked_users do |t|
      t.integer :calendar_id
      t.string :nickname
      t.string :password
      t.string :user_id

      t.timestamps
    end
  end
end
