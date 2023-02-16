<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$auth->isAuth()) {
    $app->E500();
} elseif ($auth->isAuth()) {
    $variable = $TransactionTable->Offres();
    $Jetons_list = [];
    foreach ($variable as $key => $value) {
        $Jetons_list[$key]['_name'] = $app->format($value->Jeton_number);
        $Jetons_list[$key]['_price'] = $app->format($session_devise->reference_en_dollar * $value->Price);
        $Jetons_list[$key]['_id'] = $value->id;
        $Jetons_list[$key]['_delay'] = $value->delay . 'jours';
    }
    echo json_encode($app->msg(1, 200, 'ok', ['responses' => $Jetons_list]));
}