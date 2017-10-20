//Global Variables
var latitude;
var longitude;
var coords = [];
var arrayLength;
var breweryNum = 1;
var map;
var infoWindow;
var brewery;
var address;
var locality;
var region;
var postalCode;
var phone;
var website;
var infoWindow;
var contentString;


//Display Brewery Info
function displayBreweryInfo() {
	var zipcode = $("#zipcode-input").val().trim();
	var queryURL = "http://api.brewerydb.com/v2/locations?postalCode=" + zipcode + "&key=0e8760e7ad6c26f9098f623ca7d0b5a7";
	var apiKey = "272f3002d2ba42214bb93754e572957f692647d0";

	        var proxyCall = function(queryURL){
			return $.ajax({
			method: "GET",
			dataType: "json",
			url: csProxyUtils.buildProxyUrl(apiKey, queryURL),
	  	});	
	};

	proxyCall(queryURL).done(function(response) {

		console.log(response);
		console.log(response.data.length);
		var breweryDiv = $("<div class='brewery'>");
		arrayLength = response.data.length;

		for (var i = 0; i < arrayLength; i++) {
			brewery = response.data[i].name;
			address = response.data[i].streetAddress;
			locality = response.data[i].locality;
			region = response.data[i].region;
			postalCode = response.data[i].postalCode;
			phone = response.data[i].phone;
			website = response.data[i].website;	
			latitude = response.data[i].latitude;
			longitude = response.data[i].longitude;	
			coords[i] = [latitude,longitude];
			var pOne = $("<p>").html("<h3><span class=\"brewery-num\">" + breweryNum++ + "</span> " + brewery + "</h3>");breweryDiv.append(pOne);
			var pTwo = $("<p>").html(address + "<br>" + locality + ", " + region + " " + postalCode + "<br>" + phone);breweryDiv.append(pTwo);
			var pThree = $('<p>').html("<a class=\"btn\" id=\"website-btn\" href=" + website + " target=\"_blank\">website" + "</a><br>" + "<hr>");breweryDiv.append(pThree);
			$('#form-content').prepend(breweryDiv);
		}
		dropPins();
	});
}

//Google Map API 
function initMap() {
	var uluru = {lat: 32.7157, lng: -117.1611};
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 13,
	  scrollwheel: false,
	  center: uluru
	});
	infoWindow = new google.maps.InfoWindow;


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

function dropPins () {
	for (var i = 0; i < arrayLength; i++){
		var latLng = new google.maps.LatLng(coords[i][0],coords[i][1]);
        var marker = new google.maps.Marker({
	        position: latLng,
	        map: map,
	        draggable: true,
			animation: google.maps.Animation.DROP,
			icon: {
			url:'file:///users/jmarcum/documents/school/project-one/assets/images/map-icon@2x.png',
			size: new google.maps.Size(40, 52),
			scaledSize: new google.maps.Size(40, 52),
			}
		});
		contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading map-heading">' + brewery + '</h3>'+
            '<div id="bodyContent">'+
            '<p>' + address + "<br>" + locality + ", " + region + " " + postalCode + '</p>' + 
            '</div>'+
            '</div>';
		infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
		map.panTo(latLng);
		marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });

	}
}

//What happens when find breweries button is clicked
$("#find-breweries-btn").on("click", function(event) {
	event.preventDefault();
	breweryNum = 1;
	$('#form-content').empty();
	displayBreweryInfo();
});

