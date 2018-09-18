$(function(){

	'use strict';

  	/**
   	 * Table Of Content
     * 
     * 1. Map Events Details
     */

    //  Init Map
        initMap()

    // 1. Map Events Details		
    	var map;
        function initMap() {

			var locations = [
	        ['<div class="col-md-12 col-sm-12 col-xs-12 popup-map">'+
	            '<li class="media">'+ 
	                '<a class="pull-left" href="#">'+ 
	                    '<img class="media-object" src="assets/images/featured-img.png" width="100">'+ 
	                '</a>'+                 
	                '<div class="media-body">'+ 
	                    '<h4 class="media-heading">Media heading</h4>'+
	                    'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.'+   
	                    '<br><br>'+
	                    '<div class="col-md-12 pad0 address">'+ 
	                        '<p class="lists"><span>Address :</span> 185 Dow Street3207 Melbourne Australia</p>'+
	                        '<p class="lists"><span>Fax :</span> 432 034 544</p>'+
	                        '<p class="lists"><span>Phone :</span> 432 034 542</p>'+
	                        '<p class="lists"><span>Email :</span> mail@artist.com</p>'+
	                        '<p class="lists"><span>Website :</span> artistwebsite.com</p>'+
	                    '</div>'+                 
	                '</div>'+                 
	            '</li>'+             
	        '</div>', 

	          29.954924, -90.035870]
	        ];

	        var map = new google.maps.Map(document.getElementById('map'), {
	            zoom: 13,
	            center: new google.maps.LatLng(29.954924, -90.035870),
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            zoomControl: false,
	            mapTypeControl: false,
	            scaleControl: false,
	            streetViewControl: false,
	            rotateControl: false,
	            scrollwheel: false,
	            fullscreenControl: true
	        });

	        var infowindow = new google.maps.InfoWindow();

	        var marker, i;
	        var markers = new Array();

	        for (i = 0; i < locations.length; i++) {  
	          marker = new google.maps.Marker({
	            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	            icon: 'assets/images/marker.png',
	            map: map
	          });

	          markers.push(marker);

	          google.maps.event.addListener(marker, 'click', (function(marker, i) {
	            return function() {
	              infowindow.setContent(locations[i][0]);
	              infowindow.open(map, marker);
	            }
	          })(marker, i));
	        }
	    }
    // END Map Events Details

});

