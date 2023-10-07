class ChangeDataCalendarIdToUserCalenders < ActiveRecord::Migration[7.0]
  def change
    change_column :user_calenders, :calendar_id, :integer, using: 'calendar_id::integer'
  end
end
