// Shows modal on window load
/*window.onload = function(){        
    $('#myModal').modal('show')
};*/


//var type = $('#location-type-select').val();
//var locality = $("#city-input").val();
//var region = $("#state-input").val();

var queryURL = "http://api.brewerydb.com/v2/?location=sandiego&key=0e8760e7ad6c26f9098f623ca7d0b5a7";


function breweryInfo(){
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
	/*var breweryDiv = $("<div class='brewery'>");
	var breweryName = response.name;
	var pOne = $("<p>").text("Brewery: " + breweryName);breweryDiv.append(pOne);
	breweryDiv.append(pOne);*/
});

}
breweryInfo();


