<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$auth->isAuth()) {
    $app->E422();
} else if (!isset($_POST['params']) || empty($_POST['params'])) {
    die('params n\'est pas definie');
} else {
    $returnData = [];
    $params = json_decode($_POST['params'], true);
    if (
        isset($params['author_id']) && isset($params['element_type']) && isset($params['element_id'])
        && isset($params['action']) &&
        !empty($params['author_id']) && !empty($params['element_type']) && !empty($params['element_id'])
        && $app->getInt($params['author_id'])
        && $app->getInt($params['element_id'])
        && $likeTable->getType($params['element_type'])
    ) {
        try {
            switch ($params['action']) {
                case 'LIKE':
                    $PostTable->create('likes', [
                        'liker_id' => $session_user_id,
                        'element_id' => $params['element_id'],
                        'createdAt' => date('Y-m-d H:i:s'),
                        'element_type' => $params['element_type']
                    ]);


                    http_response_code(200);
                    $returnData = $app->msg(1, 200, 'Merci pour votre reaction!', ['likes' => $likeTable->countLikes($params['element_id'], $params['element_type'])->count]);
                    break;
                case 'UNLIKE':

                    http_response_code(200);
                    $likeTable->deletePostLike($session_user_id, $params['element_id'], $params['element_type']);
                    $returnData = $app->msg(1, 200, 'Mention j\'aime rétiré!', ['likes' => $likeTable->countLikes($params['element_id'], $params['element_type'])->count]);
                    break;

            }
        } catch (\Throwable $th) {
            http_response_code(500);
            $returnData = $app->msg(0, 500, 'une erreur s\'est produite, Veuillez réessayer plus tard!');
        }
    } else {
        http_response_code(500);
        $returnData = $app->msg(0, 500, 'une erreur s\'est produite');
    }
    echo (json_encode($returnData));
}