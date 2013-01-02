#= require jquery.uniform.1.8.0+f.min
#= require_self

$ ->
  if $.fn.uniform
    $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').each ->
      $(this).addClass('yop')
      $(this).uniform
        fileBtnText: "Choisissez un fichier"
        fileDefaultText: "Aucun fichier sélectionné"

