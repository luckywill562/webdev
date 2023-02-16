<?php
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['limit']) || empty($_POST['limit']) 
|| !isset($_POST['profile_id']) || empty($_POST['profile_id'])){
    header('500 Internal Server Error', TRUE, 500);
   echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['limit']) && !empty($_POST['limit'])
&& isset($_POST['profile_id']) && !empty($_POST['profile_id'])){
    if(isset($_POST['page']) && !empty($_POST['page'])):
        $page = $_POST['page'];
    else: $page = 0;endif;
    $user_data =[];
    foreach($AlbumTable->GetUservideos((int)$_POST['profile_id'],(int)$_POST['limit'], $app->Table('follows')->SecurityLevel($_POST['profile_id'], $session_user_id),$page) as $key => $val){
        $media_name = explode(".", $val->media_name);
        $imageUrl = $this->app->src($media_name[0].'.png',210,'largethumb');
        $user_data[$key] = $val->VideosArray;
    }
    if(count($user_data) === 0 || count($user_data) < $_POST['limit']){
        $has_next = false;
    }else{
        $has_next = true;
    }
    echo json_encode($app->msg(1,200,['videos' => $user_data,'has_next_page'=> $has_next]));
}