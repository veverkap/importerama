/*
Read Data
Person � a person identified by username
Friends � the friendships of a person
Entry � view an entry
*/
function GetPersonDetails(username, details) {
	//http://api.dailymile.com/people/username.json
	$.getJSON('http://api.dailymile.com/people/' + username + '.json', function(data) {
		return data.location;
	});
}

function GetLoggedInUser() {
	$.ajax({
  		url: 'http://api.dailymile.com/people/me.json?oauth_code=' + access_token,
  		success: function(data) {
    		alert('Load was performed.');
	  	},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			air.Introspector.Console.log(errorThrown);
			air.Introspector.Console.log(textStatus);
		}
		});
}
/*
Read Streams
Public � a stream of everyone's entries
Person � a person's stream
You And Friends � the stream of the authenticated user and their friends
Nearby � a stream of entries nearby a location
*/
/*
Publish Data
Create Entry � post a workout, note, or image
Delete Entry � delete an entry
Create Comment � add a comment to an entry
Create Like � like an entry
Create Route � upload a GPX file to create a route
*/