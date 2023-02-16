<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth()){
    header('500 Internal Server Error', TRUE, 500);
   echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth()){
    $post = json_decode($_POST['info'], true);
    $returnData = [];
    echo json_encode($returnData);
}