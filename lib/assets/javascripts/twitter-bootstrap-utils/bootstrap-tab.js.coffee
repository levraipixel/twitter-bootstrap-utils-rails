#= require twitter/bootstrap/bootstrap-tab
#= require_self

$ ->
  if $.fn.tab
    $('[data-rel="tab"],[rel="tab"]').each ->
      $(this).find('a:first').tab 'show'
      $(this).find('a').click (e)->
        e.preventDefault()
        $(this).tab 'show'

