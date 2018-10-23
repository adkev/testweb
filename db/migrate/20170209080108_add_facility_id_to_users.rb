class AddFacilityIdToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :facility_id, :integer

    if (goodland = Facility.find_by_city('Goodland')).present?
      User.all.each do |user|
        user.update_column(:facility_id, goodland.id)
      end
    end
  end
end
