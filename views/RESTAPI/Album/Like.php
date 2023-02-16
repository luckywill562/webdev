<?php 
header("Content-Type: application/json; charset=UTF-8");
if(!isset($_POST['element_id']) || empty($_POST['element_id']) || !isset($_POST['action']) || empty($_POST['action']) || !$auth->isAuth() || !(bool)$AlbumTable->getSingleAlbum($_POST['element_id'])
|| !isset($_POST['element_type']) || empty($_POST['element_type'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif(isset($_POST['element_id']) && !empty($_POST['element_id']) && isset($_POST['action']) && !empty($_POST['action']) && $auth->isAuth() && (bool)$AlbumTable->getSingleAlbum($_POST['element_id'])
&& isset($_POST['element_type']) && !empty($_POST['element_type'])){
    try {
       $element_id = (int)$_POST['element_id'];
       switch ($_POST['action']) {
           case 'LIKE':
            $AlbumTable->create('album_likes',[
                   'liker_id' => $session_user_id,          	
                   'element_id' => $element_id,
                   'createdAt' =>  date('Y-m-d H:i:s')
               ]);
               $album =$AlbumTable->getSingleAlbum($element_id);
               if($album->creator_id !=$session_user_id ){
                   $notification = ['data'=>[ 'for_user'=> [
                       ['user_id'=>$album->creator_id,
                           'Reason' => 'LIKE_ALBUM',
                           'from_user_id'=>$session_user_id,
                           'montant' => '',
                           'path'=> "/album/$element_id",
                           'user_type' => '',
                           'element_id' => $element_id,
                           'element_type' =>'album'
                           ]
                           ]]
                    ];
                    $notifTable->NotificationsGroup($notification['data']['for_user'],$app);
               }
               
               $returnData = $app->msg(1,200,'Vous avez aimé cet album!',['likes'=>$AlbumTable->countLikes($element_id)->count]);
               break;
           case 'UNLIKE':
               $AlbumTable->deleteAlbumLike($session_user_id,$element_id);
               $returnData = $app->msg(1,200,'Mention j\'aime rétiré!',['likes'=>$AlbumTable->countLikes($element_id)->count]);
           break;
       }
   } catch (\Throwable $th) {
    //throw $th;
    $returnData = $app->msg(0,500,'une erreur s\'est produite, Veuillez réessayer plus tard!');
   }
   echo json_encode($returnData);
}
exit();
