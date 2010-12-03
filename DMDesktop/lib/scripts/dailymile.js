/*
Read Data
Person � a person identified by username
Friends � the friendships of a person
Entry � view an entry
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

function parseActivityType(name) {
	name = name.toLowerCase();
	if (name == "run") { return "running"; }
	if (name == "bike") { return "cycling"; }
	if (name == "weights") { return "fitness"; }
	return "none";
}

function parseDistanceUnits(name) {
	name = name.toLowerCase();
	if (name == "mile") {
		return "miles";
	}
	if (name == "kilometer") {
		return "kilometers";
	}
	if (name == "yard") {
		return "yards";
	}
	if (name == "meter") {
		return "meters";
	}
	return "none";
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

function workoutDetails(d) {
	if (d.workout != null) {
		var output = " - ";
		if (d.workout.distance != null) {
			output += " " + d.workout.distance.value + " " + d.workout.distance.units;
		}
		if (d.workout.duration != null) {
			output += " / " + Math.floor(d.workout.duration/60) + " minutes";
		}
		if (d.workout.felt != null) {
			output += " / felt " + d.workout.felt;
		}
		return output;
	} else {
		return "";
	}
}

function YouAndFriends() {
	$.getJSON('http://importerama.veverka.net/friends.json', function(data) {
		$('#demo-contact').items(data.entries).chain(
				/* Custom data binding */
				{
					'.commentsdiv': {
						style: 'display: none;',
						id: function(d,el) {
							return 'comments_' + d.id;
						}
					},
					'.view_comments': {
						style: function(d,el) {
							if (d.comments.length == 0) {
								return "display: none;";
							}
						},
						content: function(d,el) {
							return " View Comments (" + d.comments.length + ") - ";
						},
						onclick: function(d,el) {
							return "$('#comments_" + d.id + "').show();";
						}
					},
					'.workout_specs': {
						content: function(d,el) {
							return workoutDetails(d);
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
							var dateObj = loadDate(d.created_at.toString());
							return textDateString(dateObj);
						}
					}

				}
			);
	});
	$("#demo-contact").show();		
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