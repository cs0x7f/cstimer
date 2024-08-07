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
		$sql = "INSERT INTO `export_data2` (`uid`, `value_hash`, `value_len`, `value`) VALUES ('$uid', '$data_md5', '$data_len', '$data') ON DUPLICATE KEY UPDATE `upload_time` = CURRENT_TIMESTAMP";
		$ret = $db->query($sql);
		if ($ret === true) {
			echo '{"retcode":0}';
		} else {
			echo '{"retcode":500,"reason":"db insert error"}';
		}
	} else if (isset($_POST['cnt'])) {
		$sql = "SELECT `value_len` AS size,
					`value_nsolv` AS nsolv,
					unix_timestamp(`upload_time`) AS modifiedTime 
				FROM (
					SELECT `value_len`, `value_nsolv`, `upload_time` FROM `export_data` WHERE `uid` = '$uid'
					UNION ALL 
					SELECT 0, `value_nsolv`, `upload_time` FROM `export_data2` WHERE `uid` = '$uid'
				) t1 ORDER BY `upload_time` DESC";
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
	} else if (isset($_POST['datas'])) {//SETMUL
		if (!preg_match("/^[a-zA-Z0-9,]+$/", $_POST['ids'])) {
			echo '{"retcode":400,"reason":"invalid ids"}';
			exit(0);
		}
		$ids = explode(",", $_POST['ids'], 4096);
		if (count($ids) >= 4096) {
			echo '{"retcode":400,"reason":"invalid ids"}';
			exit(0);
		}
		if (!preg_match("/^[a-zA-Z0-9+\-,]+$/", $_POST['datas'])) {
			echo '{"retcode":400,"reason":"invalid data"}';
			exit(0);
		}
		$datas = explode(",", $_POST['datas'], 4096);
		if (count($datas) != count($ids)) {
			echo '{"retcode":400,"reason":"invalid datas"}';
			exit(0);
		}
		foreach ($ids as $id1) {
			if (strlen($id1) >= 250 || strlen($id1) < 1) {
				echo '{"retcode":400,"reason":"invalid ids"}';
				exit(0);
			}
		}
		error_log("[" . date("Y-m-d H:i:sO") . "] SETMUL $uid " . count($ids) . " datas\n", 3, CSTIMER_USERDATA_LOGFILE);
		$sql = "INSERT INTO `export_data2` (`uid`, `value_hash`, `value_len`, `value`) VALUES ";
		for ($i1 = 0; $i1 < count($ids); $i1++) {
			$data = $datas[$i1];
			$data_md5 = md5($data);
			$data_len = strlen($data);
			$sql = $sql . ($i1 == 0 ? "" : ",") . "('$ids[$i1]', '$data_md5', '$data_len', '$data')";
		}
		$sql = $sql . " ON DUPLICATE KEY UPDATE `upload_time` = CURRENT_TIMESTAMP";
		$ret = $db->query($sql);
		if ($ret === true) {
			echo '{"retcode":0}';
		} else {
			echo '{"retcode":500,"reason":"db insert error"}';
		}
	} else if (isset($_POST['exists'])) {//EXISTS
		if (!preg_match("/^[a-zA-Z0-9,]+$/", $_POST['exists'])) {
			echo '{"retcode":400,"reason":"invalid ids"}';
			exit(0);
		}
		$ids = explode(",", $_POST['exists'], 4096);
		if (count($ids) >= 4096) {
			echo '{"retcode":400,"reason":"invalid ids"}';
			exit(0);
		}
		foreach ($ids as $id1) {
			if (strlen($id1) >= 250 || strlen($id1) < 1) {
				echo '{"retcode":400,"reason":"invalid ids"}';
				exit(0);
			}
		}
		$sql = "SELECT DISTINCT `uid` FROM `export_data2` WHERE `uid` in ('" . join("','", $ids) . "')";
		$ret = $db->query($sql);
		if ($ret === false) {
			echo '{"retcode":500,"reason":"db select error"}';
			exit(0);
		}
		$arr = array();
		while($row = $ret->fetch_assoc()) {
			$arr[] = $row['uid'];
		}
		error_log("[" . date("Y-m-d H:i:sO") . "] EXISTS $uid " . count($ids) . "\n", 3, CSTIMER_USERDATA_LOGFILE);
		echo '{"retcode":0,"datas":' . json_encode($arr) . '}';
	} else if (isset($_POST['ids'])) {//GETMUL
		if (!preg_match("/^[a-zA-Z0-9,]+$/", $_POST['ids'])) {
			echo '{"retcode":400,"reason":"invalid ids"}';
			exit(0);
		}
		$ids = explode(",", $_POST['ids'], 4096);
		if (count($ids) >= 4096) {
			echo '{"retcode":400,"reason":"invalid ids"}';
			exit(0);
		}
		foreach ($ids as $id1) {
			if (strlen($id1) >= 250 || strlen($id1) < 1) {
				echo '{"retcode":400,"reason":"invalid ids"}';
				exit(0);
			}
		}
		$sql = "SELECT `uid`, `value` FROM `export_data2` WHERE `uid` in ('" . join("','", $ids) . "')";
		$ret = $db->query($sql);
		if ($ret === false) {
			echo '{"retcode":500,"reason":"db select error"}';
			exit(0);
		}
		$arr = array();
		while($row = $ret->fetch_assoc()) {
			$arr[$row['uid']] = $row['value'];
		}
		error_log("[" . date("Y-m-d H:i:sO") . "] GETMUL $uid " . count($ids) . "\n", 3, CSTIMER_USERDATA_LOGFILE);
		echo '{"retcode":0,"datas":' . json_encode($arr) . '}';
	} else {//GET
		$sql = "SELECT `value`
				FROM (
					SELECT `value`, `upload_time` FROM `export_data` WHERE `uid` = '$uid'
					UNION ALL 
					SELECT `value`, `upload_time` FROM `export_data2` WHERE `uid` = '$uid'
				) t1 ORDER BY `upload_time` DESC LIMIT $offset,1;";
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
