<html>
<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		self.close();
	});
</script>
</head>
<body>
<?php
require_once './adodb_lite/adodb.inc.php';
$db = ADONewConnection('mysql');
$result = $db->PConnect("mysql.veverka.net", "importerama", "fhsp38ng!", "importerama");
echo $_GET["code"];
$db->Execute("INSERT INTO  `importerama`.`access_tokens` (`id`, `hash`, `access_token`) VALUES ('',  '" . mysql_real_escape_string($_GET["hash"]) . "', '" . mysql_real_escape_string($_GET["code"]) . "')");
?>
</body>
</html>