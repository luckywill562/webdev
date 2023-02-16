<?php
if($type === 'all'){
    $for = $notifTable->GetNotification($session_user_id);
}elseif($type === 'reload'){
    $for = $notifTable->GetNotSeenNotifications($session_user_id,$_POST['ids']);
}
foreach($for as $key => $val){
    $user = $UsersTable->GetUserWithDevise((int)$val->from_user);
    $user_data[$key]['id'] = $val->id;
    $price = number_format($val->montant, 2, '.',' ');
    if($val->notification_type === "1"){
        $check = $UsersTable->checkMatched($session_user_id,(int)$val->from_user);
        if($check){
            $user_data[$key]['match'] = true;
        }else{
            $user_data[$key]['match'] = false;
        }
    }
    if($val->notification_type === 'DEDUCTION_FOR_MEDIAS'){
        $texte = "$price $session_devise->devise ont été déduit de votre compte pour débloqué un contenu";
        $icon = 'INFO';
        $path = $val->path;
        $element_background =false;
    }elseif ($val->notification_type === 'DEBLOCAGE_CONTENT' || $val->notification_type === 'LIKE_MEDIA' || $val->notification_type === 'COMMENT_MEDIA') {
        if($val->notification_type === 'DEBLOCAGE_CONTENT'){
            $texte = 'a debloqué votre contenu';
        }elseif($val->notification_type === 'LIKE_MEDIA'){
            $count_like = $likeTable->countLikes((int)$val->element_id,$val->element_type,'media')->count ;
            if($count_like > 1){
                $prefixe = ' et ' .($count_like-1) . ' autres personnes aiment ';
            }else{
                $prefixe = ' aime ';
            }
            $texte = $prefixe . 'votre contenu';
        }elseif($val->notification_type === 'COMMENT_MEDIA'){
            $count_comment = $mediaTable->mediaCommentCount($val->element_id,$val->element_type)->count;
            if($count_comment > 1){
                $prefixe = ' et '. ($count_comment-1) .' autres personnes ont commenter';
            }else{
                $prefixe = ' a commenter';
            }
            $texte = $prefixe.' votre contenu';
        }
        $icon ='CURRENCY';
        if($val->element_type === 'album'){
            $media = $AlbumTable->getMedia((int)$val->element_id);
        }elseif ($val->element_type === 'post') {
            $media = $PostTable->getMedia((int)$val->element_id);
        }else{
            $media = null;
        }
        if($media){
            $path = "/media?id=$val->element_id&type=$val->element_type&element_id=$media->album_id";
            if($media->media_type === 'video'){
                $media_name = explode(".", $media->media_name);
                $media_src = $app->src($media_name[0].'.png','56','thumbnail');
            }elseif($media->media_type === 'image' || $media->media_type === null){
                $media_src = $app->src($media->media_name,'56','media');
            }
            $user_data[$key]['data_content_texte'] = '"'.substr($media->description,0,20).'"';
            $user_data[$key]['data_content_image'] = $media_src;
        }else{
            $path = "/";
        }
        $element_background = true;
    }elseif ($val->notification_type === 'RECEPTION_MEDIA_PAYMENT') {
        $texte = "vous avez reçu $price $session_devise->devise de la part de <span class='mWe'>$user->username</span>";   
        $icon ='INFO';
        $path = $val->path;
        $element_background= false;
    }elseif ($val->notification_type === 'RECEPTION') {
        $texte = "vous avez reçu $price $session_devise->devise de la part de <span class='mWe'>$user->username</span>";   
        $icon ='INFO';
        $path = $val->path;
        $element_background= false;
    }elseif ($val->notification_type === 'TRANSFERT') {
        $texte = "vous avez trasferer $price $session_devise->devise vers <span class='mWe'>$user->username</span>";   
        $icon ='INFO';
        $path = $val->path;
        $element_background= false;
    }elseif ($val->notification_type === 'LIKE_POST') {
        $count = $likeTable->countLikes($val->element_id,'post')->count;
        if($count > 1){ 
            $like = 'aiment';
            $number = $count -1;
            $someoneelse = "et $number autres personnes $like ";
        }else{
            $someoneelse = 'a aimé';
        }
        $texte = "$someoneelse votre publication";   
        $icon ='LIKE';
        $path = $val->path;
        $element_background = true;
    }elseif ($val->notification_type === 'LIKE_USER_PROFILE') {
        $texte = "est interessé par votre profile";   
        $icon ='LIKE';
        $path = $user->username;
        $element_background = false;
    }elseif($val->notification_type === 'POINTS_BUY'){
        $texte = "$price $session_devise->devise ont été déduit de votre pour acheter des points";
        $icon ='CURRENCY';
        $path = $val->path;
        $element_background = false;
    }elseif($val->notification_type === 'COMMENT_POST'){
        $count = $notifTable->CountUserCommentator($val->element_id)->count;
        if($count > 1){ 
            $prefixe = 'ont';
            $number = $count -1;
            $someoneelse = "et $number autres personnes $prefixe ";
        }else{
            $someoneelse = 'a';
        }
        $texte = "$someoneelse  commenter votre publication";
        $icon ='COMMENT';
        $path = $val->path;
        $element_background = true;
    }elseif($val->notification_type === 'LIKE_ALBUM'){
        $texte = "aime votre album";   
        $icon ='LIKE';
        $path = "/album/{$val->element_id}";
        $element_background = false;
    }elseif($val->notification_type === 'COMMENT_ALBUM'){
        $texte = 'a commenter votre album';
        $path = "/album/{$val->element_id}";
        $element_background = false;
        $icon ='COMMENT';
    }elseif($val->notification_type === 'REPLY_POST_COMMENT' || 'REPLY_ALBUM_COMMENT'){
        $texte = 'a repondu a votre commentaire';

        $type = strtolower(explode( '_',$val->notification_type)[1]);
        $path = "reply?comment_id={$val->element_id}&type=$type";
        $element_background = true;
        $icon ='COMMENT';
    }elseif($val->notification_type === 'INTERSTED_FOR_RENCARD'){
        $texte = 'est interessé par le rencard que vous avez lancer';
        $path = "/rencontre/{$val->element_id}";
        $element_background = true;
        $icon ='LOVE';
    }else{
        $texte = '';
        $link = '';
        $icon ='';
        $path = '';
        $element_background = false;
    }
    if($val->user=== 'INFO'){
        $profile_user = ['username'=>'','user_avatar'=>'/src/x56/icon/tafaray-round-brand.png'];
    }else{
        $profile_user =['username'=>$user->username,'user_avatar'=>$app->src($user->avatar,56,'iup')];
    }
    $user_data[$key]['data_texte'] = $texte;
    $user_data[$key]['notification_type'] = $val->notification_type;
    $user_data[$key]['user'] = $profile_user;
    $user_data[$key]['seen'] = (int)$val->seen;
    $user_data[$key]['path'] = $path;
    $user_data[$key]['element_id'] = $val->element_id;
    $user_data[$key]['INFO_ICON'] = $icon;
    $user_data[$key]['element_background'] = $element_background;
    $user_data[$key]['date'] = $app->ConvertTime($val->created_at);
    $seconds = time() - strtotime($val->created_at);
    $hours = floor($seconds / 3600);
    if($hours <= 5){
        $time = 'Plus tôt';
    }else if($hours > 5 && $hours <= 12){
        $time = 'Aujourd\'hui';
    }else if($hours > 12 && $hours <24){
        $time = 'Hier';
    }else{
        $time = $app->ConvertTime($val->created_at);
    }
    $user_data[$key]['time_status'] = $time;
}    
