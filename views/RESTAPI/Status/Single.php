<?php
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['post_id']) || empty($_POST['post_id'])){
header('500 Internal Server Error', TRUE, 500);
echo json_encode(['success' => 0]);
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['post_id']) && !empty($_POST['post_id'])){
    $getPost =$PostTable->getPost((int)$_POST['post_id']);
    $post_data = [];
    if($getPost){
        $post_data['author'] = ['username'=>$getPost->username,'author_id'=>$getPost->user_id,
        'name'=>$getPost->name,'avatar'=>$app->src($getPost->avatar,52,'iup'),
        'created_date'=>$app->ConvertTime($getPost->date)];
        
        $post_data['post'] = $getPost->PostContentArray;
        $media_data = [];
        foreach($mediaTable->getImagesPost($getPost->post_id) as $medias => $media){
            $media_data[$medias] = $media->MediaArray;
        }
        $post_data['media'] = $media_data;
        $post_data['post_reply'] = [];
        $post_data['type'] = 'post';
        $post_data['has_next_page']= true;
    }
    echo json_encode(['success'=>1,'posts' => $post_data]);   
}