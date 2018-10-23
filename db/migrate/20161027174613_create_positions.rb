class CreatePositions < ActiveRecord::Migration[5.0]
  def change
    create_table :positions do |t|
      t.string :title
      t.text :description
      t.string :apply_link
      t.timestamps
    end
  end
end
