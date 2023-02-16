<?php
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['with_id']) || empty($_POST['with_id'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success'=>0,"status"=>500]);
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['with_id']) && !empty($_POST['with_id'])){
    header("Content-Type: application/json; charset=UTF-8");
    die(var_dump($UsersTable->checkMatched($_POST['with_id'], $session_user_id)));
    if($UsersTable->checkMatched($session_user_id,$_POST['with_id']) == false): $status = false; else: $status = true;endif;
    $returnData = $app->msg(1,200,['match'=>$status]);
    echo json_encode($returnData);
}