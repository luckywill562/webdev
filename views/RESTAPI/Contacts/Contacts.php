<?php
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['limit']) || empty($_POST['limit'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['limit']) && !empty($_POST['limit'])){
        header("Content-Type: application/json; charset=UTF-8");
        $data = [];
    if(isset($_POST['idlist']) && !empty($_POST['idlist'])):
        $id = $_POST['idlist'];
        else: $id = '0';endif;
        $limit = $_POST['limit'];
        foreach($UsersTable->getAllContacts($id,$limit,$session_user_id) as $key => $val){
            if($val->liker_id === $session_user_id){
                $contact_id = $val->liked_id;
            }else{
                $contact_id = $val->liker_id;
            }
            $data[$key]=$UsersTable->GetUser($contact_id)->UserAuthor;
        }
        echo json_encode(['users'=>$data]);
}