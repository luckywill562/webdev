<?php 
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!isset($_POST['media_id']) || empty($_POST['media_id']) || !isset($_POST['action']) || empty($_POST['action']) || !$auth->isAuth() || !$mediaTable->getExistence($_POST['media_id']) 
|| !$app->getInt($_POST['media_id'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, veuillez réessayer plus tard');
}elseif(isset($_POST['media_id']) && !empty($_POST['media_id']) && $app->getInt($_POST['media_id']) && isset($_POST['action']) && !empty($_POST['action']) && $auth->isAuth() && $mediaTable->getExistence($_POST['media_id'])){
    try {
        $media_id = (int)$_POST['media_id'];
        switch ($_POST['action']) {
            case 'like':
                $mediaTable->create('media_votes',[
                    'user_id' => $session_user_id,          	
                    'media_id' => $media_id,
                    'rating_action' => '1',
                    'date_like' =>  date('Y-m-d H:i:s'),	
                    'reaction_type' => '2',
                    'reaction_for' => $_POST['type'],	
                ]);
                if($_POST['type'] === 'album'){
                    $val = $AlbumTable->getMedia($media_id);
                    $type = 'album';
                }elseif($_POST['type'] === 'post'){
                    $val= $PostTable->getMedia((int)$media_id);
                    $type = 'post';
                }
                   if($val->id !=$session_user_id ){
                       $notification = ['data'=>[ 'for_user'=> [
                           ['user_id'=>$val->id,
                               'Reason' => 'LIKE_MEDIA',
                               'from_user_id'=>$session_user_id,
                               'montant' => '',
                               'path'=> "/media",
                               'user_type' => '',
                               'element_id' => $media_id,
                               'element_type' =>$type ]
                               ]]
                        ];
                        $notifTable->NotificationsGroup($notification['data']['for_user'],$app);
                   }
                $returnData = $app->msg(1,200,'Vous avez aimé cette photo',['likes'=>$mediaTable->getLikes($media_id,$_POST['type'])->count]);
                break;
            case 'unlike':
                $mediaTable->deleteLike($session_user_id,$media_id,$_POST['type']);
                $returnData = $app->msg(1,200,'Mention j\'aime rétiré',['likes'=>$mediaTable->getLikes($media_id,$_POST['type'])->count]);
            break;
        }
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}
echo json_encode($returnData);