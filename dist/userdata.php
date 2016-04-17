<?php
	if (!isset($_POST['id']) || empty($_POST['id'])) {
		echo '{"retcode":400}';
		exit(0);
	}
	if (!preg_match("/^[a-zA-Z0-9]+$/", $_POST['id'])) {
		echo '{"retcode":400}';
		exit(0);
	}

	$kv = new SaeKV();
	$ret = $kv->init();
	header("Access-Control-Allow-Origin: *");
	if (isset($_POST['data'])) {//SET
		$kv->set('timeruserdata_'.$_POST['id'], $_POST['data']);
		echo '{"retcode":0}';
	} else {//GET
		$ret = $kv->get('timeruserdata_'.$_POST['id']);
		if ($ret === false) {
			echo '{"retcode":404}';
			exit(0);
		}
		echo '{"retcode":0,"data":"'.$ret.'"}';
	}
?>