<?php
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_GET['message_id']) || empty($_GET['message_id'])
|| !isset($_GET['media_id']) || empty($_GET['media_id'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth()&& isset($_GET['message_id']) && !empty($_GET['message_id'])
&& isset($_GET['media_id']) && !empty($_GET['media_id'])){
    $media_data = [];
    $media = $mediaTable->getMessengerMedia((int)$_GET['message_id'],$_GET['media_id']);
    if($media){
        if($media->media_type === 'video'){
            $dossier = 'videos';
            $src = '/watch/'.$media->media_name;
        }else{
            $dossier = 'images';
            $src= $app->src($media->media_name,'original','mmedia');
        }
        if(file_exists($app->upload_path(). $dossier.SEP.$media->media_name)){
            $exist = true;
        }else{
            $exist = false;
        }
        $data['media'] = [
            'media_id'=> $media->id,
            'media_src' => $src,
            'media_type'=> $media->media_type
        ];
    }
    echo json_encode($app->msg(1,200,'ok',['payload'=>$data])) ;
}
