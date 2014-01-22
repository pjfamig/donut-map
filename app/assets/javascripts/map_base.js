// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;
//var x=document.getElementById("demo");

function initialize() {
  // Start HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
	  var mapOptions = {
	    zoom: 14,
		disableDefaultUI: true
	  };

	  map = new google.maps.Map(document.getElementById('map_canvas'),
	      mapOptions);

	  var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

	  var marker = new google.maps.Marker({position:pos, map:map, title:"You are here"});
	 	  		
	  setMarkers(map, donuts);
      map.setCenter(pos);

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
  
  var mapOptions = {
    zoom: 4,
	panControl: false
  };
  map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

  var options = {
    map: map,
    position: new google.maps.LatLng(40.111689,-99.228516),
    content: content
  };

  map.setCenter(options.position);
  setMarkers(map, donuts);
 
}

google.maps.event.addDomListener(window, 'load', initialize);
