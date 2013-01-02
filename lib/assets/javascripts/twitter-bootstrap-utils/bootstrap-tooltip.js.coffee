#= require twitter/bootstrap/bootstrap-tooltip
#= require_self

$ ->
  if $.fn.tooltip
    $('[rel="tooltip"],[data-rel="tooltip"]').each ->
      options = $(this).data('tooltip-options') || {}
      options.placement ||= 'bottom'
      options.delay ||=
        show: 400
        hide: 200
      $(this).tooltip options

