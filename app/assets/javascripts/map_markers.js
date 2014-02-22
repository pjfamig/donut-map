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
	 	  		
	  setMarkers(map, allLocations, pos);
      map.setCenter(pos);

    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


   // Make map responsive
	var resizeTimeout; 
	google.maps.event.addDomListener(window, "resize", function() { 
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 		
		if (resizeTimeout) { 
			clearTimeout(resizeTimeout); 
		} 
	resizeTimeout = setTimeout(function() { /* do resizing */ }, 250); 
	});
	
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

  var pos = "40.111689,-99.228516";
  
  var options = {
    map: map,
    position: new google.maps.LatLng(40.111689,-99.228516),
    content: content
  };

  map.setCenter(options.position);
  setMarkers(map, allLocations, pos);
}

function setMarkers(map, allLocations, pos) {
	var image = { 
		url: 'images/donut_with_arrow.png',
		size: new google.maps.Size(64, 88),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(32, 88)
	};

	//create an array to store name-and-distance objects for sidebar
	var distances = [];

	//loop through all locations, set markers and info window
	for (var i = 0; i < allLocations.length; i++) {
	    var testResult = allLocations[i];
	    var myLatLng = new google.maps.LatLng(testResult.latitude, testResult.longitude);	
		var marker = new google.maps.Marker({
	        position: myLatLng,
	        map: map,
	        icon: image,
			title: testResult.name
	    });
	
		var infowindow = new google.maps.InfoWindow();
		
		//compute distance of each shop from origin
		distance = google.maps.geometry.spherical.computeDistanceBetween(pos, myLatLng);
		distance = (distance/1609.344).toFixed(1);
		
		//add distance objects to array
		distances[i] = new Object();
		distances[i].name = testResult.name;
		distances[i].distance = distance;
		
		var content = "<strong>" + testResult.name + "</strong>" + "<br>" + testResult.address + "<br>" + testResult.city + ", " + testResult.state + "<br><br>" + distance + " miles away!";
		
		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow) {
			return function() {
				var latLng = marker.getPosition(); //returns LatLng object
				map.panTo(latLng); 
				closeInfos();
				infowindow.setContent(content);
				infowindow.open(map,marker);
				infos[0] = infowindow;
			};
		})(marker,content,infowindow));
	}
	
	//pass array of distance objects
	findNearest(distances);
}


function findNearest(distances) {
	distances.sort(function(a, b) { 
	  return a.distance - b.distance  ||  a.name.localeCompare(b.name);
	});
	console.log(distances); //print to console for now
	//replace with sidebar output
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

var donuts3 = [
	{
		value: "King Pin Donuts", //this is what actually gets executed
		label: "<strong>King Pin Donuts</strong><br> 2521 Durant Ave, Berkeley, CA", // this is what gets searched and displayed
		desc: "2521 Durant Ave, Berkeley, CA" //this can be displayed but will not be searched
	},
	{
		value: "Fluffy Donuts",
		label: "<strong>Fluffy Donuts</strong><br>757 Russell Blvd, Davis, CA", 
		desc: "757 Russell Blvd, Davis, CA"
	},
	{
		value: "Golden Donut",
		label: "<strong>Golden Donut</strong><br>5401 Geary Blvd, San Francisco, CA",
		desc: "5401 Geary Blvd, San Francisco, CA"
	}
];


var donuts2 = [
	"King Pin Donuts, 2521 Durant Ave, Berkeley, CA",
	"Fluffy Donuts, 757 Russell Blvd, Davis, CA",
	"Golden Donut, 5401 Geary Blvd, San Francisco, CA",
	"Allstar Donuts, 901 Clement St, San Francisco, CA",
	"Donut King, 10400 Venice Blvd, Culver City, CA",
	"Donut King, 3970 Sepulveda Blvd, Culver City, CA",
	"Donut King, 1601 E Imperial Hwy, Los Angeles, CA",
	"Donut King 2, 15032 S Western Ave, Gardena, CA",
	"Stan\'s Corner Donut Shoppe, 10948 Weyburn Ave, Los Angeles, CA",
	"Randy\'s Donuts, 805 West Manchester Blvd, Inglewood, CA",
	"Krispy Kreme Doughnuts, 1231 Wilshire Blvd, Santa Monica, CA",
	"Bob\'s Coffee & Donuts, 6333 West 3rd Street #450, Los Angeles, CA",
	"Primo's Donuts, 2918 Sawtelle Blvd, Los Angeles, CA",
	"Donut Star, 5365 Alton Pkwy, Irvine, CA",
	"Doughnut Plant, 379 Grand St, New York, NY",
	"Doughnut Plant, 220 W 23rd St, New York, NY",
	"The Donut Man, 915 E Rte 66, Glendora, CA",
	"Doughnut Hut, 2025 W Magnolia Blvd, Burbank, CA",
	"Doughnut Dolly, 482 B 49th St, Oakland, CA",
	"Sidecar Doughnuts & Coffee, 270 E 17th St, Costa Mesa, CA",
	"Donut Bar, 631 B St, San Diego, CA",
	"Pink Box Doughnuts, 7531 W Lake Mead Blvd, Las Vegas, NV",
	"Hypnotic Donuts, 9007 Garland Rd, Dallas, TX",
	"Revolution Doughnuts & Coffee, 908 W College Ave, Decatur, GA",
	"Glazed Gourmet Doughnuts, 481 King St, Charleston, SC",
	"Monuts Donuts, 110 E Parrish St, Durham, NC",
	"Astro Doughnuts & Fried Chicken, 1308 G St NW, Washington, DC",
	"Federal Donuts, 1632 Sansom St, Philadelphia, PA",
	"Union Square Donuts, 16 Bow Street, Somerville, MA",
	"The Holy Donut, 194 Park Ave, Portland, ME",
	"Blue Star Donuts, 1237 SW Washington St, Portland, OR",
	"Top Pot Doughnuts, 1235 Maple Street, Issaquah, WA"
]

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