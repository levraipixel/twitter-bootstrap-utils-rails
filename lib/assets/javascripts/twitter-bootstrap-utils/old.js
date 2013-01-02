$(document).ready(function(){
  
  //disbaling some functions for Internet Explorer
  if($.browser.msie) {
    $('#toggle-fullscreen').hide();
    $('.login-box').find('.input-large').removeClass('span10');
  }
  
  //highlight current / active link
  $('ul.main-menu li a').each(function(){
    if($($(this))[0].href==String(window.location))
      $(this).parent().addClass('active');
  });
  
  if(window.History){
    //establish history variables
    var
      History = window.History, // Note: We are using a capital H instead of a lower h
      State = History.getState(),
      $log = $('#log');
    
    //bind to State Change
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
      var State = History.getState(); // Note: We are using History.getState() instead of event.state
      $.ajax({
        url:State.url,
        success:function(msg){
          $('#content').html($(msg).find('#content').html());
          $('#loading').remove();
          $('#content').fadeIn();
          docReady();
        }
      });
    });
  }
  
  //animating menus on hover
  /*
  $('ul.main-menu li:not(.nav-header)').hover(function(){
    $(this).animate({'margin-left':'+=5'},300);
  },
  function(){
    $(this).animate({'margin-left':'-=5'},300);
  });
  */
  
  //other things to do on document ready, seperated for ajax calls
  docReady();
});

function docReady(){
  //prevent # links from moving to top
  $('a[href="#"][data-top!=true]').click(function(e){
    e.preventDefault();
  });
  
  
  //datepicker
  if($.fn.datepicker){
    $('input.datepicker').each(function(){
      var $displayInput = $(this);
      var $valInput = $("<input name='"+$displayInput.attr('name')+"' type='hidden' value='"+$displayInput.val()+"'>");
      var $container = $("<div></div>");
      var $razBtn = $(
        "<a href='#' onclick='return false;' class='btn'><i class='icon-remove'></i></a>"
      ).click(function(){
        $displayInput.datepicker('setDate', null).change();
      });
      
      $displayInput.attr('name', '');
      $displayInput.parent().append(
        $container.append(
          $displayInput.detach()
        ).append(
          $valInput
        ).append(
          $razBtn
        )
      );
      
      var d = new Date();
      if($displayInput.val()){
        d.setTime(Date.parse($displayInput.val()));
      } else {
        d = null;
      }
      
      $displayInput.datepicker({
        altFormat: "yy-mm-dd",
        dateFormat: "dd/mm/yy",
        altField: $valInput
      });
      
      $displayInput.change(function(){
        if($displayInput.val()){
          $container.addClass('input-append');
          $razBtn.show();
        } else {
          $container.removeClass('input-append');
          $razBtn.hide();
        }
      });
      
      $displayInput.datepicker( "setDate", d ).change();
    });
  }
  
  //tabs

  //makes elements soratble, elements that sort need to have id attribute to save the result
  if($.fn.sortable){
    $('.sortable').sortable({
      revert:true,
      cancel:'.btn,.box-content,.nav-header',
      update:function(event,ui){
        //line below gives the ids of elements, you can make ajax call here to save it to the database
        //console.log($(this).sortable('toArray'));
      }
    });
  }

  //slider
  if($.fn.slider){
    $('.slider').slider({range:true,values:[10,65]});
  }

  //tooltip

  //auto grow textarea
  if($.fn.autogrow){
    $('textarea.autogrow').autogrow();
  }

  //file manager
  if($.fn.elfinder){
    var elf = $('.file-manager').elfinder({
      url : 'misc/elfinder-connector/connector.php'  // connector URL (REQUIRED)
    }).elfinder('instance');
  }

  //iOS / iPhone style toggle switch
  if($.fn.iphoneStyle){
    $('.iphone-toggle').iphoneStyle();
  }

  //uploadify - multiple uploads
  if($.fn.uploadify){
    $('#file_upload').uploadify({
      'swf'      : 'misc/uploadify.swf',
      'uploader' : 'misc/uploadify.php'
      // Put your options here
    });
  }

  //gallery controlls container animation
  $('ul.gallery li').hover(function(){
    $('img',this).fadeToggle(1000);
    $(this).find('.gallery-controls').remove();
    $(this).append('<div class="well gallery-controls">'+
              '<p><a href="#" class="gallery-edit btn"><i class="icon-edit"></i></a> <a href="#" class="gallery-delete btn"><i class="icon-remove"></i></a></p>'+
            '</div>');
    $(this).find('.gallery-controls').stop().animate({'margin-top':'-1'},400,'easeInQuint');
  },function(){
    $('img',this).fadeToggle(1000);
    $(this).find('.gallery-controls').stop().animate({'margin-top':'-30'},200,'easeInQuint',function(){
        $(this).remove();
    });
  });


  //gallery image controls example
  //gallery delete
  $('.thumbnails').on('click','.gallery-delete',function(e){
    e.preventDefault();
    //get image id
    //alert($(this).parents('.thumbnail').attr('id'));
    $(this).parents('.thumbnail').fadeOut();
  });
  //gallery edit
  $('.thumbnails').on('click','.gallery-edit',function(e){
    e.preventDefault();
    //get image id
    //alert($(this).parents('.thumbnail').attr('id'));
  });

  //gallery colorbox
  if($.fn.colorbox){
    $('.thumbnail a').colorbox({rel:'thumbnail a', transition:"elastic", maxWidth:"95%", maxHeight:"95%"});
  }

  //gallery fullscreen
  $('#toggle-fullscreen').button().click(function () {
    var button = $(this), root = document.documentElement;
    if (!button.hasClass('active')) {
      $('#thumbnails').addClass('modal-fullscreen');
      if (root.webkitRequestFullScreen) {
        root.webkitRequestFullScreen(
          window.Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (root.mozRequestFullScreen) {
        root.mozRequestFullScreen();
      }
    } else {
      $('#thumbnails').removeClass('modal-fullscreen');
      (document.webkitCancelFullScreen ||
        document.mozCancelFullScreen ||
        $.noop).apply(document);
    }
  });

  //datatable
  if($.fn.dataTable){
    $('.datatable').dataTable({
      "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span12'i><'span12 center'p>>",
      "sPaginationType": "bootstrap",
      "oLanguage": {
        "sLengthMenu": "_MENU_ records per page"
      }
    });
  }
  $('.btn-close').click(function(e){
    e.preventDefault();
    $(this).parent().parent().parent().fadeOut();
  });
  $('.btn-minimize').click(function(e){
    e.preventDefault();
    var $target = $(this).parent().parent().next('.box-content');
    if($target.is(':visible')) $('i',$(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
    else              $('i',$(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
    $target.slideToggle();
  });
  
  $('.modal-trigger').click(function(e){
    e.preventDefault();
    console.log('#'+$(this).data('modal'), $('#'+$(this).data('modal')));
    $('#'+$(this).data('modal')).modal('show');
  });
  
  //chart with points
  if($("#candidatures-evolution").length) {
    var sin = [];
    
    for (var i = 0; i < 14; i += 0.5) {
      sin.push([i, Math.sin(i)/i]);
    }
    
    var plot = $.plot(
      $("#candidatures-evolution"),
      [{ data: sin, label: "candidatures"} ],
      {
        series: {
          lines: { show: true  },
          points: { show: true }
        },
        grid: { hoverable: true, clickable: true, backgroundColor: { colors: ["#fff", "#eee"] } },
        yaxis: { min: -1.2, max: 1.2 },
        colors: ["#539F2E"]
      }
    );
  }
  
  objScrollTop = function($o){
    if (o = $($o).offset()) {
      return o.top;
    } else {
      return null;
    }
  };
  
  window.scroll_to_error_on_attribute = function(attr){
    s = objScrollTop($('#'+attr+'_error').closest('.control-group'));
    if(s) {
      $('html, body').animate({
        scrollTop: (s - 100)
      }, 500);
    }
  };
}

//additional functions for data table
if($.fn.dataTableExt){
  $.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings ){
    return {
      "iStart":         oSettings._iDisplayStart,
      "iEnd":           oSettings.fnDisplayEnd(),
      "iLength":        oSettings._iDisplayLength,
      "iTotal":         oSettings.fnRecordsTotal(),
      "iFilteredTotal": oSettings.fnRecordsDisplay(),
      "iPage":          Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
      "iTotalPages":    Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
    };
  }
  $.extend( $.fn.dataTableExt.oPagination, {
    "bootstrap": {
      "fnInit": function( oSettings, nPaging, fnDraw ) {
        var oLang = oSettings.oLanguage.oPaginate;
        var fnClickHandler = function ( e ) {
          e.preventDefault();
          if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
            fnDraw( oSettings );
          }
        };

        $(nPaging).addClass('pagination').append(
          '<ul>'+
            '<li class="prev disabled"><a href="#">&larr; '+oLang.sPrevious+'</a></li>'+
            '<li class="next disabled"><a href="#">'+oLang.sNext+' &rarr; </a></li>'+
          '</ul>'
        );
        var els = $('a', nPaging);
        $(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
        $(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
      },

      "fnUpdate": function ( oSettings, fnDraw ) {
        var iListLength = 5;
        var oPaging = oSettings.oInstance.fnPagingInfo();
        var an = oSettings.aanFeatures.p;
        var i, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

        if ( oPaging.iTotalPages < iListLength) {
          iStart = 1;
          iEnd = oPaging.iTotalPages;
        }
        else if ( oPaging.iPage <= iHalf ) {
          iStart = 1;
          iEnd = iListLength;
        } else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
          iStart = oPaging.iTotalPages - iListLength + 1;
          iEnd = oPaging.iTotalPages;
        } else {
          iStart = oPaging.iPage - iHalf + 1;
          iEnd = iStart + iListLength - 1;
        }

        for ( i=0, iLen=an.length ; i<iLen ; i++ ) {
          // remove the middle elements
          $('li:gt(0)', an[i]).filter(':not(:last)').remove();

          // add the new list items and their event handlers
          for ( j=iStart ; j<=iEnd ; j++ ) {
            sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
            $('<li '+sClass+'><a href="#">'+j+'</a></li>')
              .insertBefore( $('li:last', an[i])[0] )
              .bind('click', function (e) {
                e.preventDefault();
                oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
                fnDraw( oSettings );
              } );
          }

          // add / remove disabled classes from the static elements
          if ( oPaging.iPage === 0 ) {
            $('li:first', an[i]).addClass('disabled');
          } else {
            $('li:first', an[i]).removeClass('disabled');
          }

          if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
            $('li:last', an[i]).addClass('disabled');
          } else {
            $('li:last', an[i]).removeClass('disabled');
          }
        }
      }
    }
  });
}
