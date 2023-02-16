<?php 
header("Content-Type: application/json; charset=UTF-8");
if($auth->isAuth() && isset($_POST['media_id']) && !empty($_POST['media_id']) && 
isset($_POST['comment_content']) && $app->trim($_POST['comment_content']) 
!= "" && $mediaTable->getExistence($_POST['media_id']) && isset($_POST['fakeID']) && !empty($_POST['fakeID'])){
    $media_id = (int)$_POST['media_id'];
    $contenu = stripcslashes(htmlentities($app->trim($_POST['comment_content'])));
    if($_POST['type'] === 'album'){
        $type = 'A';
    }elseif ($_POST['type'] === 'post') {
        $type ='P';
    }
    try {
        $comment = $commentTable->create_comment('media_comments',$contenu,$session_user_id,$media_id,$_POST['type']);
        if($_POST['type'] === 'album'){
            $val = $AlbumTable->getMedia($media_id);
            $type = 'media_album';
        }elseif($_POST['type'] === 'post'){
            $val= $PostTable->getMedia((int)$media_id);
            $type = 'media_post';
        }
        if($val->id !=$session_user_id ){
            $notification = ['data'=>[ 'for_user'=> [
                ['user_id'=>$val->id,
                    'Reason' => 'COMMENT_MEDIA',
                    'from_user_id'=>$session_user_id,
                    'montant' => '',
                    'path'=> "/media",
                    'user_type' => '',
                    'element_id' => $media_id,
                    'element_type' =>$_POST['type'] 
                    ]
                    ]]
             ];
             $notifTable->NotificationsGroup($notification['data']['for_user'],$app);
        }
        echo json_encode($app->msg(1,200,'merci pour votre commentaire', ['response' => $comment->MediaAlbumComment]));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}else{
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}
    
