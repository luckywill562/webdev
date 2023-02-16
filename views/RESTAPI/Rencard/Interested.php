<?php 
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['post_id']) || empty($_POST['post_id']) || !isset($_POST['action']) || empty($_POST['action'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, veuillez réessayer plus tard');
}elseif($auth->isAuth() && isset($_POST['post_id']) && !empty($_POST['post_id']) && isset($_POST['action']) && !empty($_POST['action'])){
    try {
        $post_id = (int)$_POST['post_id'];
        switch ($_POST['action']) {
            case 'interested':
                $value = $menuTable->getSingleRencard($_POST['post_id']);
                if($menuTable->UserInterested($session_user_id, $post_id,0)){
                    $menuTable->update('rencard_intersted', 
                    $menuTable->UserInterested($session_user_id, $post_id,0)->id ,[
                        'confirmed' => 1,
                    ]);
                }else{
                    if($value->creator_id !=$session_user_id ){
                        $mediaTable->create('rencard_intersted',[
                            'interested_id' => $session_user_id,          	
                            'rencard_id' => $post_id,
                            'createdAt' =>  date('Y-m-d H:i:s'),
                            'confirmed'=>1
                        ]);
                        $notification = ['data'=>[ 'for_user'=> [
                            ['user_id'=>$value->creator_id,
                                'Reason' => 'INTERSTED_FOR_RENCARD',
                                'from_user_id'=>$session_user_id,
                                'montant' => '',
                                'path'=> "",
                                'user_type' => '',
                                'element_id' => $post_id,
                                'element_type' =>'' 
                                ]
                                ]]
                            ];
                         $notifTable->NotificationsGroup($notification['data']['for_user'],$app);
                         $returnData = $app->msg(1,200,'Votre réponse a été envoyé');
                     }else{
                        http_response_code(401);
                        $returnData = $app->msg(0,401,'vous ne pouvez pas participer a ça');
                     }
                }
                
                break;
            case 'uninterested':
                $menuTable->update('rencard_intersted', 
                $menuTable->UserInterested($session_user_id, $post_id,1)->id ,[
                    'confirmed' => 0,
                ]);
                $returnData = $app->msg(1,200,'Vous avez retirer votre reponse');
            break;
        }
    } catch (\Throwable $th) {
        $returnData = $app->msg(0,500,'une erreur s\'est produite, veuillez réessayer plus tard');
    }
}
echo json_encode($returnData);