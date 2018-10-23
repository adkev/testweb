class PositionsController < ApplicationController
  before_action :set_position

  def index
  end

  def show
  end

private

  def set_position
    @position = Position.find_by_id(params[:id]) || Position.first
  end
end
