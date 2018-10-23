class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.string :title
      t.string :first_name
      t.string :last_name
      t.string :reference
      t.string :email
      t.string :phone
      t.text :message
      t.timestamps
    end
  end
end
