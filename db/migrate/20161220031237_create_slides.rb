class CreateSlides < ActiveRecord::Migration[5.0]
  def change
    create_table :slides do |t|
      t.string :type
      t.attachment :image
      t.integer :position
      t.timestamps
    end
  end
end
