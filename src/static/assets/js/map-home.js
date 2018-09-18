$(function(){

	'use strict';

  	/**
   	 * Table Of Content
     * 
     * 1. Map Home
     */

    //  Init Map
        initMap()
		
		

    // 1. Map Home		
		var map;
		
        function initMap() {
          	map = new google.maps.Map(document.getElementById('map'), {
	            zoom: 13,
	            center: new google.maps.LatLng(29.9462905, -90.0564838),
	            mapTypeId: 'roadmap',
	            scrollwheel: false,
	            disableDefaultUI: true
          	});
			
			
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
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
            	position: new google.maps.LatLng(29.954924, -90.035870),
              	type: 'parking'
            },{
              	position: new google.maps.LatLng(29.940943, -90.019734),
              	type: 'parking'
            },{
              	position: new google.maps.LatLng(29.934993, -90.041020),
              	type: 'parking'
            },{
              	position: new google.maps.LatLng(29.949421, -90.066769),
              	type: 'parking'
            },{
              	position: new google.maps.LatLng(29.941687, -90.087197),
              	type: 'parking'
            },{
              	position: new google.maps.LatLng(29.938711, -90.093377),
              	type: 'parking'
            },{
              	position: new google.maps.LatLng(29.933505, -90.107453),
              	type: 'parking'
            },{
              	position: new google.maps.LatLng(29.950016, -90.093033),
              	type: 'parking'
            },{
              	position: new google.maps.LatLng(29.955073, -90.100758),
              	type: 'parking'
            }
          	];

          	for (var i = 0, feature; feature = features[i]; i++) {
            	addMarker(feature);
          	}
        }
    // End Map Home	
    
});


