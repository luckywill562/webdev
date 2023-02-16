<?php 
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['Type']) || empty($_POST['Type'])
|| !isset($_POST['user_id']) || empty($_POST['user_id']) || empty($_POST['limit']) || !isset($_POST['limit'])){
    header('500 Internal Server Error', TRUE, 500);
   echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['Type']) && !empty($_POST['Type'])
&& isset($_POST['user_id']) && !empty($_POST['user_id']) && isset($_POST['limit']) && !empty($_POST['limit'])){
    try {
        $user_data=[];
        if(isset($_POST['idlist']) && !empty($_POST['idlist'])):
            $id = $_POST['idlist'];
            else: $id = '0';endif;
            $limit = $_POST['limit'];
        if($_POST['Type'] === 'followers'){
            $variable= $UsersTable->GetUserFollower($id,$_POST['user_id'],$session_user_id,$limit);
        }elseif($_POST['Type'] === 'Following'){
            $variable= $UsersTable->GetUserFollowing($id,$_POST['user_id'],$session_user_id,$limit);
        }elseif($_POST['Type'] === 'Request'){
            $variable = $UsersTable->RequestFollowing($id,$session_user_id,$limit);
        }
        foreach ($variable as $key => $user) {
            $user_data[$key]= $user->UserAuthor;
        }
        if(count($user_data) === 0 || count($user_data) < $limit ){
            $next = false;
        }else{
            $next = true;
        }
        echo json_encode($app->msg(1,200,'ok',$user_data=['followers'=>$user_data, 'has_next_next'=> $next]));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
   
}