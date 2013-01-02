#= require chosen-jquery
#= require_self

$ ->
  if $.fn.chosen
    $('[data-rel="chosen"],[rel="chosen"]').chosen()
