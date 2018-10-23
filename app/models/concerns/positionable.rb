module Positionable
  extend ActiveSupport::Concern

  included do
    validates :position, presence: true, numericality: { greater_than_or_equal_to: 1 }

    after_initialize { self.position = self.class.count + 1 unless position.present? }

    before_save do
      if position_changed?
        objs = self.class.all.to_a - [self]
        objs.insert(position - 1, self)
        objs.each_with_index do |obj, i|
          obj.update_column(:position, i + 1) unless obj == self
        end
      end
    end

    before_destroy do
      objs = self.class.all.to_a - [self]

      objs.each_with_index do |obj, i|
        obj.update_column(:position, i + 1)
      end
    end
  end

  def position_enum
    if self.new_record?
      (1..self.class.count + 1).zip.to_a
    else
      (1..self.class.count).zip.to_a
    end
  end
end
