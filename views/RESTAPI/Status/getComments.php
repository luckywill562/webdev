<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['parent_id']) || empty($_POST['parent_id']) 
|| !isset($_POST['limit']) || empty($_POST['limit'])
|| !isset($_POST['page'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['parent_id']) && 
!empty($_POST['parent_id']) && isset($_POST['limit']) && !empty($_POST['limit'])
&& isset($_POST['page'])){
    $comment_Data = [];
    foreach($commentTable->getComment($_POST['parent_id'], $_POST['limit'], $_POST['page']) as $comments => $comment){
        $comment_Data[$comments]= $comment->PostArrayComment;
    }
    if(count($comment_Data) === 0 || count($comment_Data) < $_POST['limit']){
        $has_next = false;
    }else{
        $has_next = true;
    }
    echo json_encode($app->msg(1,200, 'ok',['comment'=>$comment_Data,'has_next_page'=> $has_next]));
}
            