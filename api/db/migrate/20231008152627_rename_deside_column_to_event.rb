class RenameDesideColumnToEvent < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :desidedTime, :decidedTime
  end
end
