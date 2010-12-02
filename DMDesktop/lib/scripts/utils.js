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
    alert(message); 
} 
function CheckForUpdate() {
	appUpdater.configurationFile = new air.File("app:/updateConfig.xml"); 
	//air.trace(appUpdater);
	appUpdater.addEventListener(air.UpdateEvent.INITIALIZED, onUpdateInit);
	appUpdater.initialize();
}
function onUpdateInit() {
	appUpdater.checkNow();
}