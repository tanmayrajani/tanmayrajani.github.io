<?php
$iphone = strpos($_SERVER['HTTP_USER_AGENT'],"iPhone");
$android = strpos($_SERVER['HTTP_USER_AGENT'],"Android");
$palmpre = strpos($_SERVER['HTTP_USER_AGENT'],"webOS");
$berry = strpos($_SERVER['HTTP_USER_AGENT'],"BlackBerry");
$ipod = strpos($_SERVER['HTTP_USER_AGENT'],"iPod");
$nokia = strpos($_SERVER['HTTP_USER_AGENT'],"Nokia");
$windows = strpos($_SERVER['HTTP_USER_AGENT'],"Windows Phone");
$symbian= strpos($_SERVER['HTTP_USER_AGENT'],"SymbianOS");
if ($iphone || $android || $palmpre || $ipod || $berry || $nokia || $windows || $symbian== true) 
{ 
	header('Location: 2015/m/');
}else{
	header('Location: 2015/');
}
?>