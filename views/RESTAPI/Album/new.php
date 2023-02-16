<?php 
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['security']) || empty($_POST['security']) ||
!isset($_POST['album_title']) || !isset($_POST['params']) || empty($_POST['params'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['params']) && 
isset($_POST['security']) && !empty($_POST['security']) && isset($_POST['album_title']) 
&& isset($_POST['params']) && !empty($_POST['params'])){
    $album_title = htmlspecialchars($app->trim($_POST['album_title']));
    try {
        $res = $AlbumTable->create_album($album_title,$session_user_id,$_POST['security']);
        $return = $app->msg(1,200,'step complète',['albumId'=> $res->id]);
    } catch (\Throwable $th) {
        $return = $app->msg(0,500,'une erreur s\'est produite');
    }
    echo json_encode($return);
}