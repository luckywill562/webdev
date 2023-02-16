<?php
if($app->IsAjax()){
 header("Content-Type: application/json; charset=UTF-8");
 $comment_Data = [];
 if(isset($_POST['post_id']) && !empty($_POST['post_id'])):$id = $_POST['post_id'];else: $id = '0';endif;
 foreach($commentTable->getComment($id) as $key => $val){
    $comment_Data[$key]['response_content'] = $menuTable->ParseLigne($menuTable->parseTwit($val->comment_content));
    $comment_Data[$key]['discussion_id'] = $val->post_id;
    $comment_Data[$key]['response_id'] = $val->id;
    $comment_Data[$key]['author_id'] = $val->user_id;
    $comment_Data[$key]['author_name'] = $val->name;
    $comment_Data[$key]['author_avatar'] = $app->src($val->avatar,32,'iup');
    $comment_Data[$key]['like_count']= 100;
    
}

echo json_encode(['success'=>1,'response'=>$comment_Data]);
}