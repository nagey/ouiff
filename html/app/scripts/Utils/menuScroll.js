$(document).ready(function(){
	var links = $('#main-nav li a.scroll-btn');
	links.click(function (e) {
		e.preventDefault();
    	goToByScroll($(this).attr('data'));
    });
    function goToByScroll(dataslide) {
        $('html,body').animate({
            scrollTop: $("#"+dataslide).offset().top
        }, 500/*, 'easeInOutQuint'*/);
    }
});