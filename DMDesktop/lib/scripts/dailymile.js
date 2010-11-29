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

function loadDate(dateString) {
	var today = new Date();
	var yearx = parseInt(dateString.substring(0,4));
	var monthx = parseInt(dateString.substring(5,7)) - 1;
	var dayx = parseInt(dateString.substring(8,10));
	var gmtHours = -today.getTimezoneOffset()/60;
	var hourx = parseInt(dateString.substring(11,13)) + gmtHours;
	var minutex = parseInt(dateString.substring(14,16));
	var secondx = parseInt(dateString.substring(17,19));
	return new Date(yearx, monthx, dayx, hourx, minutex, secondx, 0);
}

function textDateString(dateObj) {
	var today = new Date();
	var seconds = Math.ceil((dateObj.getTime()-today.getTime()) / 1000) * -1;
	var minutes = Math.ceil(seconds / 60);
	var hours = Math.ceil(minutes / 60);
	var days = Math.ceil(hours / 24);
	var output = "";
	if (days > 1) {
		output = days + " days ago";
	}
	if (hours <= 24) {
		output = hours + " hours ago";
	}
	if (minutes <= 60) {
		output = minutes + " minutes ago";
	}
	return output;
}

function YouAndFriends() {
	$.getJSON('http://importerama.veverka.net/friends.json', function(data) {
		$('#demo-contact').items(data.entries).chain(
				/* Custom data binding */
				{
					'.workout_specs': {
						content: function(d,el) {
							if (d.workout != null) {
								return " - ";
							} else {
								return "";
							}
						}
					},
					'.workout_type': {
						content: function(d,el) {
							if (d.workout != null) {
								return " - " + d.workout.activity_type.toLowerCase() + " workout";
							} else {
								return "";
							}
						}
					},
					'.msg': {
						style: 'text-align: left',
						content: function(d, el){
							return d.message;
						}
					},
					'.msg_title': {
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
							var today = new Date();
							var x = d.created_at.toString();
							var yearx = x.substring(0,4);
							var monthx = parseInt(x.substring(5,7));
							monthx = monthx-1;
							var dayx = x.substring(8,10);
							var hourx = parseInt(x.substring(11,13));
							var minutex = x.substring(14,16);
							var secondx = x.substring(17,19);
							var gmtHours = -today.getTimezoneOffset()/60;
							hourx = hourx + gmtHours;
							var createdat = new Date(yearx, monthx, dayx, hourx, minutex, secondx, 0);
							var seconds = Math.ceil((createdat.getTime()-today.getTime()) / 1000) * -1;
							var minutes = Math.ceil(seconds / 60);
							var hours = Math.ceil(minutes / 60);
							var days = Math.ceil(hours / 24);
							var output = "";
							if (days > 1) {
								output = days + " days ago";
							}
							if (hours <= 24) {
								output = hours + " hours ago";
							}
							if (minutes <= 60) {
								output = minutes + " minutes ago";
							}
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