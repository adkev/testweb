class CreateFacilityPresses < ActiveRecord::Migration[5.0]
  def change
    create_table :facility_presses do |t|
      t.belongs_to :facility
      t.belongs_to :press
      t.integer    :quantity
      t.timestamps
    end
  end
end
