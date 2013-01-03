#puts "LOAD #{__FILE__}"

module TwitterBootstrapUtilsRails

  class Engine < Rails::Engine
    initializer 'twitter-bootstrap-utils-rails.action_controller' do |app|
      ActiveSupport.on_load :action_controller do
        helper TwitterBootstrapUtilsRails::IconsHelper
      end
    end
  end

end
