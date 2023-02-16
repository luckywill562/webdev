<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$auth->isAuth() || empty($_POST['client_id']) 
|| !isset($_POST['client_id']) || $_POST['client_id'] === $session_user_id){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success' => 0,'status'=> 500,'msg' => "une erreur s/'est produite"]);
}elseif(!$PostTable->getUserExistence($_POST['client_id']) 
|| substr($_POST['client_id'],0,1) === "0" || !$app->getInt($_POST['client_id'])){
    http_response_code(404);
    header('404 Page Not Found', TRUE, 404);
    echo json_encode(["msg" =>"Page Not found",'success' => 0,'status'=> 404]);
}elseif($auth->isAuth() && !empty($_POST['client_id']) && isset($_POST['client_id']) 
&& $_POST['client_id'] != $session_user_id 
&& $PostTable->getUserExistence($_POST['client_id']) && substr($_POST['client_id'],0,1) != "0"){
    try {
        $message_data = [];
        foreach($messageTable->getmessages($session_user_id,$_POST['client_id']) as $key => $val){
            $sub = $client->toShort($val->subject);
            $message_data[$key]['subject'] = nl2br($app->trim($client->shortnameToImage($sub))) ;
            $message_data[$key]['id'] = $val->msg_id;
            $message_data[$key]['sender_id'] = $val->sender_id;
            $message_data[$key]['user_id'] = $val->u_id;
            $message_data[$key]['media'] = $val->media;
            $message_data[$key]['price'] = $app->format($app->Table('transaction')->CalculPrice($val->price, $val->sender_id,$session_user_id)) ;
            $message_data[$key]['price_value'] = $val->price > 0 ? true : false;
            if($val->sender_id === $session_user_id){
                $sended = true;
            }else{
                $sended = false;
            }
            $message_data[$key]['sended'] = $sended;
            $newdata = [];
            foreach($messageTable->ListingMedia($val->msg_id) as $medias => $media){
                $size = 210;
                if($media->media_width > $size){
                    $height = $size * $media->media_height / $media->media_width;
                }else{
                    $height = $size;
                }
                if($media->media_type === 'video'){
                    $dossier = 'videos';
                    $src = '/watch/'.$media->media_name;
                }else{
                    $dossier = 'images';
                    $src= $app->src($media->media_name,$size,'mmedia');
                }
                if(file_exists($app->upload_path(). $dossier.SEP.$media->media_name)){
                    $exist = true;
                }else{
                    $exist = false;
                }
                $newdata[$medias]['media_src'] =  $src;
                $newdata[$medias]['media_id'] = $media->id;
                $newdata[$medias]['media_height'] = $height;
                $newdata[$medias]['media_width'] = $size;
                $newdata[$medias]['media_type']= $media->media_type;
            }
            $message_data[$key]['mesmedia'] = $newdata;
            $message_data[$key]['status'] = $val->message_status;
            $message_data[$key]['seen'] = $val->message_status === '1'? true: false;
            $message_data[$key]['type'] = $val->type;
            $message_data[$key]['error'] = false;
            if($val->type === '2'){
                $message_data[$key]['gift_type'] = $val->gift_type;
            }
            $seconds = time() - strtotime($val->created_at);
            $hours = floor($seconds / 3600);
            if($hours <= 2){
                $time = 'Plus tot';
            }else if($hours > 2 && $hours <= 12){
                $time = 'Aujourd\'hui';
            }else if($hours > 12 && $hours <= 24){
                $time = 'Hier';
            }else if($hours > 24){
                $time = $app->ConvertTime($val->created_at);
            }
            $message_data[$key]['time_status'] = $time;
        }
        echo json_encode(['success'=>1,"status"=>200,'conversation'=>['messages'=>$message_data, 'client'=> $UsersTable->GetUser($_POST['client_id'])->UserCompleteAvatar]]);
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}