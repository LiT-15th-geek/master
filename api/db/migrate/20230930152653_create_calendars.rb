class CreateCalendars < ActiveRecord::Migration[7.0]
  def change
    create_table :calendars do |t|
      t.string :team_title
      t.string :description
      t.string :user_id
      t.boolean :is_private
      t.boolean :is_delete

      t.timestamps
    end
  end
end
