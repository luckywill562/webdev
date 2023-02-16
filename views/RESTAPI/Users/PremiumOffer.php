<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$auth->isAuth()) {
    $app->E422();
} else if (!isset($_POST['params']) || empty($_POST['params'])) {
    $app->E500();
} else {
    $params = json_decode($_POST['params'], true);
    $data = [];
    if (empty($params) && !isset($params['user_id']) && !$app->getInt($params['user_id'])) {
        $app->E500();
    } else {
        try {
            http_response_code(200);
            foreach ($followerTable->getPremiumOffers($params['user_id']) as $key => $value) {
                $percentage = (100 - $value->remise);
                $data[$key]['saved_price'] =  $app->format((($percentage * $TransactionTable->CalculPrice($value->price, $value->user_id,$session_user_id))/100));
                $data[$key]['price'] = $app->format($TransactionTable->CalculPrice($value->price, $value->user_id, $session_user_id));
                $data[$key]['offer_id'] = $value->id;
                $data[$key]['delay'] = $value->delay . $value->per;
                $data[$key]['saved'] = $value->remise;
                $data[$key]['user_id'] = $value->user_id;
            }
            echo json_encode($app->msg(1, 200, 'ok', ['results' => $data]));
        } catch (\Throwable $th) {
            $app->Exception($th);
        }
    }
}