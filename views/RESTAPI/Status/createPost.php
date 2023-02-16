<?php 
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['security']) || empty($_POST['security']) ||
!isset($_POST['contenu']) ){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && 
 isset($_POST['security']) && !empty($_POST['security']) && isset($_POST['contenu'])){
     $contenu = $app->trim(stripslashes(htmlspecialchars($_POST['contenu'])));
     $security = $_POST['security'];
    if(isset($_POST['contenu']) && !empty($_POST['contenu'])
     && $fileTable->countImages() === NULL && $app->trim($_POST['contenu']) != ""){
         try {
             $res = $PostTable->create_post($contenu,$session_user_id,$security);
             echo json_encode($app->msg(1,200,'Votre publication est prête', ['res'=>$res]));
         } catch (\Exception $e) {
            echo json_encode($app->msg(0,500,'Une erreur s\'est produite, veuillez réesayer plus tard!'));
         }
        
    }elseif($fileTable->countImages() > 0 ){
        try {
            if ($fileTable->validateImages()):
                $images = $fileTable->images();
                try {
                    $res = $PostTable->create_post($contenu,$session_user_id,$security);
                    $return = $app->msg(1,200,'etape 1 complete');
                } catch (\Throwable $th) {
                    //throw $th;
                    $return = $app->msg(0,500,'step 1 error');
                } 
                if($return['success'] === 1){
                foreach ($images as $key=>$image){
                    $params = json_decode($_POST['params'], true)[$key];
                    $imagename = $image['tmp_name'];
                    $height = $image['height'];
                    $width =  $image['width'];
                    $dataname = $fileTable->uniqid(0,60);
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
                        $file = $file_path.'posts'.SEP. $dataname . '.jpg'; 
                        try {
                            $PostTable->create('post_media',[      	
                              'media_name' => $dataname . '.jpg',
                              'user_id'=> $session_user_id,
                              'post_id' => $res->post_id,
                              'media_width'=> $width,
                              'media_height'=>$height,
                              'montant' => (int)$params['montant'],
                              'createdAt' => date('Y-m-d H:i:s'),
                              'media_description' => htmlspecialchars(htmlentities($app->trim($params['texte']))),
                            ]);
                            $return = $app->msg(1,200,'etape 2 complete');
                        } catch (\Throwable $th) {
                            $return = $app->msg(0,500,"L'etape 2 a echoue, go to delete step 1");
                        }
                        if($return['success'] === 1){
                            if(file_put_contents($file, $data)){
                                if((int)$params['montant'] > 0){
                                    $fileTable->saveblur($dataname . '.jpg',$file_path,'posts');
                                }
                                $returnData =$app->msg(1,200,'votre contenu a été créer');
                            }
                        }else{
                            $returnData =$app->msg(0,500,'une erreur est survenue lors du téléchargement de vos images, veuillez réessayer plus tard');
                        }
                    }else{
                        $returnData = $app->msg(0,500,'un fichier que vous éssayez d\'uploader ne peut tre pas supporter');
                    }
                }
                } else{
                    $returnData =$app->msg(0,500,'une erreur s\'est produite  lors de l\'importation de votre contenu');
                }
            else:
                $returnData = $app->msg(0,500,'un fichier que vous éssayez d\'uploader ne peut pas être supporter');
            endif;
            echo json_encode($returnData);
        } catch (\Exception $e) {
            echo json_encode($app->msg(0,500,'Une erreur s\'est produite, veuillez réesayer plus tard!'));
        }
    }else{
        echo json_encode($app->msg(0,500,'Vous n\'avez rien importé'));
    }   
}


