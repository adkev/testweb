class ChangeContactReferenceToCompany < ActiveRecord::Migration[5.0]
  def change
    rename_column :contacts, :reference, :company
  end
end
