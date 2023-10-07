class CreatePriorities < ActiveRecord::Migration[7.0]
  def change
    create_table :priorities do |t|
      t.integer :BookedUser_id
      t.integer :event_id
      t.integer :priority
      t.boolean :must

      t.timestamps
    end
  end
end
