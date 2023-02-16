<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$app->IsAjax() || !$auth->isAuth()) {
    $app->E500();
} elseif ($app->IsAjax() && $auth->isAuth()) {
    try {
        $userAuthendicated = $UsersTable->GetUser((int) $session_user_id);
        $min_age_search = $dateY - $userAuthendicated->min_age_search;
        $max_age_search = $dateY - $userAuthendicated->max_age_search;
        $session_age = $dateY - $userAuthendicated->date_of_birth;
        $filtre = [
            'max_age' => $max_age_search,
            'min_age' => $min_age_search,
            'user_age' => $session_age,
            'sex_type' => $userAuthendicated->sex_search
        ];
    
        echo json_encode($app->msg(1, 200, $filtre));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}