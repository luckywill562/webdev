<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_GET['id']) || empty($_GET['id']) || !isset($_GET['type']) || empty($_GET['type'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() || !isset($_GET['id']) && !empty($_GET['id']) && isset($_GET['type']) && !empty($_GET['type'])){
    $returnData = [];
    try {
        foreach ($mediaTable->getLikerList($_GET['id'],$_GET['type']) as $key => $value) {
            $returnData[$key] = $UsersTable->GetUser($value->user_id)->UserAuthor;
        }
        $returnData = $app->msg(1,200,'list des utilisateur qui aime ca',['payload'=>$returnData]);
    } catch (\Throwable $th) {
        //throw $th;
        $returnData = $app->msg(0,500,'une erreur s\'est produite');
    }
    echo json_encode($returnData);
}