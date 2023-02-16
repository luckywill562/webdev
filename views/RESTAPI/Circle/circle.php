<?php
header("Content-Type: application/json; charset=UTF-8");
$data = $_POST;
if(!$auth->isAuth() || !isset($data['circle_id']) 
|| empty($data['circle_id'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($auth->isAuth() && isset($data['circle_id']) 
&& !empty($data['circle_id'])){
    $returnData = [];
    $data = [];
    $data_subject =[];
    foreach ($CircleTable->UserCircles((int)$_POST['circle_id']) as $value) {
        $data['circle_info'] = [
            'id' => $value->circle_id,
            'name' => $value->circle_name,
            'cover_photo'=> "http://localhost:8000/src/x256/post/04516768730033605359.jpg"
        ];
        foreach ($CircleTable->getSubjects((int)$_POST['circle_id']) as $key => $val) {
            $data_subject[$key]=  $val->SubjectArray;
        }
        $data['subjects'] =  $data_subject;
    }
    $returnData = $app->msg(1,200,['circle'=>$data]);
    echo json_encode($returnData);
}