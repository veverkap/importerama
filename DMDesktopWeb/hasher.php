<?php
require_once './adodb_lite/adodb.inc.php';
$db = ADONewConnection('mysql');
$result = $db->PConnect("mysql.veverka.net", "importerama", "fhsp38ng!", "importerama");
$res = $db->Execute("SELECT * FROM `importerama`.`access_tokens` WHERE `hash` = '" . mysql_real_escape_string($_GET["hash"]) . "'");
$arr = array($res->fields["access_token"]);
echo json_encode($arr);
?>