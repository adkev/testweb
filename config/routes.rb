Rails.application.routes.draw do

  mount Rich::Engine => '/rich', :as => 'rich'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root to: "home#index"

  as :user do
      put '/user/confirmation' => 'users/confirmations#update', as: :update_user_confirmation
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    confirmations: 'users/confirmations'
  }

  resources :capabilities, only: [:index]
  resources :contact, only: [:new, :create]
  resources :home, only: [:index]
  resources :performance, only: [:index]
  resources :positions, only: [:index, :show]
  resources :values, only: [:index]

  namespace :edge do
    get '/', to: 'portal#feed'
    get 'feed', to: 'portal#feed', as: :feed
    get 'hr', to: 'portal#hr', as: :hr
    resource :tutorial, controller: :tutorial, only: [:show, :update], param: :step
  end

  resources :improvements, only: [:new, :create]

end
