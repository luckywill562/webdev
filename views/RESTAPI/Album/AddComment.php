<?php 
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['element_id']) || empty($_POST['element_id']) || 
!isset($_POST['comment_content']) || $app->trim($_POST['comment_content']) ==="" || !(bool)$AlbumTable->getSingleAlbum($_POST['element_id'])){
   http_response_code(500);
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, Veuillez réessayer plus tard!');
}elseif($auth->isAuth() && isset($_POST['element_id']) && !empty($_POST['element_id']) && 
    isset($_POST['comment_content']) && $app->trim($_POST['comment_content']) != "" && 
    (bool)$AlbumTable->getSingleAlbum($_POST['element_id'])){
        http_response_code(200);
        $element_id = (int)$_POST['element_id'];
        $commentval = htmlspecialchars($app->trim(($_POST['comment_content'])));
        $album =$AlbumTable->getSingleAlbum($_POST['element_id']);
        try {
            $val = $commentTable->create_comment('album_comments',htmlspecialchars($app->trim($commentval)),$session_user_id,$element_id,'album_block');
            $returnData = $app->msg(1,200,'Merci pour votre commentaire!',['data' => $val->MediaAlbumComment]);
            if($session_user_id != $album->creator_id){
                $notification = ['data'=>[ 'for_user'=> [
                    [
                        'user_id'=>$album->creator_id,
                        'Reason' => 'COMMENT_ALBUM',
                        'from_user_id'=>$session_user_id,
                        'montant' => '',
                        'path'=> "/post/$element_id",
                        'user_type' => '',
                        'element_id' => $element_id,
                        'element_type'=> 'post'
                        ]
                        ]]
                 ];
                 $notifTable->NotificationsGroup($notification['data']['for_user'],$app);
            }
        } catch (\Throwable $th) {
            http_response_code(500);
            header('500 Internal Server Error', TRUE, 500);
            $returnData = $app->msg(0,500,'une erreur s\'est produite, Veuillez réessayer plus tard!');
        }
    }
echo json_encode($returnData);
    
