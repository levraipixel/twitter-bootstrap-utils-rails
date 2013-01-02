#= require jquery.cleditor.min
#= require_self

$ ->
  if $.fn.cleditor
    $('[data-rel="cleditor"],[rel="cleditor"]').each ->
      $(this).cleditor ($(this).data('cleditor-options') || {})
