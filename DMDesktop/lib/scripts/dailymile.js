/*
Read Data
Person Ñ a person identified by username
Friends Ñ the friendships of a person
Entry Ñ view an entry
*/
function GetPersonDetails(username) {
	//http://api.dailymile.com/people/username.json
	$.getJSON(dailyMileURL + 'people/' + username + '.json', function(data) {
		//alert(data.location);
	});
}

function ValidateToken() {
	air.trace('ValidateToken');
	air.trace(dailyMileURL);
	var url = dailyMileURL + '/people/me.json?oauth_token=' + access_token;
	$.ajax({
		url: url,
		success: function(data) { 
			token_checked = true;
			return true; 
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			air.trace(textStatus);
			if (XMLHttpRequest.status == "400") {
				alert("There seems to be a problem with your network connection.\r\nPlease check your connection and restart the program.");
				air.NativeApplication.nativeApplication.exit();
				return false;
			} else if (XMLHttpRequest.status == "406") {
				access_token = null;
				token_checked = true;
				return false;
			} else {
				alert("There was an error connecting to the DailyMile website.\r\nPlease reauthenticate.");
				access_token = null;
				token_checked = true;
				return false;
			}
		}
	});
}

function WhoAmI() {
	$.getJSON(dailyMileURL + '/people/me.json?oauth_token=' + access_token, function(data) {
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
	$.getJSON(dailyMileURL + 'entries/friends.json?oauth_token=' + access_token, function(data) {
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
							var dateObj = loadDate(d.at.toString());
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
Public Ñ a stream of everyone's entries
Person Ñ a person's stream
You And Friends Ñ the stream of the authenticated user and their friends
Nearby Ñ a stream of entries nearby a location
*/
/*
Publish Data
Create Entry Ñ post a workout, note, or image

POST https://api.dailymile.com/entries.json
Parameters:
message, string (optional)
	text of the note to post or the "how did it go?" text to accompany a workout
lat, float (optional)
	the latitude of this entry, between -90 and 90
lon, float (optional)
	the longitude of this entry, between -180 and 180

workout[activity_type], string (optional)
	one of "running", "cycling", "swimming", "walking", or "fitness"
workout[completed_at], datetime (optional)
	when the workout was done, ex: 2010-12-25 12:15:00
workout[distance][value], float (optional)
	the distance indicated by units
workout[distance][units], string (optional)
	one of "miles", "kilometers", "yards", or "meters"; defaults depending on user's units preference and activity type
workout[duration], integer (optional)
	the number of seconds spent working out
workout[felt], string (optional)
	one of "great", "good", "alright", "blah", "tired" or "injured"
workout[calories], integer (optional)
	the number of calories burned during the workout
workout[title], string (optional)
	optional title for a workout

media[type], string
	image
media[url], string
	the URL to the photo
*/
function createEntry(entryDetails) {
	var details = {
		message : entryDetails.notes,
		workout: {
			activity_type: entryDetails.activityType,
			completed_at: entryDetails.date + " " + entryDetails.time,
			distance: {
				value: entryDetails.distance,
				units: entryDetails.distanceUnit
			},
			duration: entryDetails.durationSeconds
		}
	}
	air.trace(access_token);
	air.trace(details.message);
	air.trace(details.workout.activity_type);
	air.trace(details.workout.completed_at);
	air.trace(details.workout.distance.value);
	air.trace(details.workout.distance.units);
	air.trace(details.workout.duration);
	$.post(dailyMileURL + 'entries.json?oauth_token=' + access_token, details, function(data) {
		//air.Introspector.Console.log(data);
		alert(data);
		air.trace("DONE");
	});
}
/*
Delete Entry Ñ delete an entry
Create Comment Ñ add a comment to an entry
Create Like Ñ like an entry
Create Route Ñ upload a GPX file to create a route
*/