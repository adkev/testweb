class ImprovementsController < ApplicationController
  layout 'edge'
  before_filter :authenticate_user!
  before_filter :skip_if_untutored

  def new
    @improvement = Improvement.new
  end

  def create
    @improvement = Improvement.new(improvement_params)

    if @improvement.save
      redirect_to new_improvement_path, flash: { notice: 'Improvement submitted!' }
    else
      flash.now[:alert] = []
      @improvement.errors.full_messages.each{ |msg| flash.now[:alert] << msg }
      render :new
    end
  end


private

  def improvement_params
    params.require(:improvement).permit(:improvement_type, :user_id, :description, :estimated_cost, :expected_impact)
  end

  def skip_if_untutored
    redirect_to edge_tutorial_path unless current_user.tutored?
  end

end
