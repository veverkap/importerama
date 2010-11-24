var connection = new air.SQLConnection();
var dbFile = air.File.applicationStorageDirectory.resolvePath("DMDesktop.db");

function GetAccessToken() {
	var sql = "SELECT access_token FROM credentials LIMIT 1";
	
	//In production, uncomment the if block to maintain the database.  
	if (!dbFile.exists) {  
 		var dbTemplate = air.File.applicationDirectory.resolvePath("DMDesktop_base.db");  
 		dbTemplate.copyTo(dbFile, true);    
	}
	
	connection.open(dbFile);
	air.trace("GetAccessToken - opened file");
	var statement = new air.SQLStatement();
	statement.sqlConnection = connection;
	statement.text = sql;
	air.trace("GetAccessToken - SQL: " + sql);
	statement.execute(-1, new air.Responder(function(result){
		if ((result.data != null) && (result.data.length > 0)) {
			access_token = result.data[0].access_token;
			air.trace("GetAccessToken - Token: " + access_token);
			return result.data[0].access_token;
		} else {
			air.trace("GetAccessToken - nothing found");
			access_token = null;
			return null;
		}
	}, function(error){
		air.trace("GetAccessToken - Error: " + error.message);
		access_token = null;
		return null;
	}));
}

function SetAccessToken(token) {
	var sql = "INSERT INTO credentials (access_token) VALUES ('" + token + "')";
	air.trace("SetAccessToken - Token: " + token);
	if (!connection.connected) {
		connection.open(dbFile);
	}
	air.trace("SetAccessToken - SQL: " + sql);
	var statement = new air.SQLStatement();
	statement.sqlConnection = connection;
	statement.text = sql;
	statement.execute(-1, new air.Responder(function(result){
		air.trace("SetAccessToken - success");
		return true;
	}, function(error){
		air.trace("SetAccessToken - Error: " + error.message);
		access_token = null;
		return null;
	}));
}