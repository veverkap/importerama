/*
Read Data
Person Ñ a person identified by username
Friends Ñ the friendships of a person
Entry Ñ view an entry
*/
function GetPersonDetails(username) {
	//http://api.dailymile.com/people/username.json
	$.getJSON('http://api.dailymile.com/people/' + username + '.json', function(data) {
		alert(data.location);
	});
}

function WhoAmI() {
	$.getJSON('https://api.dailymile.com/people/me.json?oauth_token=' + access_token, function(data) {
		//alert(data.username);
		$("#logged_in_user").html(data.username);
		$("#logged_in_user_icon").attr('src', data.photo_url);
		alert(data.photo_url);
	});		
}
/*
Read Streams
Public Ñ a stream of everyone's entries
Person Ñ a person's stream
You And Friends Ñ the stream of the authenticated user and their friends
Nearby Ñ a stream of entries nearby a location
*/
/*
Publish Data
Create Entry Ñ post a workout, note, or image
Delete Entry Ñ delete an entry
Create Comment Ñ add a comment to an entry
Create Like Ñ like an entry
Create Route Ñ upload a GPX file to create a route
*/