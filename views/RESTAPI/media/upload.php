<?php 

header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_FILES)){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite lors du traitement du media'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_FILES)){
    try {
        include_once('getID3/getid3/getid3.php');
        $getID3 = new getID3;
        $dataname = $fileTable->uniqid(0,20);
        $uploader = new Src\App\MyChunkUploader\MyChunkUploader(null,$app,$getID3);
        $uploader->run($file_path, $dataname);
        exit();
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}