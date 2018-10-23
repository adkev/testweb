class CreateFacilities < ActiveRecord::Migration[5.0]
  def change
    create_table :facilities do |t|
      t.string  :name
      t.string  :address_line_1
      t.string  :address_line_2
      t.string  :city
      t.string  :state
      t.string  :zip
      t.string  :phone
      t.string  :fax
      t.string  :operating_since
      t.integer :square_footage
      t.boolean :show_on_contact_form, default: false
      t.timestamps
    end
  end
end
