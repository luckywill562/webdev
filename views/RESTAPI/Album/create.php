<?php 
    header("Content-Type: application/json; charset=UTF-8");
    if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['security']) || empty($_POST['security']) ||
    !isset($_POST['album_title']) || !isset($_POST['params']) || empty($_POST['params']) || $fileTable->countImages() === 0){
        echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
        header('500 Internal Server Error', TRUE, 500);
    }elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['params']) && 
    isset($_POST['security']) && !empty($_POST['security']) && isset($_POST['album_title']) 
    && isset($_POST['params']) && !empty($_POST['params']) && $fileTable->countImages() >0){
        $album_title = htmlspecialchars($app->trim($_POST['album_title']));
        if ($fileTable->validateImages()){
            $images = $fileTable->images();
                try {
                    $res = $AlbumTable->create_album($album_title,$session_user_id,$_POST['security']);
                    $return = $app->msg(1,200,$res);
                } catch (\Throwable $th) {
                    $return = $app->msg(0,500,'step 1 error');
                }
                if($return['success'] === 1){
                    
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
                                 $params = json_decode($_POST['params'], true)[$key];
                            }
                            try {
                                $created = $PostTable->create('album_media',[
                                    'media_name' => $image['name'],
                                    'height' => $height,
                                    'width' => $width,
                                    'user_id' => $session_user_id,
                                    "album_id"=> $res->id,
                                    'createdAt'=> date('Y-m-d H:i:s'),
                                    'media_description' => htmlspecialchars(htmlentities($params['texte'])),
                                    'visibility' => (int)$params['confidentiality'],
                                    'montant' => (int)$params['montant'],
                                    'media_type' => $media_type[0]
                                ]);
                                $return = $app->msg(1,200,'etape 2 complete');
                            } catch (\Throwable $th) {
                                $return = $app->msg(0,500,"L'etape 2 a echoue, go to delete step 1");
                            }
                            if($return['success'] === 1){
                                $file = $file_path .'album/' . $image['name'];
                                if(file_put_contents($file, $data)){
                                    if((int)$params['montant'] > 0){
                                        $fileTable->saveblur($image['name'],$file_path,'album');
                                    }
                                    $returnData = $app->msg(1,200,'votre contenu est prete');
                                }
                            }else{
                                $returnData = $app->msg(0,500,'une erreur est survenue lors du téléchargement de vos images, veuillez reessayer plus tard');
                            }
                        }elseif($media_type[0] === 'video'){
                            $params = json_decode($_POST['params'], true)[$key];
                            $imageData = $params['thumbnail'];
                            $imageData = str_replace('data:image/png;base64,', '', $imageData);
                            $data = base64_decode($imageData);
                            $dataname = $fileTable->uniqid(0,20);
                            $file = $file_path .'thumbnail/' . $dataname. '.png';
                           
                            try {
                                //code...
                                $instertVideos = $PostTable->create('album_media',[
                                    'media_name' => $dataname. '.'.$media_type[1],
                                    'user_id' => $session_user_id,
                                    "album_id"=> $res->id,
                                    'createdAt'=> date('Y-m-d H:i:s'),
                                    'media_description' => htmlspecialchars(htmlentities($app->trim($params['texte']))),
                                    'visibility' => (int)$params['confidentiality'],
                                    'montant' => (int)$params['montant'],
                                    'media_type' => $media_type[0]
                                ]);
                                $return = $app->msg(1,200,'etape 2 complete');
                            } catch (\Throwable $th) {
                                $return = $app->msg(0,500,"L'etape 2 a echoue, go to delete step 1");
                            }
                            if($return['success'] === 1){
                                file_put_contents($file, $data);
                                $fileTable->saveVideos($image["tmp_name"], $file_path. "videos/", $dataname.'.'.$media_type[1]);   
                                $returnData = $app->msg(1,200,'votre contenu est prete');
                            }else{
                                $returnData = $app->msg(0,500,'une erreur est survenue lors du téléchargement de vos images, veuillez reessayer plus tard');
                            }
                        }
                    }   
                    echo json_encode($returnData);
                }else{
                    echo json_encode($app->msg(0,500,'une erreur s\'est produite  lors de l\'importation de votre contenu'));
                } 
        }else{
            /*type de fichier invalide */
            echo json_encode(['success'=>0, 'msg'=> $fileTable->error]);
        }   
}