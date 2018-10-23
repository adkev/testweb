class Facility < ApplicationRecord
  has_many :facility_presses, dependent: :destroy
  has_many :presses, through: :facility_presses
  has_many :users, inverse_of: :facility
  has_many :improvements, through: :users

end
