<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['post_id']) || empty($_POST['post_id']) && !$app->getInt($_POST['post_id'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite!');
}elseif($auth->isAuth() && isset($_POST['post_id']) && !empty($_POST['post_id']) && $app->getInt($_POST['post_id'])){
    try {
        $data = [];
        $value = $menuTable->getSingleRencard($_POST['post_id']);
        if($value && $value->creator_id === $session_user_id){
            $data['author'] = $UsersTable->GetUser($value->creator_id)->UserAuthor;
            $data['content'] = [
                'id'=>$value->rencard_id,
                'description'=> $value->content,
                'viewer_intersted' => (bool)$menuTable->UserInterested($session_user_id, $value->rencard_id,1)
            ];
        }
    
        $returnData = $app->msg(1,200,'ok',['payload'=>$data]);
    } catch (\Throwable $th) {
        $returnData = $app->msg(0,422,'une erreur s\'est produite!');
    }
}
echo json_encode($returnData);