class ChangeIdToUidInUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      t.remove :id
      t.string :id, primary_key: true
    end
  end
end
