var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

initialize();
		
function initiate_geolocation() {  
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(handle_geolocation_query, error);
	}
	else {
		error();
	}
}  
function handle_geolocation_query(position){  
    calcRoute(position.coords.latitude + ',' + position.coords.longitude);

}
function error(error){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("postcode").style.display = "block";
}

function postcode(){
	var postcode = document.getElementById("postcode-input").value;
	calcRoute(postcode);
	close();
}

function close(){
	document.getElementById("overlay").style.display = "none";
    document.getElementById("postcode").style.display = "none";
}

function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var LatLng = new google.maps.LatLng(56.118027,-3.937885);
	var mapOptions = {
	zoom: 14,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	center: LatLng
	}
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	var marker = new google.maps.Marker({
	    position: LatLng,
	    map: map,
	    title:"Cafè Cocoas"
	});

	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directions-panel"));
}

function calcRoute(location) {
	var start = location;
	var end = "56.118027,-3.937885";
	var request = {
	origin:start,
	destination:end,
	travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(result, status) {
	if (status == google.maps.DirectionsStatus.OK) {
		directionsDisplay.setDirections(result);
	}else{
		alert("Sorry! There was a glitch in the matrix, try again.")
	}
	});
}