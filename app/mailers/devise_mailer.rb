class DeviseMailer < Devise::Mailer
  include Devise::Controllers::UrlHelpers
  include ActionView::Helpers::AssetUrlHelper
  before_action :init_mailgun
  default template_path: 'devise/mailer'

  def reset_password_instructions(record, token, opts={})
    @token = token
    initialize_from_record(record)

    html_output = render_to_string template: 'devise/mailer/reset_password_instructions', layout: 'mailer'

    html_output = Premailer.new(
      html_output,
      with_html_string: true,
      css: 'public/mailer.css',
      preserve_styles: true
    ).to_inline_css

    message_params = {
      from: ENV['MAILGUN_USER_NAME'],
      to: record.email,
      subject: 'Reset Password Instructions',
      html: html_output.to_str
    }.merge(opts)

    @mailgun.messages.send_email(message_params)
  end

  def confirmation_instructions(record, token, opts={})
    @token = token
    initialize_from_record(record)

    html_output = render_to_string template: 'devise/mailer/confirmation_instructions', layout: 'mailer'

    html_output = Premailer.new(
      html_output,
      with_html_string: true,
      css: 'public/mailer.css',
      preserve_styles: true
    ).to_inline_css

    message_params = {
      from: ENV['MAILGUN_USER_NAME'],
      to: record.email,
      subject: "Adkev Edge Account Activation",
      html: html_output.to_str
    }.merge(opts)

    @mailgun.messages.send_email(message_params)
  end

private

  def init_mailgun
    @mailgun = Mailgun(api_key: ENV['MAILGUN_API_KEY'], domain: ENV['MAILGUN_DOMAIN'])
  end
end