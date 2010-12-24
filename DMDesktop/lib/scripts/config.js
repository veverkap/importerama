var dmDesktopURL = "http://dmdesktop.veverka.net/";
var clientID = "dk91QOkPgzChAP8oqBOB5gUKEk8afmDF7demeCtS";

//PRODUCTION URLS
var dailyMileURL = "https://api.dailymile.com/";
var oauthURL = dailyMileURL + "oauth/authorize?response_type=code&client_id=" + clientID + "&redirect_uri=" + dmDesktopURL + "callback.php";

//TESTING URLS
//var dailyMileURL = "http://dmdesktop.veverka.net/";
//var oauthURL = dailyMileURL + "oauth/authorize.php?response_type=code&client_id=" + clientID + "&redirect_uri=" + dmDesktopURL + "fauxcallback.php";