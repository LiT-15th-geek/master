class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.integer :Calendar_id
      t.string :event_title
      t.string :description
      t.date :term_start_day
      t.date :term_end_day
      t.string :location
      t.string :user_id
      t.boolean :RecurrenceSetting
      t.integer :RequireTime
      t.datetime :desidedTime
      t.boolean :is_delete

      t.timestamps
    end
  end
end
