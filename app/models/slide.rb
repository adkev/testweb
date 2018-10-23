class Slide < ApplicationRecord
  include Positionable

  default_scope { order(position: :asc) }

  has_attached_file :image, styles: { thumb: "100x100>" }, default_url: "/images/:style/missing.png"

  validates :image, presence: true
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  validates :type, presence: true, inclusion: { in: %w(Slide::Community Slide::Team Slide::Technique) }


  def slideshow_enum
    [['Community', 'Slide::Community'], ['Team', 'Slide::Team'], ['Technique', 'Slide::Technique']]
  end

end
