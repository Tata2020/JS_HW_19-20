$(document).ready(function () {
	var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
	    autoHeight: true,
	    loop: true,
	    speed: 400,
	    slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    
    });   
	
 });