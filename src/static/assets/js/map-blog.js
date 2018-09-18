$(function(){

	'use strict';

  	/**
   	 * Table Of Content
     * 
     * 1. Map Blog
     */

    //  Init Map
        initMap()

    // 1. Map Blog		
    	var map;
        function initMap() {

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: new google.maps.LatLng(29.940719, -90.028403),
                mapTypeId: 'roadmap',
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                scrollwheel: false,
                fullscreenControl: true
            });

            var iconBase = 'assets/images/';
            var icons = {
                parking: {
                  icon: iconBase + 'marker.png'
                }
            };

            function addMarker(feature) {
                var marker = new google.maps.Marker({
                  	position: feature.position,
                  	icon: icons[feature.type].icon,
                  	map: map
                });
            }

            var features = [
                {
                  position: new google.maps.LatLng(29.940719, -90.028403),
                  type: 'parking'
                }
            ];

            for (var i = 0, feature; feature = features[i]; i++) {
                addMarker(feature);
            }
        }
    // END Map Blog
});

