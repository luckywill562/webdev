<?php 
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!isset($_POST['media_id']) || empty($_POST['media_id']) || !isset($_POST['action']) || empty($_POST['action']) || !$auth->isAuth() || !$mediaTable->getExistence($_POST['media_id']) || !$app->getInt($_POST['media_id'])){
    header('500 Internal Server Error', TRUE, 500);
    http_response_code(500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, veuillez réessayer plus tard');
}elseif(isset($_POST['media_id']) && !empty($_POST['media_id']) && $app->getInt($_POST['media_id']) && isset($_POST['action']) && !empty($_POST['action']) && $auth->isAuth() && $mediaTable->getExistence($_POST['media_id'])){
    try {
        $media_id = (int)$_POST['media_id'];
        switch ($_POST['action']) {
            case 'save':
                $mediaTable->create('saved',[
                    'element_id' => $media_id,          	
                    'element_type' => $_POST['type'],
                    'user_id'=> $session_user_id,
                    'createdAt'=> date('Y-m-d H:i:s')
                ]);
                $returnData = $app->msg(1,200,'Contenu enregistré');
                break;
            case 'unsave':
                $mediaTable->deleteSaved($session_user_id,$media_id,$_POST['type']);
                $returnData = $app->msg(1,200,'enregistrement supprimé');
            break;
        }
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}
echo json_encode($returnData);