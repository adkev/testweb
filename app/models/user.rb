class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  # devise :database_authenticatable, :registerable, :recoverable, :trackable, :validatable
  devise :database_authenticatable, :recoverable, :trackable, :validatable, :confirmable
  include Invitable

  belongs_to :facility, inverse_of: :users
  has_many :improvements
  validates :type, presence: true
  validates :email, presence: true
  validates :facility, presence: true

  def tutored?
    self.tutor_step > 4
  end

  def type_enum
    ['Administrator', 'Employee', 'Publisher']
  end
end
