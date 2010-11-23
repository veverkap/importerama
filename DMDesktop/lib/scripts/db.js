var connection = new air.SQLConnection();
var dbFile = air.File.applicationStorageDirectory.resolvePath("DMDesktop.db");

function GetAccessToken() {
	connection.open(dbFile);
	var statement = new air.SQLStatement();
	statement.sqlConnection = connection;
	statement.text = "SELECT access_token FROM credentials LIMIT 1";
	statement.execute(-1, new air.Responder(
		 function(result) {
		   if (result.data.length > 0) {
			   air.trace(result.data[0].access_token);
			   access_token = result.data[0].access_token;
			   return result.data[0].access_token;
		   }
		 },
		 function(error) {
		   air.trace(error.message);
		   return null;
		 }));
}