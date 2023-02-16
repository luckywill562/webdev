<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['password']) || !isset($_POST['newPassword'])){
    header('500 Internal Server Error', TRUE, 500);
   echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['password']) && isset($_POST['newPassword'])){
    $data = $_POST;
    $returnData =[];
    $password = trim($data['password']);
    $newpassword = trim($data['newPassword']);
    $newpasswordConfirm = trim($data['newPasswordConfirm']);
    if(empty($data['password']) || empty($data['newPassword'])):
        $returnData = $app->msg(0,422,'veuillez completer tous les champs');
    elseif(strlen($password) < 8):
        $returnData = $app->msg(0,422,'Votre Mot de passe doit contenir au moins 8 caractères');
    elseif($newpasswordConfirm != $newpassword):
        $returnData = $app->msg(0,422,'Les deux mot de passe doit être identiques');
    elseif($password === $newpassword):
        $returnData = $app->msg(0,422,'Vous ne pouvez pas utiliser l\'ancien mot de passe');
    else:
        $user = $UsersTable->GetUser($session_user_id);
       
        $isauth = $auth->userVerification($domain,$user->email,$password,$jwt);
        if($isauth['success'] === 1){
            try {
                $TransactionTable->update('koko_users', $session_user_id,[
                    'password' => password_hash($newpassword, PASSWORD_DEFAULT,['cost'=>12]),
                ]);
                $returnData = $app->msg(1,200,'Votre mot de passe a été changé');
            } catch (\Throwable $th) {
                $returnData = $app->msg(0,500,'une erreur s\'est produite');
            }
        }else{
            $returnData = $app->msg(0,200,$isauth['message']);
        }
    endif;
    
    echo json_encode($returnData);
}