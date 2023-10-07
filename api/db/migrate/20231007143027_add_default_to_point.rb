class AddDefaultToPoint < ActiveRecord::Migration[7.0]
  def change
    change_column_default :booked_user_schedules, :point, 0
  end
end
