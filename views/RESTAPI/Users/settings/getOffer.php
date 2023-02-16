<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$app->IsAjax() || !$auth->isAuth()) {
    header('500 Internal Server Error', TRUE, 500);
    http_response_code(500);
    echo json_encode($app->msg(0, 500, 'une erreur s\'est produite'));
} elseif ($app->IsAjax() && $auth->isAuth()) {
    try {
        http_response_code(200);
        $first = $followerTable->UserPremiumOffer($session_user_id, 1);
        $second = $followerTable->UserPremiumOffer($session_user_id, 2);
        echo json_encode($app->msg(1, 200, 'ok', [
            'data' => [
                'firstdeg' => [
                    'active' => (bool)$first,
                    'price'=> $first ? $app->format($first->price):0,
                    'delay' => '15 jours'
                ],
                'seconddeg' => [
                    'active' => (bool)$second,
                    'price'=> $second? $app->format($second->price): 0,
                    'delay'=> '1 mois'
                ]
            ]
        ]));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}