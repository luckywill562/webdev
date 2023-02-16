<?php
if($app->IsAjax() AND $auth->isAuth()){
        header("Content-Type: application/json; charset=UTF-8");
        $user_id = (int)$session_user_id;
        $userAuthendicated = $auth->getUserprofil($user_id);
        $min_age_search = 2021 - $userAuthendicated["min_age_search"];
        $max_age_search = 2021 - $userAuthendicated["max_age_search"];
        $session_age = 2021 - $userAuthendicated['date_of_birth'];
        echo json_encode(['filtre' => ['min_age_search' => $userAuthendicated["min_age_search"],
        'max_age_search' => $userAuthendicated["max_age_search"],'sex_type' => $userAuthendicated['sex_search']]
      ,'success'=>1,'status'=>200]);
}else{
    $app->headerError();
}