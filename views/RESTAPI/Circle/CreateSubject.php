<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['title']) || !isset($_POST['content']) || 
!isset($_POST['circle_id']) || empty($_POST['circle_id'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success'=>0,"status"=>500]);
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['title']) && isset($_POST['content']) 
&& isset($_POST['circle_id']) || !empty($_POST['circle_id'])){
    $data = $_POST;
    $title = htmlentities($app->trim($data['title']));
        $content = htmlentities($app->trim($data['content']));
    if(empty($app->trim($data['title']))){
        http_response_code(422);
        echo json_encode($app->msg(0,422,'Vous devez ajouter un titre '));
    }elseif(strlen($title)>60){
        echo json_encode($app->msg(0,422,'Ajouter un titre moin long'));
    }else{
        $circle_id = (int)$data['circle_id'];
        $creator_id = $session_user_id;
        $returnData = [];
        try {
            $CircleTable->create_new_subject($title,$content, $circle_id,$creator_id);
            $returnData = $app->msg(1,200,'ok');
        } catch (\Throwable $th) {
            $returnData = $app->msg(0,500,'une erreur s\'est produite');
        }
        echo json_encode($returnData);
    }
}