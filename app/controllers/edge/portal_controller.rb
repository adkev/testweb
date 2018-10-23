class Edge::PortalController < ApplicationController
  layout 'edge'
  before_filter :authenticate_user!
  before_filter :skip_if_untutored

  def feed
    @posts = Post.all
  end

  def hr
  end


private

  def skip_if_untutored
    redirect_to edge_tutorial_path unless current_user.tutored?
  end

end
