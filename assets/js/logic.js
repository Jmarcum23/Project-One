//Google Map API 
function initMap() {
	var uluru = {lat: 32.7157, lng: -117.1611};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 10,
	  scrollwheel: false,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	position: uluru,
	map: map,
	draggable: true,
	animation: google.maps.Animation.DROP,
	icon: {
	url:'file:///users/jmarcum/documents/school/project-one/assets/images/map-icon@2x.png',
	size: new google.maps.Size(40, 52),
	scaledSize: new google.maps.Size(40, 52),
	}
	});
	marker.addListener('click', toggleBounce);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

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
		var arrayLength = response.data.length;
		var breweryNum = 1;
		
		for (var i = 0; i < arrayLength; i++) {
			var brewery = response.data[i].name;
			var address = response.data[i].streetAddress;
			var locality = response.data[i].locality;
			var region = response.data[i].region;
			var postalCode = response.data[i].postalCode;
			var phone = response.data[i].phone;
			var website = response.data[i].website;	
			var pOne = $("<p>").html("<h3><span class=\"brewery-num\">" + breweryNum++ + "</span> " + brewery + "</h3>");breweryDiv.append(pOne);
			var pTwo = $("<p>").html(address + "<br>" + locality + ", " + region + " " + postalCode + "<br>" + phone);breweryDiv.append(pTwo);
			var pThree = $('<p>').html("<a class=\"btn\" id=\"website-btn\" href=" + website + " target=\"_blank\">website" + "</a><hr>");breweryDiv.append(pThree);
			$('#form-content').prepend(breweryDiv);
		}
	});
}

//What happens when find breweries button is clicked
$("#find-breweries-btn").on("click", function(event) {
	event.preventDefault();
	$('#form-content').empty();
	displayBreweryInfo();
});


