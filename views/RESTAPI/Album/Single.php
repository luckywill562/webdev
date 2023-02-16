<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['album_id']) || empty($_POST['album_id'])) {
    $app->headerError();
} elseif ($app->IsAjax() and $auth->isAuth() and isset($_POST['album_id']) and !empty($_POST['album_id'])) {
    $user_data = [];
    try {
        $album = $AlbumTable->getSingleAlbum($_POST['album_id']);
        $user_data['author'] = $UsersTable->GetUser($album->creator_id)->UserAuthor;
        $media_data = [];
        foreach ($mediaTable->getAllPhotosAlbum($album->Aid) as $key => $val) {
            $media_data[$key] = $val->MediaArray;
        }
        $user_data['images'] = $media_data;
        $user_data['album'] = [
            'title' => $album->album_title ? htmlspecialchars($album->album_title) : 'album sans titre',
            'album_id' => $album->Aid,
            'author_id' => $album->creator_id,
            'liked_by_viewer' => (bool) $likeTable->LikedByViewer($session_user_id, $album->Aid, 'album'),
            'like_counter' => $likeTable->countLikes($album->Aid, 'album')->count,
            'comment_counter' => $commentTable->countComments($album->Aid, 'album')->count,
            'security_level' => $album->security,
            'date_of_creation' => $app->ConvertTime($album->created_at),
            'views' => $AlbumTable->CountViews($album->Aid, 'album')->count,
            'comments' => [],
            'has_next_page' => true,
        ];
        if (!$PostTable->SelectViewsUserActivity($album->Aid, $session_user_id, 'album')) {
            $UsersTable->create('views_activity', [
                'viewer_id' => $session_user_id,
                'element_id' => $album->Aid,
                'createdAt' => date('Y-m-d H:i:s'),
                'element_type' => 'album'
            ]);
        }
        echo json_encode($app->msg(1, 200, 'ok', ['album' => $user_data]));

    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}