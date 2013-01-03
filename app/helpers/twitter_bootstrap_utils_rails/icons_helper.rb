# encoding: UTF-8

#puts "LOAD #{__FILE__}"

module TwitterBootstrapUtilsRails
  module IconsHelper

    # can be overridden
    def icon_key(name)
      name
    end

    def glyph_icon_tag(classes)
      content_tag :i, '', class: classes.split(' ').map{|k| " icon-#{icon_key(k)}"}.join
    end
    def opa_icon_tag(classes)
      content_tag :span, '', class: 'opa-icon'+classes.split(' ').map{|k| " icon-#{icon_key(k)}"}.join
    end
    def opa_big_icon_tag(classes)
      content_tag :span, '', class: 'opa-icon32'+classes.split(' ').map{|k| " icon-#{icon_key(k)}"}.join
    end

  end
end
