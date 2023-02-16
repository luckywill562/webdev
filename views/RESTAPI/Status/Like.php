<?php 
header("Content-Type: application/json; charset=UTF-8");
if(!isset($_POST['post_id']) || empty($_POST['post_id']) || !isset($_POST['action']) || empty($_POST['action']) || !$auth->isAuth() || !$PostTable->getPostExistence($_POST['post_id'])
|| !isset($_POST['element_type']) || empty($_POST['element_type'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif(isset($_POST['post_id']) && !empty($_POST['post_id']) && isset($_POST['action']) && !empty($_POST['action']) && $auth->isAuth() && $PostTable->getPostExistence($_POST['post_id'])
&& isset($_POST['element_type']) && !empty($_POST['element_type'])){
    try {
       $post_id = (int)$_POST['post_id'];
       switch ($_POST['action']) {
           case 'LIKE':
               $PostTable->create('post_likes',[
                   'liker_id' => $session_user_id,          	
                   'element_id' => $post_id,
                   'createdAt' =>  date('Y-m-d H:i:s'),	
                   'element' => $_POST['element_type']
               ]);
               $getPost =$PostTable->getPost($post_id);
               if($getPost->user_id !=$session_user_id ){
                   $notification = ['data'=>[ 'for_user'=> [
                       ['user_id'=>$getPost->user_id,
                           'Reason' => 'LIKE_POST',
                           'from_user_id'=>$session_user_id,
                           'montant' => '',
                           'path'=> "/post/$post_id",
                           'user_type' => '',
                           'element_id' => $post_id,
                           'element_type' =>'post'
                           ]
                           ]]
                    ];
                    $notifTable->NotificationsGroup($notification['data']['for_user'],$app);
               }
               
               $returnData = $app->msg(1,200,'Vous avez aimé la publication!',['likes'=>$PostTable->countLikes($post_id)->count]);
               break;
           case 'UNLIKE':
               $PostTable->deletePostLike($session_user_id,$post_id);
               $returnData = $app->msg(1,200,'Mention j\'aime rétiré!',['likes'=>$PostTable->countLikes($post_id)->count]);
           break;
       }
   } catch (\Throwable $th) {
    $returnData = $app->msg(0,500,'une erreur s\'est produite, Veuillez réessayer plus tard!');
   }
   echo json_encode($returnData);
}
