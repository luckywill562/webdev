<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$auth->isAuth() ){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($auth->isAuth()){
    try {
        $data = [];
        foreach ($CircleTable->Mycircle($session_user_id) as $i => $value) {
            $data[$i]['circle_name'] = $value->group_name ? $value->group_name : 'vous ainsi que d\'autres personnes';
            $data[$i]['group_id']= $value->group_id;
            $data[$i]['subject'] = $value->message_type ? 'nouveau cercle': htmlspecialchars($value->subject);
            $data[$i]['seen_by_viewer'] = $value->conversationAt < $value->seenAt ? true: false;
            $member = []; 
            if($value->conversation_author_id === $session_user_id){
                $data[$i]['sended'] = true;
            }else{
                $data[$i]['sended'] = false;
            }
            foreach ($CircleTable->GetCircleProfileMember($value->group_id) as $key => $value) {
                $member[$key]= $UsersTable->GetUser($value->user_id)->UserAuthor;
            }
            $data[$i]['members']= $member;
        }
        echo json_encode($app->msg(1,200,'ok',['groups'=>$data]));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}