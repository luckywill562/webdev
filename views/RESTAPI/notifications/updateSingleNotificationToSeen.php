<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['notification_id']) || empty($_POST['notification_id'])){
    header('500 Internal Server Error', TRUE, 500);
   echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['notification_id']) && !empty($_POST['notification_id'])){
    try {
        $notifTable->UpdateSingleNotificationToSeen($session_user_id, $_POST['notification_id']);
        $returnData = $app->msg(1,200,'ok'); 
    } catch (\Throwable $th) {
        $returnData = $app->msg(0,500,'error'); 
    }
    echo json_encode($returnData);
}