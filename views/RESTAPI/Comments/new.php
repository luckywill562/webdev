<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if (
    !$auth->isAuth() || !isset($_POST['element_id']) || empty($_POST['element_id']) ||
    !isset($_POST['comment_content']) || $app->trim($_POST['comment_content']) === ""
    || !isset($_POST['type']) || !$app->getInt($_POST['element_id']) || !isset($_POST['author_id']) ||
    !$app->getInt($_POST['author_id']) || !isset($_POST['parent_id']) || empty($_POST['parent_id']) ||
    !$app->getInt($_POST['parent_id']) || !isset($_POST['reply'])
) {
    http_response_code(500);
    $returnData = $app->msg(0, 500, 'une erreur s\'est produite');
} elseif (
    $auth->isAuth() && isset($_POST['element_id']) && !empty($_POST['element_id']) &&
    isset($_POST['comment_content']) && $app->trim($_POST['comment_content']) != "" &&
    isset($_POST['type']) && $app->getInt($_POST['element_id']) && isset($_POST['author_id']) &&
    $app->getInt($_POST['author_id']) && isset($_POST['parent_id']) && !empty($_POST['parent_id']) &&
    $app->getInt($_POST['parent_id']) && isset($_POST['reply'])
) {
    if ($commentTable->getType($_POST['type']) === false) {
        http_response_code(500);
        $returnData = $app->msg(0, 500, 'une erreur s\'est produite');
    } else {
        $element_id = (int) $_POST['element_id'];
        $parent_id = (int) $_POST['parent_id'];
        $commentval = htmlspecialchars($app->trim($_POST['comment_content']));
        try {
            http_response_code(200);
            $val = $commentTable->createComment($commentval, $session_user_id, $parent_id, $element_id, htmlspecialchars($app->trim($_POST['type'])), $_POST['reply']);
            $returnData = $app->msg(1, 200, 'Merci pour votre commentaire!', ['data' => $val->PostArrayComment]);
            $array = [];
            if ($_POST['type'] === 'album' && $_POST['reply'] === 0) {

                $array = [
                    'user_id' => $_POST['author_id'],
                    'Reason' => 'COMMENT_ALBUM',
                    'from_user_id' => $session_user_id,
                    'montant' => '',
                    'path' => "/album/$element_id",
                    'user_type' => '',
                    'element_id' => $element_id,
                    'element_type' => 'post'
                ];
            } elseif ($_POST['type'] == 'post' && $_POST['reply'] == "false") {
                $commentTable->update('posts', $element_id, [
                    'last_activity' => $app->date()
                ]);
                $array = [
                    'user_id' => $_POST['author_id'],
                    'Reason' => 'COMMENT_POST',
                    'from_user_id' => $session_user_id,
                    'montant' => '',
                    'path' => "/post/$element_id",
                    'user_type' => '',
                    'element_id' => $element_id,
                    'element_type' => 'post'
                ];
            } elseif ($_POST['type'] === 'reply_album') {
                $array = $array = [
                    'user_id' => $_POST['author_id'],
                    'Reason' => 'REPLY_ALBUM_COMMENT',
                    'from_user_id' => $session_user_id,
                    'montant' => '',
                    'path' => "",
                    'user_type' => '',
                    'element_id' => $element_id,
                    'element_type' => 'post'
                ];
            } elseif ($_POST['type'] === 'reply_post') {
                $array = [
                    'user_id' => $_POST['author_id'],
                    'Reason' => 'REPLY_POST_COMMENT',
                    'from_user_id' => $session_user_id,
                    'montant' => '',
                    'path' => "",
                    'user_type' => '',
                    'element_id' => $element_id,
                    'element_type' => 'reply'
                ];
            }
            if ($session_user_id != $_POST['author_id'] && !empty($array)) {
                $notifTable->NotificationsGroup([$array], $app);
            }

        } catch (\Throwable $th) {
            $app->Exception($th);
        }

    }
}
echo json_encode($returnData);