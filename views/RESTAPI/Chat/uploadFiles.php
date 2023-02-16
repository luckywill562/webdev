<?php 

header("Content-Type: application/json; charset=UTF-8");
if ($fileTable->countImages() > 0 && $auth->isAuth()){
    if ($fileTable->validateImages()){
        $message_data = [];
        $images = $fileTable->images();
       
        foreach ($images as $key=>$image){
            $type = $image["type"];
            $media_type = explode("/", $type);
            if($media_type[0] === 'image'){
                $imagename = $image['tmp_name'];
                $height = $image['height'];
                $width =  $image['width'];
                if(isset($height) AND isset($width)){
                    $imageData = 'data:'. $image['type'].';base64,'. base64_encode($image['blob']);
                    $typePosition  = strpos($imageData, ';');
                    $imageType = explode(':', substr($imageData, 0, $typePosition))[1];
                    //remove image mime type
                    $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
                    $imageData = str_replace('data:image/png;base64,', '', $imageData);
                    $imageData = str_replace('data:image/gif;base64,', '', $imageData);
                    $imageData = str_replace('data:image/bmp;base64,', '', $imageData);
                    $imageData = str_replace('data:image/tiff;base64,', '', $imageData);
                    $data = base64_decode($imageData);
                    $created = $PostTable->create('messenger_media',[
                        'message_id' => $_POST['message_id'],          	
                        'media_name' => $image['name'],
                        "author_id"=> $session_user_id,
                        'created_At'=> date('Y-m-d H:i:s'),
                        'media_height'=> $height,
                        'media_width'=>$width
                    ]);
                    if($created){
                        $file = $file_path .'messenger'.SEP . $image['name'];
                        $success = @file_put_contents($file, $data);
                        if($success){
                            foreach($messageTable->ListingMedia($_POST['message_id']) as $key => $val){
                                $size = 210;
                                if($val->media_width > $size){
                                    $height = $size * $val->media_height / $val->media_width;
                                }else{
                                    $height = $size;
                                }
                                $message_data[$key]['media_src'] = $app->src($val->media_name,$size,'mmedia');
                                $message_data[$key]['message_id'] = $val->message_id;
                                $message_data[$key]['media_id'] = $val->id;
                                $newdata[$key]['media_width'] = $size;
                                $newdata[$key]['media_height'] = $height;
                            }
                        }
                     }
                    }
                }else{
                    $file_path .'test/';
                    if ($fileTable->saveVideos($image["tmp_name"], $file_path, $image["name"]))
                    {
                        print ("<p class='text-success'>· <strong>" . $image["name"] . "</strong> saved in images folder</p>");
                    }
                }
        
        }
        echo json_encode(['success'=>1,"status"=>200,'message_media' => $message_data]);
}
}else{
    echo json_encode(['success'=>0,"status"=>500,'une erreur s\'est produite']);

}