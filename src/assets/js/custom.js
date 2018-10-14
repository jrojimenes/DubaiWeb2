/*  Theme Name: Okla - Responsive Bootstrap 4 Personal Template
    Author: VBThemes
    Version: 1.0.0
    Created:August 2018
    File Description:Main JS file of the template
*/





(function($) {

    'use strict';

    function initNavbarStickey() {
        $(window).on('scroll', function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 50) {
                $(".sticky").addClass("stickyadd");
            } else {
                $(".sticky").removeClass("stickyadd");
            }
        });

    }

    function initSmoothLink() {
       $('.navbar-nav a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    }

    function initScrollspy() {
        $("#navbarCollapse").scrollspy({
            offset: 20
        });
    }

    function initNavbarToggler() {
        var scroll = $(window).scrollTop();

        $('.navbar-toggle').on('click', function(event) {
            $(this).toggleClass('open');
            $('#navi_mob_menu').slideToggle(400);
        });

        $('.nav_menu>li').slice(-2).addClass('last-elements');

    }

    function initPreloader() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }

    function initproject() {
        $(document).ready(function() {
            $("#owl_clients").owlCarousel({
                autoPlay: 3000,
                items: 1,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1]
            });
        });

    }

   
    function initBacktoTop() {
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 100) {
                $('.back_top_angle_up').fadeIn();
            } else {
                $('.back_top_angle_up').fadeOut();
            }
        });
        $('.back_top_angle_up').on('click', function() {
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    }

    function initMfpImage(){
        $('.img-zoom').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            }
        });
    }

    function initMassonary(){
        $(window).on('load', function () {
        var $container = $('.work-filter');
        var $filter = $('#menu-filter');
        $container.isotope({
            filter: '*',
            layoutMode: 'masonry',
            animationOptions: {
                duration: 750,
                easing: 'linear'
            }
        });

        $filter.find('a').on("click",function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    animationDuration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        });
    });

    }

    function init() {
        initNavbarStickey();
        initSmoothLink();
        initScrollspy();
        initNavbarToggler();
        initPreloader();
        initproject();
        initMfpImage();
        initMassonary();
        initBacktoTop();
    }
    init();

})(jQuery)