<?php
function curl_post($url, array $post = NULL, array $options = array()) 
{ 
    $defaults = array( 
        CURLOPT_POST => 1, 
        CURLOPT_HEADER => 0, 
        CURLOPT_URL => $url, 
        CURLOPT_FRESH_CONNECT => 1, 
        CURLOPT_RETURNTRANSFER => 1, 
        CURLOPT_FORBID_REUSE => 1, 
        CURLOPT_TIMEOUT => 4, 
        CURLOPT_POSTFIELDS => http_build_query($post) 
    ); 

    $ch = curl_init(); 
    curl_setopt_array($ch, ($options + $defaults)); 
    if( ! $result = curl_exec($ch)) 
    { 
        trigger_error(curl_error($ch)); 
    } 
    curl_close($ch); 
    return $result; 
}
$a = array("grant_type" => "authorization_code", 
           "client_id" => "dk91QOkPgzChAP8oqBOB5gUKEk8afmDF7demeCtS", 
           "client_secret" => "8ZgPyMAk2VAWdIFc2qrTXT7lnQxZwVO0XEcvv3RW", 
           "redirect_uri" => "http://importerama.veverka.net/callback.php",
           "code" => $_GET["code"]);
$b = array();
echo curl_post("https://api.dailymile.com/oauth/token", $a, $b);
?>