<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['type']) || empty($_POST['type'])
|| !isset($_POST['value'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite!');
}elseif($auth->isAuth() && isset($_POST['type']) && !empty($_POST['type'])
&& isset($_POST['value'])){
    try {
        $UsersTable->update('koko_users', $session_user_id,[
            $_POST['type'] => $_POST['value'],
        ]);
        $returnData = $app->msg(1,200,'ok');
    } catch (\Throwable $th) {
        $returnData = $app->msg(0,500,'une erreur s\'est produite, réessayer plus tard!');
    }
}
echo json_encode($returnData);