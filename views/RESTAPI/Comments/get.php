<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$auth->isAuth()) {
    $app->E422();
} else if (!isset($_POST['params']) || empty($_POST['params'])) {
    die('params n\'est pas definie');
} else {
    $params = json_decode($_POST['params'], true);
    $limit = 10;
    if (
        isset($params['reply']) && isset($params['parent_id']) && isset($params['element_id']) &&
        !empty($params['parent_id']) && !empty($params['element_id'])
        && $app->getInt($params['element_id']) && $app->getInt($params['parent_id'])
        && isset($_POST['page'])
    ) {
        try {
            $comment_Data = [];
            foreach ($commentTable->getComment((int) $params['element_id'], (int) $params['parent_id'], (int) $limit, (int)$_POST['page'], (string)$params['type'],(bool)$params['reply']) as $comments => $comment) {
                $comment_Data[$comments] = $comment->PostArrayComment;
            }
            if (count($comment_Data) === 0 || count($comment_Data) < $limit) {
                $has_next = false;
            } else {
                $has_next = true;
            }
            echo json_encode($app->msg(1, 200, 'ok', ['comments' => $comment_Data, 'has_next_page' => $has_next]));
        } catch (\Throwable $th) {
            $app->Exception($th);
        }
    } else {
        die('les parametres ne sont pas bon');
    }
}