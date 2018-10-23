class Ability
  include CanCan::Ability

  def initialize(user)
    if user.is_a?(Administrator)
        can :manage, :all
    elsif user.is_a?(Publisher)
        can :access, :rails_admin
        can :dashboard
        can :manage, Position
        can :manage, Post
    end
  end
end
