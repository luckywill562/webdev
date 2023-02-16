<?php 
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['element_id']) || empty($_POST['element_id']) || 
!isset($_POST['comment_content']) || $app->trim($_POST['comment_content']) ==="" || !$PostTable->getPostExistence($_POST['element_id'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, Veuillez réessayer plus tard!');
}elseif($auth->isAuth() && isset($_POST['element_id']) && !empty($_POST['element_id']) && 
    isset($_POST['comment_content']) && $app->trim($_POST['comment_content']) != "" && 
    $PostTable->getPostExistence($_POST['element_id'])){
        $element_id = (int)$_POST['element_id'];
        $commentval = htmlspecialchars($app->trim(($_POST['comment_content'])));
        $getPost =$PostTable->getPost($element_id);
        try {
            //code...
            if($getPost->payment_for_comment >0 && $session_user_id != $getPost->user_id){
                $convertCommentPriceToUserDevise = $TransactionTable->convertToReference($solde,$session_devise->reference_en_dollar);
                $PrixDuCommentaire = $getPost->payment_for_comment * $session_devise->reference_en_dollar;
                if($solde > $PrixDuCommentaire){
                    $deduire = $TransactionTable->update('koko_users',$session_user_id,[	
                        'soldes' => $solde-$PrixDuCommentaire,
                    ]);
                    if($deduire){
                        $regetPost =$PostTable->OnePostWithMedia($element_id);
                        $TransactionTable->update('koko_users',$regetPost->user_id,[	
                            'soldes' => $regetPost->soldes + $regetPost->payment_for_comment,
                        ]);
                        $val =  $commentTable->create_comment('posts_comments',htmlspecialchars($app->trim($commentval)),$session_user_id,$element_id,'post_block');
                        $returnData = $app->msg(1,200,'Vous avez ajouter un commentaire!',['response' => $val->MediaAlbumComment]);
                    }else{
                        $returnData = $app->msg(1,200,'une erreur s\'est produite!');
                    }
                }else{
                    $returnData = $app->msg(0,500,'Votre solde est insufisant pour pouvoir participer au commentaires!');
                }
            }else{
                $val = $commentTable->create_comment('posts_comments',htmlspecialchars($app->trim($commentval)),$session_user_id,$element_id,'post_block');
                $returnData = $app->msg(1,200,'Vous avez ajouter un commentaire!',['response' => $val->MediaAlbumComment]);
            }
            if($session_user_id != $getPost->user_id){
                $notification = ['data'=>[ 'for_user'=> [
                    [
                        'user_id'=>$getPost->user_id,
                        'Reason' => 'COMMENT_POST',
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
            header('500 Internal Server Error', TRUE, 500);
            $returnData = $app->msg(0,500,'une erreur s\'est produite, Veuillez réessayer plus tard!');
        }
    }
echo json_encode($returnData);
    
