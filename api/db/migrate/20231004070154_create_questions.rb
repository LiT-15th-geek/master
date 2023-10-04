class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :questionTitle
      t.boolean :is_default

      t.timestamps
    end
  end
end
