class Contact < ApplicationRecord

  validates :email, presence: true, format: { with: /@/, allow_blank: true }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :message, presence: true
  validates :phone, presence: true, format: { with: /\(\d{3}\)\s\d{3}-\d{4}/, allow_blank: true }
  validates :company, presence: true
  validates :title, presence: true
end
