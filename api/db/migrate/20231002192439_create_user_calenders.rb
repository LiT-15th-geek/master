class CreateUserCalenders < ActiveRecord::Migration[7.0]
  def change
    create_table :user_calenders do |t|
      t.string :user_id
      t.string :calendar_id

      t.timestamps
    end
  end
end
