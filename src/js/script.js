$(function() {
 'use strict';  
  //Accordion
  $('.accordion__panel').click(function (e){
     e.preventDefault();
     var $this   = $(this);
   $this.siblings().each( function(index) {
      $('.accordion__panel').removeClass('accordion__panel--show')
         .addClass('accordion__panel--collapse');
    $('.panel__marker')
         .removeClass('panel__marker--show')
         .addClass('panel__marker--collapse');
    $('.panel__marker')
       .removeClass('panel__marker--show')
         .addClass('panel__marker--collapse').text('+');
    $('.panel__title')
         .removeClass('panel__title--show')
         .addClass('panel__title--collapse');
    $('.accordion__content')
         .removeClass('accordion__content--show')
         .addClass('accordion__content--collapse').slideUp(900);
    });
        $this.removeClass('accordion__panel--collapse')
         .addClass('accordion__panel--show');
    $this.find('.panel__marker')
         .removeClass('panel__marker--collapse')
         .addClass('panel__marker--show');
    $this.find('.panel__marker')
       .removeClass('panel__marker--collapse')
         .addClass('panel__marker--show').text('-');
    $this.find('.panel__title')
         .removeClass('panel__title--collapse')
         .addClass('panel__title--show');
    $this.next('.accordion__content')
         .removeClass('accordion__content--collapse')
         .addClass('accordion__content--show').slideDown(1200); 
    
  });
});
	