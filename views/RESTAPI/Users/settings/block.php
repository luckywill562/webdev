<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['user_id']) || empty($_POST['user_id'])
|| !$PostTable->getUserExistence($_POST['user_id'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite!');
}elseif($auth->isAuth() && isset($_POST['user_id']) && !empty($_POST['user_id'])
&& $PostTable->getUserExistence($_POST['user_id'])){
    try {
        $action = $UsersTable->GetBlockage($_POST['user_id'], $session_user_id, 1);
        if($action){
            $PostTable->update('blocked',$action->id,[
                'confirmed'=> 0,
                'last_deblocage_date'=> date('Y-m-d H:i:s')
            ]);
            $returnData = $app->msg(1,200,'Vous avez débloquer cette utilisateur');
        }elseif($UsersTable->GetBlockage($_POST['user_id'], $session_user_id, 0)){
            $seconds = time() - strtotime($UsersTable->GetBlockage($_POST['user_id'], $session_user_id, 0)->last_deblocage_date);
            $hours = floor($seconds / 3600);
            if($hours <= 48){
                $returnData = $app->msg(0,422,'Vous devez attendre 48h pour pouvoir bloquer cette utilisateur');
            }else{
                $PostTable->update('blocked',$UsersTable->GetBlockage($_POST['user_id'], $session_user_id, 0)->id,[
                    'confirmed'=> 1,
                    'createdAt'=> date('Y-m-d H:i:s'),
                ]);
                $UsersTable->deleteFollower($session_user_id,$_POST['user_id']);
                $UsersTable->deleteFollower($_POST['user_id'],$session_user_id);
                $returnData = $app->msg(1,200,'Vous avez bloquer cet utilisateur');

            }
        }else{
            $PostTable->create('blocked',[
                'blocked_id' => (int)$_POST['user_id'],
                'blocker_id' => $session_user_id,
                'createdAt'=> date('Y-m-d H:i:s'),
                'confirmed'=> 1
            ]);
            $UsersTable->deleteFollower($_POST['user_id'],$session_user_id);
            $UsersTable->deleteFollower($session_user_id,$_POST['user_id']);
            $returnData = $app->msg(1,200,'Vous avez bloquer cet utilisateur');
        }
    } catch (\Throwable $th) {
        $returnData = $app->msg(0,500,'une erreur s\'est produite...!');
    }
}
echo json_encode($returnData);