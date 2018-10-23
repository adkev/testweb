class Press < ApplicationRecord
  include Positionable

  default_scope { order(position: :asc) }

  has_many :facility_presses, dependent: :destroy
  has_many :facilities, through: :facility_presses


  def facility_quantity(facility)
    facility_presses.find_by(facility: facility).quantity
  end

  def name
    ton
  end
end
