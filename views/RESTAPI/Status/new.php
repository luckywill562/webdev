<?php 
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['security']) || empty($_POST['security']) ||
!isset($_POST['post_content']) || !isset($_POST['params']) || empty($_POST['params'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur inconue s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['params']) && 
isset($_POST['security']) && !empty($_POST['security']) && isset($_POST['post_content']) 
&& isset($_POST['params']) && !empty($_POST['params'])){
    $post_content = htmlspecialchars($app->trim($_POST['post_content']));
    try {
        $res = $PostTable->create_post($post_content,$session_user_id,(int)$_POST['security']);
        $return = $app->msg(1,200,'Publication créer avec succès complète',['postId'=> $res->id]);
    } catch (\Throwable $th) {
        $return = $app->msg(0,500,'une erreur s\'est produite lors du creation de votre publication');
    }
    echo json_encode($return);
}