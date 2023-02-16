<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['limit']) || empty($_POST['limit'])) {
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0, 500, 'une erreur s\'est produite'));
} elseif ($app->IsAjax() && $auth->isAuth() && isset($_POST['limit']) && !empty($_POST['limit'])) {
    try {
        $user_data = [];
        $comment_Data = [];
        $limit = $_POST['limit'];
        if (isset($_POST['idlist']) && !empty($_POST['idlist'])):
            $id = $_POST['idlist'];
        else:
            $id = '0';
        endif;
        foreach ($PostTable->getAllPosts($id, $limit, $session_user_id) as $key => $val) {
            $user_data[$key]['post'] = $val->PostContentArray;
            $media_data = [];
            foreach ($mediaTable->getImagesPost($val->post_id) as $medias => $media) {
                $media_data[$medias] = $media->MediaArray;
            }
            $user_data[$key]['media_src'] = $media_data;
            $user_data[$key]['author'] = $UsersTable->GetUser($val->user_id)->UserAuthor;
            $comment_Data = [];

            $user_data[$key]['post_reply'] = $comment_Data;
            /**
             if (!$PostTable->SelectViewsUserActivity($val->post_id, $session_user_id, 'post')) {
                 $UsersTable->create('views_activity', [
                     'viewer_id' => $session_user_id,
                     'element_id' => $val->id,
                     'createdAt' => date('Y-m-d H:i:s'),
                     'element_type' => 'post'
                 ]);
             }
             * 
             */
        }
        if (count($user_data) === 0 || count($user_data) < $_POST['limit']) {
            $has_next = false;
        } else {
            $has_next = true;
        }
        echo json_encode(['success' => 1, 'posts' => $user_data, 'has_next_page' => $has_next]);
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}