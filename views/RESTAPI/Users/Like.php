<?php 
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];

if(!$auth->isAuth() || !isset($_POST['liked_id']) || empty($_POST['liked_id']) || !isset($_POST['action']) || empty($_POST['action']) || !$PostTable->getUserExistence($_POST['liked_id'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, réessayer plus tard!');
}elseif($auth->isAuth() && isset($_POST['liked_id']) && !empty($_POST['liked_id']) && isset($_POST['action']) && !empty($_POST['action']) && $PostTable->getUserExistence($_POST['liked_id'])){
    try {
        $liked_id = (int)$_POST['liked_id']; 
        $user = $UsersTable->GetUser($session_user_id);
        switch ($_POST['action']) {
            case 'LOVE':
                try {
                    if($UsersTable->getLove($liked_id,$session_user_id,0)):
                        $UsersTable->AcceptRequestCrush($session_user_id,$liked_id);
                        $returnData = $app->msg(1,200,'C\'est un match, vous pouvez discuté maintenant!',['payload'=>['type'=>'ACCEPT','count'=>(int)$notifTable->countUserLoveRequestNotSeen($liked_id)->count]]);
                    else :
                        $res =  $UsersTable->LikedUser($session_user_id,$liked_id);
                        $returnData = $app->msg(1,200,'Vous avez envoyer un crush a cette personne!',['payload'=>['type'=>$_POST['action'],'count'=>(int)$notifTable->countUserLoveRequestNotSeen($liked_id)->count]]);
                    endif;
                } catch (\Throwable $th) {
                    $returnData = $app->msg(0,500,'une erreur s\'est produite, réessayer plus tard!');
                }
               
            break;
            case 'UNLOVE':
                $UsersTable->UnlikeUser($session_user_id,$liked_id);
                $notifTable->DeleteNotification($liked_id, $session_user_id, 'LIKE_USER_PROFILE');
                $returnData = $app->msg(1,200,'ça ne vous interesse plus!',['payload'=>['type'=>$_POST['action'],'count'=>(int)$notifTable->countUserLoveRequestNotSeen($liked_id)->count]]);
            break;
            case 'ACCEPT':
                if($UsersTable->getLove($liked_id,$session_user_id, 0)):
                    $UsersTable->AcceptRequestCrush($session_user_id,$liked_id);
                    $returnData = $app->msg(1,200,'C\'est un match, vous pouvez discuté maintenant!',['payload'=>['type'=>$_POST['action'],'count'=>(int)$notifTable->countUserLoveRequestNotSeen($liked_id)->count]]);
                else :
                    $returnData = $app->msg(0,500,'Cette action est interdite',['type'=>"RESET"]);
                endif;
                break;
            case 'REFUSE':
                $UsersTable->UnlikeUser($session_user_id,$liked_id);
                $returnData = $app->msg(1,200,'Vous avez refusé la demmande de cette personne',['payload'=>['type'=>$_POST['action'],'count'=>(int)$notifTable->countUserLoveRequestNotSeen($liked_id)->count]]);
                break;
        }
    } catch (\Exception $e) {
        $app->Exception($e);
    } 
}
echo json_encode($returnData);
