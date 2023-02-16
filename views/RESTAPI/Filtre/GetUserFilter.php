<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$app->IsAjax() || !$auth->isAuth() || empty($_POST['limit']) || !isset($_POST['limit']) || !$app->getInt($_POST['limit'])) {
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0, 500, 'une erreur s\'est produite'));
} elseif ($app->IsAjax() && $auth->isAuth() && isset($_POST['limit']) && !empty($_POST['limit']) && $app->getInt($_POST['limit'])) {
    try {
        $user_data = [];
        $user_id = (int) $session_user_id;
        $limit = (int) $_POST['limit'];
        $userAuthendicated = $UsersTable->GetUser((int) $session_user_id);
        $session_age = $dateY - $userAuthendicated->date_of_birth;
        if (!empty($_POST['idlist'])):
            $id = $_POST['idlist'];
        else:
            $id = '0';
        endif;

        if (!isset($_POST['min_age']) || empty($_POST['min_age']) || !$app->getInt($_POST['min_age'])) {
            $min_age_search = $dateY - $userAuthendicated->min_age_search;
        } else {
            $min_age_search = $dateY - (int) $_POST['min_age'];
            $PostTable->update('koko_users', $user_id, [
                'min_age_search' => $_POST['min_age'],
            ]);
        }
        if (!isset($_POST['max_age']) || empty($_POST['max_age']) || !$app->getInt($_POST['max_age'])) {
            $max_age_search = $dateY - $userAuthendicated->max_age_search;
        } else {
            $max_age_search = $dateY - (int) $_POST['max_age'];
            $PostTable->update('koko_users', $user_id, [
                'max_age_search' => $_POST['max_age'],
            ]);
        }
        if (!isset($_POST['sex_search']) || empty($_POST['sex_search'])) {
            $genre_search = $userAuthendicated->sex_search;
        } else {
            $genre_search = $_POST['sex_search'];
            $PostTable->update('koko_users', $user_id, [
                'sex_search' => $_POST['sex_search'],
            ]);
        }
        foreach ($menuTable->profilMatch($id, $limit, $min_age_search, $max_age_search, $genre_search, $session_age, $user_id) as $key => $val) {
            $user_data[$key]['age'] = $dateY - $val->date_of_birth;
            $user_data[$key]['online_status'] = $UsersTable->checkSession($val->userPid);
            $user_data[$key]['accepted_relationship'] = 'amie';
            $user_data[$key]['photo_count'] = $mediaTable->CountUserPhotos($val->userPid)->count;
            $user_data[$key]['user'] = $UsersTable->GetUser($val->userPid)->UserFilter;
        }
        if (count($user_data) === 0 || count($user_data) < $limit) {
            $has_next_page = false;
        } else {
            $has_next_page = true;
        }
        echo json_encode($app->msg(1, 200, 'ok', ['data' => ['users' => $user_data, 'has_next_page' => $has_next_page]]));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}