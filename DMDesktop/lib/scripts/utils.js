function S4() {
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
	return (S4()+S4()+S4()+S4()+S4()).toUpperCase();
}
function htmlErrorHandler(event) { 
	event.preventDefault(); 
	var message = "exceptionValue:" + event.exceptionValue + "\n"; 
	for (var i = 0; i < event.stackTrace.length; i++){ 
    	message += "sourceURL:" + event.stackTrace[i].sourceURL +"\n"; 
        message += "line:" + event.stackTrace[i].line +"\n"; 
        message += "function:" + event.stackTrace[i].functionName + "\n"; 
	} 
    air.trace(message); 
} 
function CheckForUpdate() {
	air.trace("CheckForUpdate");
	appUpdater.configurationFile = new air.File("app:/updateConfig.xml"); 
	//air.trace(appUpdater);
	appUpdater.addEventListener(air.UpdateEvent.INITIALIZED, onUpdateInit);
	appUpdater.addEventListener(air.StatusUpdateErrorEvent.UPDATE_ERROR, onUpdateError);
	appUpdater.initialize();
}
function onUpdateError(e) {
	air.trace("CheckForUpdate - Error");
	alert('There was an error connecting to the update service.\r\nPlease make sure that you are connected to the Internet.');
	appUpdater.cancelUpdate();
}
function onUpdateInit() {
	air.trace("CheckForUpdate - init");
	appUpdater.checkNow();
}