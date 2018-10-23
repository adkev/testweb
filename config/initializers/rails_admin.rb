RailsAdmin.config do |config|

  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user

    unless current_user.is_a?(Administrator) || current_user.is_a?(Publisher)
      flash[:alert] = "You do not have access this feature"
      redirect_to Rails.application.routes.url_helpers.root_path
    end
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
  config.authorize_with :cancan

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except [Contact, Improvement]
    end
    export
    bulk_delete
    show
    edit do
      except [Contact, Improvement]
    end
    delete
    show_in_app
  end

  config.excluded_models += ['Slide', 'User', 'Rich::RichFile']

  # ---------------------------------------------
  # INBOX
  # ---------------------------------------------

  config.model Contact do
    navigation_label 'Inbox'
    navigation_icon 'icon-envelope'
    weight 1

    label 'Message'
    label_plural 'Messages'

    exclude_fields :id
  end

  config.model Improvement do
    navigation_label 'Inbox'
    navigation_icon 'icon-envelope'
    weight 1

    exclude_fields :id
  end

  # ---------------------------------------------
  # USERS
  # ---------------------------------------------

  config.model Administrator do
    navigation_label 'Users'
    navigation_icon 'icon-user'
    weight 2

    exclude_fields :current_sign_in_at, :current_sign_in_ip, :id, :improvements, :last_sign_in_ip, :reset_password_token, :reset_password_sent_at, :remember_created_at, :tutor_step, :type, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email

    edit do
      exclude_fields :sign_in_count, :last_sign_in_at, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email
      include_fields :type
    end

    create do
      field :password do
        help 'Leave this blank if you want the user be invited to the system via email.'
      end

      field :password_confirmation do
        help 'Leave this blank if you want the user be invited to the system via email.'
      end
    end
  end

  config.model Employee do
    navigation_label 'Users'
    navigation_icon 'icon-user'
    weight 2

    exclude_fields :current_sign_in_at, :current_sign_in_ip, :id, :improvements, :last_sign_in_ip, :reset_password_token, :reset_password_sent_at, :remember_created_at, :tutor_step, :type, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email

    edit do
      exclude_fields :sign_in_count, :last_sign_in_at
      include_fields :type
    end

    create do
      field :password do
        help 'Leave this blank if you want the user be invited to the system via email.'
      end

      field :password_confirmation do
        help 'Leave this blank if you want the user be invited to the system via email.'
      end
    end
  end

  config.model Publisher do
    navigation_label 'Users'
    navigation_icon 'icon-user'
    weight 2

    exclude_fields :current_sign_in_at, :current_sign_in_ip, :id, :improvements, :last_sign_in_ip, :reset_password_token, :reset_password_sent_at, :remember_created_at, :tutor_step, :type, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email

    edit do
      exclude_fields :sign_in_count, :last_sign_in_at
      include_fields :type
    end

    create do
      field :password do
        help 'Leave this blank if you want the user be invited to the system via email.'
      end

      field :password_confirmation do
        help 'Leave this blank if you want the user be invited to the system via email.'
      end
    end
  end

  # ---------------------------------------------
  # SLIDESHOWS
  # ---------------------------------------------

  config.model Slide::Community do
    navigation_label 'Slideshows'
    navigation_icon 'icon-th-large'
    weight 3

    label 'Community Slide'
    label_plural 'Community Slides'

    edit do
      field :position
      field :image
    end

    list do
      sort_by :position
      exclude_fields :id, :type
    end
  end

  config.model Slide::Team do
    navigation_label 'Slideshows'
    navigation_icon 'icon-th-large'
    weight 3

    label 'Team Slide'
    label_plural 'Team Slides'

    edit do
      field :position
      field :image
    end

    list do
      sort_by :position
      exclude_fields :id, :type
    end
  end

  config.model Slide::Technique do
    navigation_label 'Slideshows'
    navigation_icon 'icon-th-large'
    weight 3

    label 'Technique Slide'
    label_plural 'Technique Slides'

    edit do
      field :position
      field :image
    end

    list do
      sort_by :position
      exclude_fields :id, :type
    end
  end


  # ---------------------------------------------
  # CONTENT
  # ---------------------------------------------

  config.model Post do
    navigation_label 'Content'
    navigation_icon 'icon-bookmark'
    weight 4

    label 'Blog Post'
    label_plural 'Blog Posts'


    exclude_fields :id

    edit do
      field :title
      field :content, :rich_editor do
        config({ insert_many: true })
      end
    end
  end

  config.model Position do
    navigation_label 'Content'
    navigation_icon 'icon-bell'
    weight 4

    label 'Open Position'
    label_plural 'Open Positions'

    exclude_fields :id

    edit do
      field :title
      field :description, :rich_editor do
        config({ insert_many: true })
      end
    end
  end

  config.model Facility do
    navigation_label 'Content'
    navigation_icon 'icon-bookmark'
    weight 4
  end

  config.model Press do
    navigation_label 'Content'
    navigation_icon 'icon-bookmark'
    weight 4
  end

  config.model FacilityPress do
    navigation_label 'Content'
    navigation_icon 'icon-bookmark'
    weight 4

    list do
      sort_by :facility_id
    end
  end
end
