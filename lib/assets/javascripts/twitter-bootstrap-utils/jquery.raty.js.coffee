#= require jquery.raty.min
#= require_self

$ ->
  if $.fn.raty
    $('[data-rel="raty"],[rel="raty"]').each ->
      $(this).raty ($(this).data('raty-options') || {})
