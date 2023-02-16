<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['limit']) || empty($_POST['limit'])) {
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0, 500, 'une erreur s\'est produite'));
} elseif ($app->IsAjax() && $auth->isAuth() && isset($_POST['limit']) && !empty($_POST['limit'])) {
    $data = [];
    if (isset($_POST['idlist']) && !empty($_POST['idlist'])):
        $id = $_POST['idlist'];
    else:
        $id = '0';
    endif;
    $limit = $_POST['limit'];
    foreach ($UsersTable->suggestionsToFollow($id, $limit, $session_user_id) as $key => $val) {
        $data[$key] = $val->UserAuthor;
    }
    if (count($data) === 0 || count($data) < $_POST['limit']) {
        $has_next = false;
    } else {
        $has_next = true;
    }
    echo json_encode($app->msg(1, 200, 'success', ['users' => $data, 'has_next_page' => $has_next]));
}