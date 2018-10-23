class AddToolmakersToFacilities < ActiveRecord::Migration[5.0]
  def change
    add_column :facilities, :toolmakers, :integer, default: 0, null: false

    Facility.find_by("LOWER(city) = 'elkhart'")&.update_column(:toolmakers, 35)
  end
end
