<?php
	define('CSTIMER_USERDATA_LOGFILE', 'logfile');

	if (!isset($_POST['id']) || empty($_POST['id']) || strlen($_POST['id']) >= 250) {
		echo '{"retcode":400,"reason":"invalid uid"}';
		exit(0);
	}
	if (!preg_match("/^[a-zA-Z0-9]+$/", $_POST['id'])) {
		echo '{"retcode":400,"reason":"invalid uid"}';
		exit(0);
	}
	if (!isset($_POST['offset']) || empty($_POST['offset'])) {
		$offset = '0';
	} else if (!preg_match("/^[0-9]+$/", $_POST['offset']) || strlen($_POST['offset']) > 5) {
		echo '{"retcode":400,"reason":"invalid offset"}';
		exit(0);
	} else {
		$offset = $_POST['offset'];
	}
	header("Access-Control-Allow-Origin: *");
	$uid = $_POST['id'];

	$db = new mysqli('localhost', 'cstimer', '', 'cstimer');
	if ($db->connect_errno) {
		echo '{"retcode":500,"reason":"db connect error"}';
		die('Could not connect: ' . $db->connect_error);
	}

	if (isset($_POST['data'])) {//SET
		if (!preg_match("/^[a-zA-Z0-9+\-]+$/", $_POST['data'])) {
			echo '{"retcode":400,"reason":"invalid data"}';
			exit(0);
		}
		$data = $_POST['data'];
		error_log("[" . date("Y-m-d H:i:sO") . "] SET $uid " . strlen($data) . "\n", 3, CSTIMER_USERDATA_LOGFILE);
		$data_md5 = md5($data);
		$data_len = strlen($data);
		$sql = "INSERT INTO `export_data` (`uid`, `value_hash`, `value_len`, `value`) VALUES ('$uid', '$data_md5', '$data_len', '$data') ON DUPLICATE KEY UPDATE `upload_time` = CURRENT_TIMESTAMP";
		$ret = $db->query($sql);
		if ($ret === true) {
			echo '{"retcode":0}';
		} else {
			echo '{"retcode":500,"reason":"db insert error"}';
		}
	} else if (isset($_POST['cnt'])) {
		$sql = "SELECT `value_len` AS size, unix_timestamp(`upload_time`) AS modifiedTime FROM `export_data` WHERE `uid` = '$uid' ORDER BY `upload_time` DESC";
		$ret = $db->query($sql);
		if ($ret === false) {
			echo '{"retcode":500,"reason":"db select error"}';
			exit(0);
		}
		$arr = array();
		while($row = $ret->fetch_assoc()) {
			$row['modifiedTime'] = date("c", $row['modifiedTime']);
			$arr[] = $row;
		}
		$ret = json_encode($arr);
		error_log("[" . date("Y-m-d H:i:sO") . "] CNT $uid " . $ret . "\n", 3, CSTIMER_USERDATA_LOGFILE);
		echo '{"retcode":0,"data":"' . count($arr) . '","files":' . $ret . '}';
	} else {//GET
		$sql = "SELECT `value` FROM `export_data` WHERE `uid` = '$uid' ORDER BY `upload_time` DESC LIMIT $offset,1;";
		$ret = $db->query($sql);
		if ($ret === false) {
			echo '{"retcode":500,"reason":"db select error"}';
			exit(0);
		}
		if ($ret->num_rows == 0) {
			echo '{"retcode":404,"reason":"not found"}';
			exit(0);
		}
		$ret = $ret->fetch_assoc()['value'];
		error_log("[" . date("Y-m-d H:i:sO") . "] GET $uid " . strlen($ret) . " $offset\n", 3, CSTIMER_USERDATA_LOGFILE);
		echo '{"retcode":0,"data":"' . $ret . '"}';
	}
?>
