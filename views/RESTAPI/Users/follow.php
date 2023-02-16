<?php
header("Content-Type: application/json; charset=UTF-8");
if (
    !$auth->isAuth() || !isset($_POST['action']) || empty($_POST['action']) || !isset($_POST['user_id']) || empty($_POST['user_id']) || !$auth->isAuth() || !$PostTable->getUserExistence($_POST['user_id'])
    || $_POST['user_id'] === $session_user_id || (bool) $UsersTable->GetBlockage($session_user_id,
        $_POST['user_id'], 1)
    || (bool) $UsersTable->GetBlockage($_POST['user_id'],
        $session_user_id, 1)
) {
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0, 500, 'une erreur s\'est produite'));
} elseif (
    $auth->isAuth() && isset($_POST['action']) &&
    !empty($_POST['action']) && isset($_POST['user_id'])
    && !empty($_POST['user_id']) && $auth->isAuth()
    && $PostTable->getUserExistence($_POST['user_id']) && $_POST['user_id'] != $session_user_id &&
    !(bool) $UsersTable->GetBlockage($session_user_id,
        $_POST['user_id'], 1)
    && !(bool) $UsersTable->GetBlockage($_POST['user_id'],
        $session_user_id, 1)
) {
    $followed_id = (int) $_POST['user_id'];
    $returnData = [];
    $user = $UsersTable->GetUser($session_user_id);
    try {
        switch ($_POST['action']) {
            case 'FOLLOW':
                $UsersTable->create('followers', [
                    'follower_id' => $session_user_id,
                    'followed_id' => $followed_id,
                    'created_at' => date('Y-m-d H:i:s'),
                    'confirmed' => 1
                ]);
                $returnData = $app->msg(1, 200, 'vous suivez déjormais cette utilisateur!', ['type' => $_POST['action']]);
                break;
            case 'REQUEST':
                $UsersTable->create('followers', [
                    'follower_id' => $session_user_id,
                    'followed_id' => $followed_id,
                    'created_at' => date('Y-m-d H:i:s'),
                    'confirmed' => 0
                ]);
                $returnData = $app->msg(1, 200, 'Votre demmande a été envoyé!', ['type' => $_POST['action'], 'user' => $user->UserAuthor]);
                break;
            case 'UNFOLLOW':
                $UsersTable->deleteFollower($session_user_id, $followed_id);
                $returnData = $app->msg(1, 200, 'Vous avez désabonner!', ['type' => $_POST['action'], 'user' => $user->UserAuthor]);
                break;
            case 'DELETE_REQUEST':
                $UsersTable->deleteFollower($session_user_id, $followed_id);
                $returnData = $app->msg(1, 200, 'demmande d\'abonnement anullée!', ['type' => $_POST['action'], 'user' => $user->UserAuthor]);
                break;

            case 'ACCEPT':
                $UsersTable->AcceptRequest($session_user_id, $followed_id);
                $returnData = $app->msg(1, 200, 'Demmande acceptée!', ['type' => $_POST['action']]);
                break;
            case 'DECLINE':
                $UsersTable->deleteFollower($followed_id, $session_user_id);
                $returnData = $app->msg(1, 200, 'Vous avez refusé la demmande!', ['type' => $_POST['action']]);
                break;
            case 'DELETE_FROM_SENDER':
                $UsersTable->deleteFollower($session_user_id, $followed_id);
                $returnData = $app->msg(1, 200, 'Demmande d\'abonnement anullée!', ['type' => $_POST['action']]);
                break;
        }
    } catch (\Exception $th) {
        $returnData = $app->msg(0, 500, 'Une erreur s\'est produite, réessayer plus tard!');
    }

    echo json_encode($returnData);
}