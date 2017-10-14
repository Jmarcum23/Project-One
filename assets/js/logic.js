
$("#find-breweries-btn").on("click", function(event) {
var zipcode = $("#zipcode-input").val().trim();
var queryURL = "http://api.brewerydb.com/v2/locations?postalCode=" + zipcode + "&key=0e8760e7ad6c26f9098f623ca7d0b5a7";

        event.preventDefault();
        var proxyCall = function(queryURL){
		return $.ajax({
		method: "POST",
		dataType: "json",
		url: "https://proxy-cbc.herokuapp.com/proxy",
		data: {
		url: queryURL
		}
  	});
};

proxyCall(queryURL).done(function(response) {

	console.log(response);
	var breweryDiv = $("<div class='brewery'>");
	var brewery = response.data.data[0].name;
	var address = response.data.data[0].streetAddress;
	var website = response.data.data[0].website;
	var pOne = $("<p>").text("Brewery: " + brewery);breweryDiv.append(pOne);
	var pTwo = $("<p>").text("Address: " + address);breweryDiv.append(pTwo);
	var pThree = $('<p>').text("Website: " + website);breweryDiv.append(pThree);
	$('#content').prepend(breweryDiv);
});
});


