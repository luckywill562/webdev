<?php 
    header("Content-Type: application/json; charset=UTF-8");
    $returnData = [];
if($app->IsAjax() && isset($_POST['user_id']) && !empty($_POST['user_id']) && isset($_POST['action']) && !empty($_POST['action'])){
    $user_id = (int)$_POST['user_id'];
    if(!$auth->isAuth() &&  !$PostTable->getUserExistence($user_id)){
        header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, réessayer plus tard!');
    }elseif($PostTable->getUserExistence($user_id)){
        switch ($_POST['action']) {
            case 'remove':
                $UsersTable->create('retired_list',[
                    'user_retirer' => $user_id,          	
                    'user_qui_retire' => $session_user_id,
                    'retired_date' =>  date('Y-m-d H:i:s')	
                ]);
                break;
            case 'unremove':
                
            break;
        }
        $returnData = $app->msg(1,200,'l\'utilisateur est envoyé dans la liste noir!');

    }
    }else{
        header('500 Internal Server Error', TRUE, 500);
        $returnData = $app->msg(0,500,'une erreur s\'est produite, réessayer plus tard!');
    }
    echo json_encode($returnData);
