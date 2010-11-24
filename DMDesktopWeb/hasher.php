<?php
$hmm = '{"access_token":"iYwjcsoxMSj8Z8r4Z31Y0UqWIqtKwmM5XZBsdJIV"}';


$val = json_decode($hmm)->access_token;
echo $val;
?>