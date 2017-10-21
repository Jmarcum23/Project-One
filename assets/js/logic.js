//Global Variables
var map;

//Display Brewery Info
function displayBreweryInfo() {
	var zipcode = $("#zipcode-input").val().trim();
	var queryURL = "http://api.brewerydb.com/v2/locations?postalCode=" + zipcode + "&key=0e8760e7ad6c26f9098f623ca7d0b5a7";
	var apiKey = "272f3002d2ba42214bb93754e572957f692647d0";

	        var proxyCall = function(queryURL){
			return framejax.ajax({
			method: "GET",
			dataType: "json",
			url: csProxyUtils.buildJsonpProxyUrl(apiKey, queryURL),
	  	});	
	};

	proxyCall(queryURL).done(function(response) {
		//console.log(response);
		//console.log(response.data.length);
		breweriesInfo(response.data);
		dropPins(response.data);
	});
}

function breweriesInfo(breweries){
	breweries.map(breweryInfo);
}

function breweryInfo(brewery, i) {
	console.log(brewery);
	var breweryDiv = $("<div class='brewery'>");
	var pOne = $("<p>").html("<h3><span class=\"brewery-num\">" + (i+1) + "</span> " + brewery.name + "</h3>");breweryDiv.append(pOne);
	var pTwo = $("<p>").html(brewery.streetAddress + "<br>" + brewery.locality + ", " + brewery.region + " " + brewery.postalCode + "<br>" + brewery.phone);breweryDiv.append(pTwo);
	var pThree = $('<p>').html("<a class=\"btn\" id=\"website-btn\" href=" + brewery.website + " target=\"_blank\">website" + "</a><br>" + "<hr>");breweryDiv.append(pThree);
	$('#form-content').append(breweryDiv);
}

//Google Map API 
function initMap() {
	var uluru = {lat: 32.7157, lng: -117.1611};
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 13,
	  scrollwheel: false,
	  center: uluru
	});
	var infoWindow = new google.maps.InfoWindow;


	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    var pos = {
	      lat: position.coords.latitude,
	      lng: position.coords.longitude
	    };

	    infoWindow.setPosition(pos);
	    infoWindow.setContent('Location found.');
	    infoWindow.open(map);
	    map.setCenter(pos);
	  }, function() {
	    handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function dropPin(pin){
		var latLng = new google.maps.LatLng(pin.latitude,pin.longitude);
        var marker = new google.maps.Marker({
	        position: latLng,
	        map: map,
	        draggable: true,
			animation: google.maps.Animation.DROP,
			icon: {
			url:'./assets/images/map-icon@2x.png',
			size: new google.maps.Size(40, 52),
			scaledSize: new google.maps.Size(40, 52),
			}
		});
		var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading map-heading">' + pin.name + '</h3>'+
            '<div id="bodyContent">'+
            '<p>' + pin.streetAddress + "<br>" + pin.locality + ", " + pin.region + " " + pin.postalCode + '</p>' + 
            '</div>'+
            '</div>';
		var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
		map.panTo(latLng);
		marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });
}

function dropPins(pins) {
	pins.map(dropPin);
}

//What happens when find breweries button is clicked
$("#find-breweries-btn").on("click", function(event) {
	event.preventDefault();
	$('#form-content').empty();
	displayBreweryInfo();
});

