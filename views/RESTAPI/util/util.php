<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth()){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success'=>0,"status"=>500]);
}elseif($app->IsAjax() && $auth->isAuth()){
    try {
        $userAuthendicated = $UsersTable->GetUser((int)$session_user_id);
        $min_age_search = $dateY - $userAuthendicated->min_age_search;
        $max_age_search = $dateY - $userAuthendicated->max_age_search;
        $session_age = $dateY - $userAuthendicated->date_of_birth;
        $row = $UsersTable->GetUserWithDevise($session_user_id);
        $filtre = [
            'max_age' =>(int)$userAuthendicated->max_age_search,
            'min_age' =>(int)$userAuthendicated->min_age_search,
            'user_age' =>$session_age,
            'sex_type' => $userAuthendicated->sex_search
        ];
        $util = [
            "c_user"=>$userAuthendicated->UserAuth,
            'stats' =>  ['inbox'=>(int) $messageTable->MessagesCount($session_user_id)->count, 
            'notifications'=>(int)$notifcount = $notifTable->notificationcount($session_user_id)->count,
            'follower_request_count'=> $app->Table('follows')->GetFollowerRequest($session_user_id)->count,
            'request'=>(int)$notifTable->countUserLoveRequestNotSeen($session_user_id)->count],
            'assets' => [
                'logo'=> $app->LogoSite(),
            ],
            'is_actived'=>!boolval($userAuthendicated->confirmation_token),
            'has_currency'=> true,
            'user_min_profile_content'=>  $userAuthendicated->UserFilter ,
        ];
        if($userAuthendicated->confirmation_token != null){
            echo json_encode($app->msg(0,422,'Veuillez confirmez votre profile'));
        }else{
            echo json_encode($app->msg(1,200,$filtre,$util));
        }
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}