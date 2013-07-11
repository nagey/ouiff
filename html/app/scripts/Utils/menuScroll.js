/*global define */
define(["jquery"], function ($) {
  "use strict";
  $(document).ready(function(){
    var links = $('#main-nav li a.scroll-btn');

    var goToByScroll = function (dataslide) {
      $('html,body').animate({
        scrollTop: $("#"+dataslide).offset().top
      }, 500/*, 'easeInOutQuint'*/);
    };

    links.click(function (e) {
      e.preventDefault();
      goToByScroll($(this).attr('data'));
    });
  });
});