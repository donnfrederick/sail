ActiveAdmin.setup do |config|
  config.site_title = "Sail"
  config.authentication_method = :authenticate_admin_user!
  config.current_user_method = :current_admin_user
  config.logout_link_path = :destroy_admin_user_session_path
  config.comments = false
  config.batch_actions = true
  config.before_action :update_last_sign_in_at
  config.before_action :set_admin_user_locale_and_timezone
  config.localize_format = :long

  if Rails.env.production?
    config.clear_stylesheets!
    config.register_stylesheet 'admin/active_admin.css'
    config.site_title_image = "/assets/img/common/sail.png"
  end

  Dir["#{Rails.root}/lib/active_admin/**/*.rb"].each {|lib| require lib }
end

module ActiveAdmin::ViewHelpers
  include ApplicationHelper
end
