<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['circle_id']) || empty($_POST['circle_id'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success' => 0]);
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['circle_id']) && !empty($_POST['circle_id'])){
    $data=[];
    try {
        foreach ($CircleTable->getSubjects((int)$_POST['circle_id']) as $key => $val) {
             $data[$key]= $val->SubjectArray;
        }
        $returnData = $app->msg(1,200,$data);
    } catch (\Throwable $th) {
        $returnData = $app->msg(0,500,'une erreur s\'est produite');
    }
    echo json_encode($returnData);
}
        
                
