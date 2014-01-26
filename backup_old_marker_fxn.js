function setMarkers(map, locations, pos) {
	var image = { 
		url: 'images/donut_test_medium.png',
		size: new google.maps.Size(48, 48),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 48)
	};

	for (var i = 0; i < locations.length; i++) {
	    var donut = locations[i];
	    var myLatLng = new google.maps.LatLng(donut[1], donut[2]);
	    var marker = new google.maps.Marker({
	        position: myLatLng,
	        map: map,
	        icon: image,
	        title: donut[0],
	        zIndex: donut[3]
	    });
							
		var infowindow = new google.maps.InfoWindow();
		
		distance = google.maps.geometry.spherical.computeDistanceBetween(pos, myLatLng);
		distance = (distance/1609.344).toFixed();
		
		var content = donut[0] + "<br>" + distance + " miles away from you!"
 		
		
		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow) { 
			return function() {
				var latLng = marker.getPosition(); // returns LatLng object
				map.panTo(latLng); // setCenter takes a LatLng object		
				closeInfos();		
				infowindow.setContent(content);
				infowindow.open(map,marker);			
				infos[0] = infowindow;			
			};
		})(marker,content,infowindow));
	}
}
