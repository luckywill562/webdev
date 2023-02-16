<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if (!$auth->isAuth()) {
    $app->E422();
} else {
    try {
        $Jeton = [];
        foreach ($TransactionTable->getPoints($session_user_id) as $key => $value) {
            $Jeton[$key]['total']= $value->rest;
            $Jeton[$key]['expiration_date'] = $app->createDateFormat($value->expiredAt);
        }

        echo json_encode($app->msg(1, 200, 'ok',['result' => $Jeton]));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}