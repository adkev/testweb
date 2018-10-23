class CreateImprovements < ActiveRecord::Migration[5.0]
  def change
    create_table :improvements do |t|
      t.belongs_to :user
      t.string :improvement_type
      t.string :description
      t.float :estimated_cost
      t.string :expected_impact
      t.date :submitted_at
      t.timestamps
    end
  end
end
