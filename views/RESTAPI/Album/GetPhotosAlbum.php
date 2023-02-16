<?php
    header("Content-Type: application/json; charset=UTF-8");
    if(!$app->IsAjax() || !$auth->isAuth()){
        $app->headerError();
    } elseif($app->IsAjax() AND $auth->isAuth()){
        try {
            $user_data = [];
            foreach ($AlbumTable->getFollowingAlbum(100,$session_user_id) as $key => $value) {
                $user_data[$key] = $value->AblumArray;
            }
            $returnData = $app->msg(1,200,$user_data);
        } catch (\Throwable $th) {
            //throw $th;
            $returnData = $app->msg(0,500,'une erreur s\'est produite');
        }
                   
        echo json_encode($returnData);
    }