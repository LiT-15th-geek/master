class CreateEventQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :event_questions do |t|
      t.integer :question_id
      t.integer :event_id
      t.boolean :is_selected

      t.timestamps
    end
  end
end
