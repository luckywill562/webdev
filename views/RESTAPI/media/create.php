<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['media_name']) || empty($_POST['media_name'])
|| !isset($_POST['albumId']) || empty($_POST['albumId']) || !isset($_POST['media_type']) || empty($_POST['media_type'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite vbv'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['media_name']) && !empty($_POST['media_name'])
&& isset($_POST['albumId']) && !empty($_POST['albumId']) && isset($_POST['media_type']) && !empty($_POST['media_type'])){
include_once('getID3/getid3/getid3.php');
$getID3 = new getID3;
$get = $getID3->analyze($file_path .SEP .$_POST['media_type'].'s' .SEP. $_POST['media_name']);
$params = json_decode($_POST['params'], true);
$filename = explode(".", $_POST['media_name']);
if($_POST['media_type']=== 'video'){
    $imageData = $params['thumbnail'];
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $data = base64_decode($imageData);
    $file = $file_path .'thumbnail/'.$filename[0]. '.png';
    file_put_contents($file, $data);
}
if($get['video']){
    $PostTable->create('medias',[
        'author_id' => $session_user_id,
        'createdAt'=> date('Y-m-d H:i:s'),
        'media_name'=>$_POST['media_name'],
        'element_id' => $_POST['albumId'],
        'media_type'=> $_POST['media_type'],
        'media_height'=> $get['video']['resolution_y'],
        'media_width'=>$get['video']['resolution_x'],
        'montant' => (int)$params['montant'],
        'description' => $app->trim(htmlspecialchars($params['texte']))
    ]);
    echo json_encode($app->msg(0,500,'votre contenu est prète'));
}                       
}