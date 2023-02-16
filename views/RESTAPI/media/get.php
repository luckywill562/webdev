<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if (!$auth->isAuth() || !isset($_GET['id']) || empty($_GET['id']) || !isset($_GET['element_id']) || empty($_GET['element_id']) || !isset($_GET['type']) || empty($_GET['type'])) {
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0, 500, 'une erreur s\'est produite!');
} elseif ($auth->isAuth() && isset($_GET['id']) && !empty($_GET['id']) && isset($_GET['element_id']) && !empty($_GET['element_id']) && isset($_GET['type']) && !empty($_GET['type'])) {
    try {
        $getType = htmlspecialchars($_GET['type']);
        $next_page = $mediaTable->getMediaNext($_GET['id'], $_GET['element_id'], $getType);
        $prev_page = $mediaTable->getMediaPrev($_GET['id'], $_GET['element_id'], $getType);
        if ($_GET['type'] === 'album') {
            $val = $AlbumTable->getMedia($_GET['id'], $_GET['element_id']);
            $src_type = 'media';
        } elseif ($_GET['type'] === 'post') {
            $val = $PostTable->getMedia((int) $_GET['id'], $_GET['element_id']);
            $src_type = 'post';
        } else {
            $val = null;
            $next_page = null;
            $prev_page = null;
            $src_type = null;
        }
        $data = [];
        if ($val && $val->album_id === $_GET['element_id']) {
            if ($next_page) {
                $next_page = '/media?id=' . $next_page->id . '&type=' . $_GET['type'] . '&element_id=' . $_GET['element_id'];
            }
            if ($prev_page) {
                $prev_page = '/media?id=' . $prev_page->id . '&type=' . $_GET['type'] . '&element_id=' . $_GET['element_id'];
            }
            if ($val->media_type === 'video') {
                $media_name = explode(".", $val->media_name);
                $media_src = $app->src($media_name[0] . '.png', 'original', 'thumbnail');
            } elseif ($val->media_type === 'image' || $val->media_type === null) {
                $media_src = $app->src($val->media_name, 'original', $src_type);
            }
            $data['author'] = $UsersTable->GetUser($val->creator_id)->UserAuthor;
            $data['element'] = [
                'element_id' => $val->element_id,
            ];
            $content = htmlspecialchars($client->shortnameToImage($menuTable->ParseLigne($client->toShort($menuTable->parseTwit($val->description)))));
            if ($val->montant > 0 && $fileTable->GetMediaPayment(
                    $val->media_name,
                    $session_user_id,
                    $val->media_apartenance
                ) || $val->montant > 0 && $followerTable->PremiumFollowerOnViewer($session_user_id, $val->author_id)  || $val->montant > 0 && $val->author_id == $session_user_id
            ) {
                $viewer_can_see = true;
            } else {
                $viewer_can_see = false;
            }
            $data['content'] = [
                'media_id' => $val->media_id,
                'media' => $val->media_name ? $val->media_name : 'image',
                'media_type' => $val->media_type,
                'content_type' => $val->media_apartenance,
                'media_height' => $val->media_height,
                'media_width' => $val->media_width,
                'media_src' => $media_src,
                'media_link' => $_POST['media_link'],
                'next' => $next_page,
                'prev' => $prev_page,
                'viewer_can_see' => $viewer_can_see,
                'price' => $app->format($TransactionTable->CalculPrice($val->montant, $val->author_id, $session_user_id)),
                'blocked' => (bool) $val->montant,
                'deblocked_by_viewer' => (bool) $fileTable->GetMediaPayment($val->media_name, $session_user_id, $val->media_apartenance),
                'create_by_viewer' => $val->author_id == $session_user_id,
                'liked_by_viewer' => (bool) $likeTable->LikedByViewer($session_user_id, $val->media_id,'media'),
                'like_counter' => $likeTable->countLikes($val->media_id, 'media')->count,
                'description' => $content,
                'date' => $app->ConvertTime($val->dateofcreation),
                'count_comments' => $commentTable->countComments($val->media_id, $val->media_apartenance . "_media")->count,
                'saved_by_viewer' => (bool) $mediaTable->savedByViewer($session_user_id, $val->media_id, $val->media_apartenance),
            ];
            $comment_Data = [];
            $data['comments'] = $comment_Data;
            $data['has_next_page'] = true;
            $returnData = $app->msg(1, 200, 'ok', ['payload' => $data]);
        } else {
            $returnData = $app->msg(0, 500, 'introuvable');
        }
    } catch (\Throwable $th) {
        $returnData = $app->msg(0, 422, 'une erreur s\'est produite!');
    }
}
echo json_encode($returnData);