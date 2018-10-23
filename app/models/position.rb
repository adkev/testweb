class Position < ApplicationRecord

  default_scope { order(title: :asc) }

  validates :title, presence: true
  validates :apply_link, presence: true

end
