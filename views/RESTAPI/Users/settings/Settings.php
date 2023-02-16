<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['name']) || empty($app->trim($_POST['name'])) || 
!isset($_POST['username']) || empty($app->trim($_POST['username']))){
    header('500 Internal Server Error', TRUE, 500);
   echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['name']) && !empty($app->trim($_POST['name']))
&& isset($_POST['username']) && !empty($app->trim($_POST['username']))){
    $returnData =[];
    
    if(empty($app->trim($_POST['name'])) && empty($app->trim($_POST['username'])) && empty(trim($_POST['bio'])) ||
     $_POST['name'] === null &&  $_POST['username'] === null):
        $fields = ['fields' => ['nom','username','biographie']];
        $returnData = $app->msg(0,422,'Vous n\'avez pas apportez un changement!',$fields);
    elseif(!empty($app->trim($_POST['name'])) && strlen($app->trim($_POST['name']))>4 
    || !empty($app->trim($_POST['username'])) && strlen($app->trim($_POST['username'])) > 4
    || !empty($app->trim($_POST['bio'])) && strlen($app->trim($_POST['bio'])) > 0 && strlen($app->trim($_POST['bio'])) <= 300 &&
    $_POST['name'] != 'undefined' && $_POST['name'] != null && 
    $_POST['username'] != 'undefined' && $_POST['username'] != null
    ):
    
    try {
        //code...
        $input = trim($client->toShort($_POST['username']));
        $pattern1 = '/[\'\/~`\!@#$%\^&\*\(\)\-\+=\{\}\[\]\|;:"\<\>,\\?\\\]/';
        $pattern2 = '/[\s]+/';
        $result = [];
        if (preg_match($pattern1, $input) || preg_match($pattern2, $input) || (bool)array_search($input,$routerArray)){
            $result= $app->msg(0,500,'error');
        }else{
            $res = $app->Table('users')->update('koko_users',$session_user_id,[
                'name' => $app->trim(htmlspecialchars($_POST['name'])),
                'username' => $app->trim(htmlspecialchars($_POST['username'])),
                'bio' => $app->trim(htmlspecialchars($_POST['bio'])),
            ]);
            $result = $app->msg(1,200,'success');
        }
    } catch (\Throwable $th) {
        header('500 Internal Server Error', TRUE, 500);
       $result= $app->msg(0,500,'error');
    }
    if($result['success'] === 1){
        $returnData = $app->msg(1,200,'La modification que vous avez apportez a bien ete enregister!',['user'=> $UsersTable->GetUser((int)$session_user_id)->UserAuthor]);
    }else{
        header('500 Internal Server Error', TRUE, 500);
        $returnData = $app->msg(0,500,'Une erreur s\'est produite!');
    }
    endif;
    echo json_encode($returnData);
}