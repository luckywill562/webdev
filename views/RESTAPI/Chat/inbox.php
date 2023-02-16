<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['data_type'])){
    header("Content-Type: application/json; charset=UTF-8");
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success' => 0,'status'=> 500,'msg' => "une erreur s/'est produite"]);
}elseif($app->IsAjax() AND $auth->isAuth() AND isset($_POST['data_type']) ){
    if($_POST['data_type'] === 'messages_list'){
        $messageTable->update_list_to_visited($session_user_id); //update mesage to visited
        $message_data = [];
        
       foreach($messageTable->ListAllMessageFromUSer($session_user_id,$_POST['page'],$_POST['limit']) as $key => $val){
            if($session_user_id === $val->sender_id){
                $row = $UsersTable->GetUser($val->receiver_id)->UserCompleteAvatar; 
            }else{
                $row = $UsersTable->GetUser($val->sender_id)->UserCompleteAvatar;
            }
            if($val->subject === ':special_heart:'){
                $message_data[$key]['subject'] = $client->shortnameToImage(':heart:');
            }else{
                $sub = $client->toShort($menuTable->parseTwit($val->subject));
                $message_data[$key]['subject'] = $client->shortnameToImage($sub);
            }
            
            if($val->sender_id === $session_user_id){
                $discussion_id = $val->receiver_id;
                $sended = true;
            }else{
                $sended = false;
                $discussion_id = $val->sender_id;
            }
            $message_data[$key]['client_id'] =(int)$discussion_id;
            $message_data[$key]['id'] = $val->id;
            $message_data[$key]['client'] = $row;
            $message_data[$key]['status'] = (int)$val->message_status;
            $message_data[$key]['seen'] = $val->message_status === '1'? true: false;
            $message_data[$key]['sended'] = $sended;
            $message_data[$key]['msg_type'] = $val->message_type;
            if($val->media){
                $message_data[$key]['ismedia'] = true;
            }else{
                $message_data[$key]['ismedia'] = false;
            }
            $message_data[$key]['conversations'] = [];
        }
        $last;
        if(count($message_data) < $_POST['limit']){
            $next_page = false;
        }else{
            $next_page = true;
        }
        echo json_encode(['success'=>1,'status'=>200,'messages' =>['list'=>$message_data, 'has_next_page'=> $next_page]]);
    }elseif($_POST['data_type'] === 'set_message_list_to_view'){
        $update = $messageTable->update_list_to_visited($session_user_id);
        if($update){
            echo json_encode(['success'=>1,'status' => 200]);
        }
    }
}