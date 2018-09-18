(function($) {

    'use strict';

    /**
     * Table Of Content
     * 
     *  1. OWL CAROUSEL UPCOMING EVENTS
     *  2. OWL CAROUSEL LATEST EVENTS
     *  3. OWL CAROUSEL ARTIST DETAILS
     *  4. DATE PICKER
     *  5. SLIDER SWIPER
     *  6. JQUERY UI PRICE SLIDER
     */

    // 1. OWL CAROUSEL UPCOMING EVENTS
    $( '.upcoming-events-carousel' ).owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        responsive:{
            0:{
                items: 1
            },
            803:{
                items: 2
            },
            1200:{
                items: 3
            }
        }
    } );

    // 2. OWL CAROUSEL LATEST EVENTS
    $( '.latest-event' ).owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        responsive:{
            0:{
                items: 1
            }
        }
    } );

    // 3. OWL CAROUSEL ARTIST DETAILS
    $( '.carousel-artistdetails' ).owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
        responsive:{
            0:{
                items: 1
            },
            803:{
                items: 1
            },
            1200:{
                items: 1
            }
        }
    } );

    // 4. DATE PICKER
    $(document).ready(function(){
        var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        var options={
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        };
        date_input.datepicker(options);
    })

    // 5. SLIDER SWIPER
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        effect: 'fade',
        autoplayDisableOnInteraction: false
    });
    
    // 6. JQUERY UI PRICE SLIDER
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 1000,
            values: [ 50, 500 ],
            animate:true,
            step:1,
            slide: function( event, ui ) {
            $( "#amount-min" ).val( "$ " + ui.values[ 0 ] );
            $( "#amount-max" ).val( "$ " + ui.values[ 1 ] );
            }
        });

        $( "#amount-min" ).val("$ " + $( "#slider-range" ).slider( "values", 0 ) );
        $( "#amount-max" ).val("$ " + $( "#slider-range" ).slider( "values", 1 ) );
        
})(jQuery);
        