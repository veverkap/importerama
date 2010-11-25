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
		$("#logged_in_user").html(data.username);
		$("#logged_in_user_icon").attr('src', data.photo_url);
	});		
}

function YouAndFriends() {
	$.getJSON('http://importerama.veverka.net/friends.json', function(data) {
		$('#demo-contact').items(data.entries).chain(
				/* Custom data binding */
				{
					'.msg': {
						style: 'text-align: left',
						content: function(d, el){
							return d.message;
						}
					},
					'.msg_type': {
						content: function(d,el) {
							if (d.workout != null) {
								return d.workout.title;
							} else {
								return "";
							}
						}
					},
					'.username': {
						content: '{user.display_name}'
					},
					'.avatar': {
						src: '{user.photo_url}'
					},
					'.user_url': {
						href: '{user.url}'
					},
					'.datetime': {
						content: function(d,el) {
							//parse date string 2010-11-23T21:18:18Z
							var createdat = new Date(d.created_at.toString());
							air.Introspector.Console.log(createdat);
							air.Introspector.Console.log(d.created_at);
							var today = new Date();
							air.Introspector.Console.log(today);
							var seconds = Math.ceil((createdat.getTime()-today.getTime()) / 1000) * -1;
							var minutes = Math.ceil(seconds / 60);
							var hours = Math.ceil(minutes / 60);
							var days = Math.ceil(hours / 24);
							var output = "a";
							if (days > 1) {
								output = days + " days ago";
							}
							if (hours <= 24) {
								output = hours + " hours ago";
							}
							if (minutes <= 60) {
								output = minutes + " minutes ago";
							}
							air.Introspector.Console.log(output);
							return output;
						}
					}

				}
			);
	});
	$("#demo-contact").show();		
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