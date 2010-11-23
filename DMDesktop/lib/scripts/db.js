var connection = new air.SQLConnection();
var dbFile = air.File.applicationStorageDirectory.resolvePath("DMDesktop.db");

function GetAccessToken() {
	air.Introspector.Console.log(dbFile);
	
	//In production, uncomment the if block to maintain the database.  
	if (!dbFile.exists) {  
 		var dbTemplate = air.File.applicationDirectory.resolvePath("DMDesktop_base.db");  
 		dbTemplate.copyTo(dbFile, true);    
	}
	
	connection.open(dbFile);
	
	var statement = new air.SQLStatement();
	statement.sqlConnection = connection;
	statement.text = "SELECT access_token FROM credentials LIMIT 1";
	statement.execute(-1, new air.Responder(function(result){
		if ((result.data != null) && (result.data.length > 0)) {
			access_token = result.data[0].access_token;
			return result.data[0].access_token;
		} else {
			return null;
		}
	}, function(error){
		air.trace(error.message);
		return null;
	}));
}