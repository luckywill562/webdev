<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['element_id']) || !isset($_POST['element_type']) 
|| !$app->getInt($_POST['element_id']) || empty($_POST['element_id']) || empty($_POST['element_type'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['element_id']) && !empty($_POST['element_id']) 
&& isset($_POST['element_type']) && $app->getInt($_POST['element_id']) && !empty($_POST['element_type'])){
    $returnData = [];
    try {
        foreach ($likeTable->getLikerList($_POST['element_id'],$_POST['element_type']) as $key => $value) {
            $returnData[$key] = $UsersTable->GetUser($value->liker_id)->UserAuthor;
        }
        echo json_encode($app->msg(1,200,'liste des utilisateurs qui aime ça',['payload'=>$returnData]));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}