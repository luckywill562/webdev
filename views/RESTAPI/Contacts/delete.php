<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['user_id']) || empty($_POST['user_id'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite!');
}elseif($auth->isAuth() && isset($_POST['user_id']) && !empty($_POST['user_id'])){
    try {
        $UsersTable->UnlikeUser($session_user_id,$_POST['user_id']);
        $returnData = $app->msg(1,200,'Le contact a été retirer');
    } catch (\Throwable $th) {
        //throw $th;
        $returnData = $app->msg(0,500,'une erreur s\'est produite!');
    }
}
echo json_encode($returnData);