var infos = []

var donuts = [
  ['King Pin Donuts', 37.867962,-122.257937, 4, 'King Pin Donuts'],
  ['Fluffy Donuts & Sandwich Shop', 38.547016,-121.760390, 3, 'Fluffy Donuts & Sandwich Shop'],
  ['Golden Donut', 37.78036,-122.477255, 2, 'Golden Donut'],
  ['Allstar Donuts', 37.782603,-122.468864, 5, 'Allstar Donuts'],
  ['Donut King', 34.01986,-118.403967, 6, 'Donut King'],
  ['Donut King', 34.009511,-118.414014],
  ['Donut King', 33.929935,-118.245933],
  ['Donut King 2', 33.894821,-118.308743],
  ['Stans Corner Donuts', 34.062509,-118.447021],
  ['Randy\'s Donuts', 33.961851,-118.370452]
];

function setMarkers(map, locations) {
	var image = { 
		url: 'images/donut_test.png',
		size: new google.maps.Size(30, 30),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0, 30)
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
	
		map.setCenter(marker.getPosition())
		
		var content = donut[0]
		
		var infowindow = new google.maps.InfoWindow()
		
		google.maps.event.addListener(marker,'click', (function(marker,content,infowindow) { 
			return function() {
				
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