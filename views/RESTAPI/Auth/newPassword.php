<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || $auth->isAuth() || !isset($_POST['password']) || !isset($_POST['passwordConfirm']) ||
!isset($_GET['user_id']) || empty($_GET['user_id']) || empty($_GET['reset_token']) || !isset($_GET['reset_token'])){
    header('500 Internal Server Error', TRUE, 500);
   echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && !$auth->isAuth() && isset($_POST['password']) && isset($_POST['passwordConfirm']) &&
isset($_GET['user_id']) && !empty($_GET['user_id']) && isset($_GET['reset_token']) && !empty($_GET['reset_token'])){
    $data = $_POST;
    $returnData =[];
    $password = trim($data['password']);
    $passwordConfirm = trim($data['passwordConfirm']);
    if(empty($password) || empty($passwordConfirm)):
        $returnData = $app->msg(0,422,'veuillez completer tous les champs');
    elseif(strlen($password) < 8):
        $returnData = $app->msg(0,422,'Votre Mot de passe doit contenir au moins 8 caractères');
    elseif($passwordConfirm != $password):
        $returnData = $app->msg(0,422,'Les deux mot de passe doit être identiques');
    else:
        if($auth->ResetAccount($_GET['user_id'], $_GET['reset_token'])){
            $UsersTable->update('koko_users', $_GET['user_id'],[
                'password' => password_hash($password, PASSWORD_DEFAULT,['cost'=>12]),
            ]);
            $UsersTable->update('koko_users', $_GET['user_id'],[
                'reset_token' => null,
                'resetAt'=> null
            ]);
            $returnData = $app->msg(1,200,'Votre mot de passe a bien été changé; vous pouvez vous connecter maintenant');
        }else{
            $returnData = $app->msg(0,404,'une erreur s\'est produite');
        }
    endif;
    
    echo json_encode($returnData);
}