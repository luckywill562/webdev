<?php
if($app->IsAjax()){
 header("Content-Type: application/json; charset=UTF-8");
 $comment_Data = [];
 if(isset($_POST['post_id']) && !empty($_POST['post_id'])):
    $id = $_POST['post_id'];
else: 
    $id = '0';
endif;

 $media_data = [];
 foreach($mediaTable->getPostMedia($id) as $medias => $media){
     $media_data[$medias]['media_src'] = $media->media_name;
 }

echo json_encode(['success'=>1,'media_src'=>$media_data]);
}