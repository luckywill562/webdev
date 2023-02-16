<?php
if(!$app->IsAjax() || !$auth->isAuth()){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success'=>0,"status"=>500]);
}elseif($app->IsAjax() && $auth->isAuth()){
    header("Content-Type: application/json; charset=UTF-8");
    $user_data = [];
    $type = 'all';
    require_once DIR . '/views/RESTAPI/util/notifications_element.php';
    
    echo json_encode(["notifications"=>$user_data,'success'=>1,"status"=>200,]);
}