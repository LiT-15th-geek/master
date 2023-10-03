class CreateBookedUserSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :booked_user_schedules do |t|
      t.integer :event_id
      t.integer :BookedUser_id
      t.datetime :startTime
      t.datetime :endTime
      t.boolean :vague

      t.timestamps
    end
  end
end
