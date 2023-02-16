<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['limit']) || empty($_POST['limit']) || !isset($_POST['page'])
|| !$app->getInt($_POST['limit'])){
    http_response_code(500);
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, veuillez réessayer plus tard');
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['limit']) && !empty($_POST['limit']) && isset($_POST['page']) 
&& $app->getInt($_POST['limit'])){
    try {
        $limit = $_POST['limit'];
        $data = [];
        foreach($mediaTable->getSavedElement($_POST['limit'],$session_user_id,$_POST['page']) as $key => $val){
            $data[$key]['media_id']= $val->media_id;
            $data[$key]['id']= $val->saved_id;
            $data[$key]['content_id'] = $val->album_id;
            if($val->media_type === 'video'){
                $media_name = explode(".", $val->media_name);
                $data[$key]['media_src'] = $app->src($media_name[0].'.png','210','thumbnail');
            }elseif($val->media_type === 'image' || $val->media_type === null){
                $data[$key]['media_src'] = $app->src($val->media_name,'210','media');
            }
            $data[$key]['media_type'] = $val->media_type;
            $data[$key]['element_type']= $val->media_apartenance;
        }
        if(count($data) === 0 || count($data) < $_POST['limit']){
            $has_next_page = false;
        }else{
            $has_next_page = true;
        }
        $returnData = $app->msg(1,200,'ok',['saved'=>$data,'has_next_page'=>$has_next_page]);
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}
echo json_encode($returnData);