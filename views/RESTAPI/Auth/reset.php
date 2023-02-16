<?php
if($app->IsAjax() && !$auth->isAuth()){
    header("Content-Type: application/json; charset=UTF-8");
    $returnData = [];
    if(!isset($_GET['user_id']) || !isset($_GET['reset_token']) || empty($_GET['user_id']) || !isset($_GET['reset_token'])){
        $returnData = $app->msg(0,404,'Page Not Found jj!');
    }elseif(isset($_GET['user_id']) && isset($_GET['reset_token']) && !empty($_GET['user_id']) 
    && !empty($_GET['reset_token'])){
        if($auth->ResetAccount($_GET['user_id'], $_GET['reset_token'])){
            $returnData = $app->msg(1,200,'ok');
        }else{
            $returnData = $app->msg(0,404,'Page Not Found!');
        }
    }
    echo json_encode($returnData);
}