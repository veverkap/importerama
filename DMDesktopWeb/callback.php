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
echo $_GET["code"];
$link = mysql_connect('mysql.veverka.net', 'importerama', 'fhsp38ng!');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
echo 'Connected successfully';
mysql_close($link);
?>
<?php

?>
</body>
</html>