<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$auth->isAuth() || !isset($_POST['q']) || empty($_POST['q']) ){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($auth->isAuth() && isset($_POST['q']) && !empty($_POST['q'])){
    $data = [];
    $q = $app->trim(stripslashes(htmlentities($_POST['q'])));
    foreach($UsersTable->SearchUser($q,$session_user_id) as $key => $val){
        $data[$key] = $val->UserAuthor;
    }
    echo json_encode(['users'=>$data]);
}