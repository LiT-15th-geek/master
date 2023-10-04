class CreateUserAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :user_answers do |t|
      t.string :user_id
      t.integer :question_id
      t.string :answer

      t.timestamps
    end
  end
end
