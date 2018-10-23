class AddEmailToFacilities < ActiveRecord::Migration[5.0]
  def change
    add_column :facilities, :email, :string, default: '', null: false

    Facility.find_by("LOWER(city) = 'elkhart'")&.update_column(:email, 'andys@regalmold.com')
  end
end
