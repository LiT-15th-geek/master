class AddColumnToBookedUserSchedules < ActiveRecord::Migration[7.0]
  def change
    add_column :booked_user_schedules, :point, :integer
    add_column :booked_user_schedules, :alive, :boolean
  end
end
