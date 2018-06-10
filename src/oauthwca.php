<?php

require 'WcaOauth.php';

$applicationId = '63a89d6694b1ea2d7b7cbbe174939a4d2adf8dd26e69acacd1280af7e7727554';
$applicationSecret = '0000000000000000000000000000000000000000000000000000000000000000';
$csTimerTokenSalt = '0000000000000000000000000000000000000000000000000000000000000000';

$validUrlRe = '/^(https?:\/\/([^\/]*\.)?cstimer\.net\/(new\/|src\/)?(timer\.php)?)(\?.*)?$/i';
$matches = array();

if (preg_match($validUrlRe, $_SERVER['HTTP_REFERER'], $matches) == 0) {
	exit;
}
$timerUrl = $matches[1];

$wca = new WcaOauth(array(
	'applicationId' => $applicationId,
	'applicationSecret' => $applicationSecret,
	'redirectUri' => $timerUrl,
	'scope' => 'public'
));

if(isset($_REQUEST["code"]) && !empty($_REQUEST["code"])) {
	try {
		$wca->fetchAccessToken($_REQUEST['code']);
		$user = $wca->getUser();
		print json_encode(array(
			'access_token' => $wca->getAccessToken(),
			'wca_me' => $user,
			'cstimer_token' => hash('sha256', $csTimerTokenSalt . $user->id)
		));
	} catch (Exception $e) {
		echo $e->getMessage();
		exit;
	}
}
