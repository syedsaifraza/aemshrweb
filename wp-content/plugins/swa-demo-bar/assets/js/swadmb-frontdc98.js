/**
 * @team: SWA Team
 * @since: 1.0.0
 * @author: KP
 */
(function ($) {
 "use strict";

  $(window).load(function(){
    setTimeout(function(){
      $.ajax({
          url: load_more_demo_ajax.ajax_url,
          type: "post",
          data: {
            action: 'first_loading_demo',
          },
          success : function(response){
            $("#"+swadmb_current_theme).html(response);
            $("#"+swadmb_current_theme).fadeIn();
          },
          error : function(error){
            console.log(error);
          }
      });
    }, 5000);
  });

 var loadmore = {
  init : function(){
   loadmore.loadMore();
  },
  loadMore : function(){
   var page = 2;
   $(document).on('click', '.btn-loadmore',function(e){
    e.preventDefault();
    console.log(page);
    $.ajax({
     url:load_more_demo_ajax.ajax_url,
     type:"post",
     data: {
      action: 'load_more_demo',
      page: page
     },
     success : function(response){
      page += page + 1;
      console.log(response);
      var pre_img = load_more_demo_ajax.pre_img;
      var html = '';
      if(response != null){
       for(var i in response){
        html += '<div class="demos-panel-list-item"> ' +
         '<a href="'+response[i].url+'" data-label="'+response[i].title+'"> ' +
         '<img src="'+pre_img+response[i].image+'"' +
         'alt="'+response[i].title+'"> ' +
         '</a> ' +
         '<a href="'+response[i].url+'">'+response[i].title+'<span>('+response[i].categories+')</span></a>' +
         '</div>';
       }
       $('.demos-panel-list').append(html);
       $('.btn-loadmore').hide();
      }
     },
     error : function(error){
      console.log(error);
     }
    })
   });
  }
 };

 loadmore.init();
 var swadmb_front = {
  init: function () {
   this.events.quickOptions();
   this.events.onScroll();
  },
  events: {
   quickOptions: function () {
    $(document).on('click', '#demo-option', function (e) {
     e.preventDefault();
     $(this).parents('.swasdmb-wrapper').toggleClass('active');
     $(this).parents('.swadmb-options').removeClass('hideSpan');
    });
   },
   onScroll: function () {
    $(window).on('scroll', function(){
     var yOff = window.pageYOffset;
     var offset = window.innerHeight * 95/100;
     if(yOff > offset){
      if($('.swasdmb-wrapper').hasClass('active')){
       $('.swasdmb-wrapper').removeClass('active');
      }
      $('.swadmb-options').addClass('hideSpan');
     }
    })
   }
  },
  handles: {}
 };
 swadmb_front.init();
})(jQuery);
