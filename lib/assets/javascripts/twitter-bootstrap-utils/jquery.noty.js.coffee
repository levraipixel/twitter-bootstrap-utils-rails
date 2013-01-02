#= require jquery.noty.js
#= require_self

$ ->
  if noty
    $('[data-rel="noty"],[rel="noty"]').click (e)->
      e.preventDefault()
      noty ($(this).data('noty-options') || {})
