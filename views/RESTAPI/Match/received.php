<?php
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['limit']) || empty($_POST['limit'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success'=>0,"status"=>500]);
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['limit']) && !empty($_POST['limit'])){
    header("Content-Type: application/json; charset=UTF-8");
    $returnData = [];
    $user_data=[];
    foreach($matchTable->UserLikeMe($session_user_id) as $key => $val) {
        $user_data[$key] = $UsersTable->GetUser($val->userPid)->UserFilter;
    }
    if(count($user_data) === 0 || count($user_data) < $_POST['limit']){
        $has_next = false;
    }else{
        $has_next = true;
    }
    $returnData = $app->msg(1,200, $user_data,['has_next_page'=> $has_next]);
    echo json_encode($returnData);
}