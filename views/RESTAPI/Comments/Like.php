<?php
header("Content-Type: application/json; charset=UTF-8");
if (
    !isset($_POST['comment_id']) || empty($_POST['comment_id']) || !isset($_POST['action']) || empty($_POST['action']) || !$auth->isAuth()
    || !isset($_POST['element_type']) || empty($_POST['element_type']) || !$commentTable->CheckCommentExistance($_POST['comment_id'])
) {
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0, 500, 'une erreur s\'est produite'));
} elseif (
    isset($_POST['comment_id']) && !empty($_POST['comment_id']) && isset($_POST['action']) && !empty($_POST['action']) && $auth->isAuth()
    && isset($_POST['element_type']) && !empty($_POST['element_type']) && $commentTable->CheckCommentExistance($_POST['comment_id'])
) {
    try {
        $comment_id = (int) $_POST['comment_id'];
        switch ($_POST['action']) {
            case 'LIKE':
                $PostTable->create('comment_likes', [
                    'user_id' => $session_user_id,
                    'comment_id' => $comment_id,
                    'createdAt' => $app->date(),
                    'element_type' => $_POST['element_type']
                ]);
                $returnData = $app->msg(1, 200, 'Vous avez cette commentaire!', ['likes' => $commentTable->CountLikes($comment_id, "POST")->count]);
                break;
            case 'UNLIKE':
                $PostTable->delete('comment_likes', [
                    'user_id' => $session_user_id,
                    'comment_id' => $comment_id,
                ]);
                $returnData = $app->msg(1, 200, 'Mention j\'aime rétiré!', ['likes' => $commentTable->CountLikes($comment_id, "POST")->count]);
                break;
        }
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
    echo json_encode($returnData);
}