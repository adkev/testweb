class Improvement < ApplicationRecord
  belongs_to :user
  delegate :facility, to: :user

  after_initialize :set_submitted_at, if: -> { new_record? }

  validates :improvement_type, presence: true
  validates :submitted_at, presence: true
  validates :user, presence: true
  validates :description, presence: true
  validates :estimated_cost, presence: true
  validates :expected_impact, presence: true

private

  def set_submitted_at
    self.submitted_at = Date.today unless self.submitted_at.present?
  end
end
