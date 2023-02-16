<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if (!$auth->isAuth() || !isset($_GET['comment_id']) || empty($_GET['comment_id']) || !isset($_GET['type']) || empty($_GET['type'])) {
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0, 500, 'une erreur s\'est produite!');
} elseif ($auth->isAuth() && isset($_GET['comment_id']) && !empty($_GET['comment_id']) && isset($_GET['type']) && !empty($_GET['type'])) {
    try {
        $res = $commentTable->singleComment($_GET['comment_id'], $_GET['type']);
        if ($res) {
            http_response_code(200);
            $returnData = $app->msg(1, 200, 'ok', ['response' => $res->PostArrayComment]);
        } else {
            http_response_code(404);
            $returnData = $app->msg(0, 404, 'page introuvable');
        }
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}
echo json_encode($returnData);