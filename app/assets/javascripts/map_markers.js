var infos = []
var map;
//var x=document.getElementById("demo");


function initialize() {
  // Start HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      
	  var mapOptions = {
	    zoom: 12,
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
	panControl: false,
	disableDefaultUI: true
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


var donuts = [
  ['King Pin Donuts', 37.867962,-122.257937],
  ['Fluffy Donuts & Sandwich Shop', 38.547016,-121.760390],
  ['Golden Donut', 37.78036,-122.477255],
  ['Allstar Donuts', 37.782603,-122.468864],
  ['Donut King', 34.01986,-118.403967],
  ['Donut King', 34.009511,-118.414014],
  ['Donut King', 33.929935,-118.245933],
  ['Donut King 2', 33.894821,-118.308743],
  ['Stans Corner Donuts', 34.062509,-118.447021],
  ['Randy\'s Donuts', 33.961851,-118.370452],
  ['Krispy Kreme Doughnuts', 34.026065,-118.490070],
  ['Bob\'s Coffee & Donuts',34.072166, -118.360299],
  ['Primo\'s Donuts',34.026903, -118.431640],
  ['Donut Star', 33.671466, -117.789051],
  ['Doughnut Plant',40.716298, -73.988494],
  ['Doughnut Plant',40.744556, -73.996785],
  ['The Donut Man',34.128964, -117.849743],
  ['Doughnut Hut',34.173504, -118.330145],
  ['Doughnut Dolly',37.83591, -122.262099],
  ['Sidecar Doughnuts & Coffee',33.633795, -117.916373],
  ['Donut Bar', 32.7177, -117.158769],
  ['Pink Box Doughnuts',36.195616, -115.258276],
  ['Hypnotic Donuts',32.826895, -96.710530],
  ['Revolution Doughnuts & Coffee', 33.765465, -84.308383],
  ['Glazed Gourmet Doughnuts',32.789448, -79.939048],
  ['Monuts Donuts',35.995238, -78.899890],
  ['Astro Doughnuts & Fried Chicken',38.898303, -77.030357],
  ['Federal Donuts',39.950593, -75.168097],
  ['Union Square Donuts', 42.380678, -71.097372],
  ['The Holy Donut', 43.655967, -70.274849],
  ['Blue Star Donuts',45.522087, -122.684147],
  ['Top Pot Doughnuts', 47.543425, -122.058318]
];


function setMarkers(map, locations) {
	var image = { 
		url: 'images/esther_donut_test_medium_2.png',
		size: new google.maps.Size(50, 85),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 85)
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
					
		var content = donut[0]
		
		var infowindow = new google.maps.InfoWindow()
		
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

function closeInfos(){
 
   if(infos.length > 0){
 
      /* detach the info-window from the marker ... undocumented in the API docs */
      infos[0].set("marker", null);
 
      /* and close it */
      infos[0].close();
 
      /* blank the array */
      infos.length = 0;
   }
}