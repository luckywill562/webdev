<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth()){
    $returnData = $app->msg(0,422,'Une erreur s\'est produite, veullez reesayer!');
    header('500 Internal Server Error', TRUE, 500);
}elseif($auth->isAuth()){
    try {
        $action = $messageTable->createIncognito_connexion($session_user_id);
        $returnData =  $app->msg(1,200,$action);
    } catch (\Throwable $th) {
        $app->Exception($th); 
    } 
}
echo json_encode($returnData);