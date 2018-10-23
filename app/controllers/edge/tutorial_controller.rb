class Edge::TutorialController < ApplicationController
  layout 'edge'
  before_filter :authenticate_user!
  before_filter :skip_if_tutorialized

  def show
  end

  def update
    current_user.update(tutor_step: current_user.tutor_step + 1)
    redirect_to edge_tutorial_path
  end

private

  def skip_if_tutorialized
    redirect_to edge_path unless !current_user.tutored?
  end

end
