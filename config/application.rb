require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Adkev
  class Application < Rails::Application
    config.autoload_paths << "#{Rails.root}/lib"

    config.generators do |g|
      g.template_engine :haml
      g.test_framework :rspec
    end
  end
end
