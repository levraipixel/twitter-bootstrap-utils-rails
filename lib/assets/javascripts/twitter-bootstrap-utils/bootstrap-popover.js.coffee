#= require twitter/bootstrap/bootstrap-popover
#= require_self

$ ->
  if $.fn.popover
    $('[rel="popover"],[data-rel="popover"]').popover()
