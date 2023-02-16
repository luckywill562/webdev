
<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth()){
    $reconnect = $auth->reconnect_from_coockie(false);
    if($reconnect){
        echo json_encode(["data"=>['session'=>1],'success'=>1,"status"=>200,]);
        $user_data = [];
    }else{
        header('500 Internal Server Error', TRUE, 500);
        echo json_encode(['success'=>0,"status"=>500]);
    }
}elseif($app->IsAjax() && $auth->isAuth()){
    $user_data = [];
    try {
        
        $type = 'reload';
        if((int) $_POST['is_data'] > 0){
            require_once DIR . '/views/RESTAPI/util/notifications_element.php';  
        }
        echo json_encode(["data"=>['session'=>1,'notifications'=> ['count'=>$notifTable->notificationcount($session_user_id)->count, 'newdata'=>$user_data] ],'success'=>1,"status"=>200,]);
    } catch (\Throwable $th) {
        echo json_encode(['success'=>0,"status"=>422]);
    }
}