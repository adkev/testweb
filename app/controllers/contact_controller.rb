class ContactController < ApplicationController

  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)

    if @contact.save
      redirect_to new_contact_path, flash: { notice: 'Message sent!' }
    else
      flash.now[:alert] = []
      @contact.errors.full_messages.each{ |msg| flash.now[:alert] << msg }
      render :new
    end
  end


private

  def contact_params
    params.require(:contact).permit(:email, :first_name, :last_name, :message, :phone, :company, :title)
  end

end
