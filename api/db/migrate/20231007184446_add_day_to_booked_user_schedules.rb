class AddDayToBookedUserSchedules < ActiveRecord::Migration[7.0]
  def change
    add_column :booked_user_schedules, :day, :date
  end
end
