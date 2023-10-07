class CreateQuestionAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :question_answers do |t|
      t.integer :question_id
      t.integer :BookedUser_id
      t.string :answer

      t.timestamps
    end
  end
end
