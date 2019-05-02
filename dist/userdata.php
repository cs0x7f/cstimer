<?php
	define('CSTIMER_PREFIX', 'prefix');
	define('CSTIMER_USERDATA_LOGFILE', 'logfile');

	if (!isset($_POST['id']) || empty($_POST['id']) || strlen($_POST['id']) >= 250) {
		echo '{"retcode":400}';
		exit(0);
	}
	if (!preg_match("/^[a-zA-Z0-9]+$/", $_POST['id'])) {
		echo '{"retcode":400}';
		exit(0);
	}

	header("Access-Control-Allow-Origin: *");

	$redis = new Redis();
	$redis->connect('127.0.0.1', 1234);

	if (isset($_POST['data'])) {//SET
		if (!preg_match("/^[a-zA-Z0-9+\-]+$/", $_POST['data'])) {
			echo '{"retcode":400}';
			exit(0);
		}
		error_log("[" . date("Y-m-d H:i:sO") . "] SET " . $_POST['id'] . " " . strlen($_POST['data']) . "\n", 3, CSTIMER_USERDATA_LOGFILE);
		$result = $redis->set(CSTIMER_PREFIX . $_POST['id'], $_POST['data']);
		if ($result === true) {
			echo '{"retcode":0}';
		} else {
			echo '{"retcode":500}';
		}
	} else {//GET
		error_log("[" . date("Y-m-d H:i:sO") . "] GET " . $_POST['id'] . "\n", 3, CSTIMER_USERDATA_LOGFILE);
		$ret = $redis->get(CSTIMER_PREFIX . $_POST['id']);
		if ($ret === false) {
			echo '{"retcode":404}';
			exit(0);
		}
		echo '{"retcode":0,"data":"'.$ret.'"}';
	}
?>