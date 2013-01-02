# -*- encoding: utf-8 -*-
require File.expand_path('../lib/twitter-bootstrap-utils-rails/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = "twitter-bootstrap-utils-rails"
  s.version     = TwitterBootstrapUtilsRails::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Yann Hourdel"]
  s.email       = ["github@hourdel.fr"]
  s.homepage    = "https://github.com/yhourdel/twitter-bootstrap-utils-rails"
  s.summary     = "Bootstrap tools and utilities for Rails 3"
  s.description = "This gem provides Bootstrap tools and utilities for your Rails 3 application."

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map { |f| File.basename(f) }
  s.require_paths = ['lib']

  s.required_rubygems_version = ">= 1.3.6"

  # back-end
  s.add_dependency 'simple_form'
  s.add_dependency 'acts-as-taggable-on'
  s.add_dependency 'rails3-jquery-autocomplete'

  # front-end
  s.add_dependency 'sass', '>= 3.1.0'
  s.add_dependency 'chosen-rails'
  s.add_dependency 'cleditor_rails'
  s.add_dependency 'jquery-noty-rails'
  s.add_dependency 'jquery-rails'
  s.add_dependency 'jquery-raty-rails'
  s.add_dependency 'jquery-ui-bootstrap-rails'
  s.add_dependency 'twitter-bootstrap-rails', '>= 2.1.9'
  s.add_dependency 'underscore-rails'

end
