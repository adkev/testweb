class ChangeUsersNameToFirstNameAndLastName < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string

    User.all.each do |user|
      if user.name.present?
        user.first_name = user.name.try(:split, ' ').try(:first)
        user.last_name = user.name.try(:split, ' ').try(:last)
        user.save
      end
    end

    remove_column :users, :name, :string
  end
end
