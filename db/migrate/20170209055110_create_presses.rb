class CreatePresses < ActiveRecord::Migration[5.0]
  def change
    create_table :presses do |t|
      t.string  :ton
      t.integer :position
      t.timestamps
    end
  end
end
