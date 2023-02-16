<?php 
    header("Content-Type: application/json; charset=UTF-8");
    if(!$app->IsAjax() || !$auth->isAuth()  || !isset($_POST['circle_name']) || !isset($_POST['members'])){
        echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
        header('500 Internal Server Error', TRUE, 500);
    }elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['circle_name']) && isset($_POST['members'])){
        $returnData = [];
        $data = $_POST;
        $members = json_decode($_POST['members'], true);
        if(count($members) ===0){
            $returnData = $app->msg(0,422,'Selectionner d\'autre membres!');
        }elseif(strlen($app->trim($data['circle_name'])) >256){
            $returnData = $app->msg(0,422,'Le nom de votre cercle est trop long');
        } else{
            try {
                $name = htmlspecialchars($app->trim($data['circle_name']));
                $newcirlce = $CircleTable->create_new_cirlce($name,$session_user_id);
                if($newcirlce){
                    $CircleTable->addMember($members,  $newcirlce->group_id);
                }
                $data = [];
                $data['circle_name'] = $newcirlce->group_name ? $newcirlce->group_name : 'vous ainsi que d\'autres personnes';
                $data['group_id']= $newcirlce->group_id;
                $data['subject'] = 'nouveau cercle';
                $member = []; 
                foreach ($CircleTable->GetCircleProfileMember($newcirlce->group_id) as $key => $value) {
                    $member[$key]= $UsersTable->GetUser($value->user_id)->UserAuthor;
                }
                $data['members']= $member;
                $returnData = $app->msg(1,200,'Le cercle a bien été créer!', ['res'=>$data]);
            } catch (\Throwable $th) {
                $app->Exception($th);
            }
        }
        echo json_encode($returnData);
    }  
