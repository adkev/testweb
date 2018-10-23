class FacilityPress < ApplicationRecord
  belongs_to :facility, inverse_of: :facility_presses
  belongs_to :press, inverse_of: :facility_presses
end
