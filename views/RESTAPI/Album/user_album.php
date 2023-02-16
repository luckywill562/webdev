<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['user_id']) || empty($_POST['user_id'])){
    $app->headerError();
} elseif($app->IsAjax() AND $auth->isAuth() AND isset($_POST['user_id']) AND !empty($_POST['user_id'])){
    $user_data = [];
    $row = $UsersTable->GetUser($_POST['user_id']);
    if((int)$row->private === 0 || $_POST['user_id'] === $session_user_id || (bool)$app->Table('follows')->hasFollow($session_user_id,$_POST['user_id'],1)){
        foreach($AlbumTable->AlbumLists($_POST['user_id'],$_POST['page'],$_POST['limit'],$app->Table('follows')->SecurityLevel($_POST['user_id'], $session_user_id)) as $key => $val){
            $user_data[$key] = $val->AblumArray;   
        }
        
    }
    if(count($user_data) === 0 || count($user_data) < $_POST['limit']){
        $has_next_page = false;
    }else{
        $has_next_page = true;
    }
    echo json_encode(['album' =>['media_list' => $user_data,'has_next_page'=>$has_next_page],'success'=>1]);
}
exit();