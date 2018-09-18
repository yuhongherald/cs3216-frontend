$(function(){

	'use strict';

  	/**
   	 * Table Of Content
     * 
     * 1. Map allEvents
     */

    //  Init Map
    initMap()

    // 1. Map allEvents	
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

		        40.692446, -73.947126],
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

		        40.696087, -73.933368],
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

		        40.685754, -73.934277],
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

		        51.526825, -0.132395],
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

		        40.688870, -73.963436]

		    ];



		    var map = new google.maps.Map(document.getElementById('map2'), {
		        zoom: 14,
		        center: new google.maps.LatLng(40.692446, -73.947126),
		        mapTypeId: 'roadmap',
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

		    // SIDEBAR MAP
		    var latlng = new google.maps.LatLng(29.9462905,-90.0564838);
		    var myOptions =
		    {
		        zoom: 13,
		        center: latlng,
		        zoomControl: false,
		        mapTypeControl: false,
		        scaleControl: false,
		        streetViewControl: false,
		        rotateControl: false,
		        scrollwheel: false,
		        fullscreenControl: true
		    };
		    var map = new google.maps.Map(document.getElementById("map"), myOptions);
		    var iconBase = 'assets/images/';
		    var marker = new google.maps.Marker({
		        position: latlng,
		        map: map,
		        icon: iconBase + 'marker.png'
		    });
		}


	// End Map allEvents	
});		


