<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax()){
    $app->E500();
}elseif($app->IsAjax()){
    try {
        $currency = [];
        foreach ($TransactionTable->getCurrency() as $key => $value) {
            $currency[$key]['id'] = $value->id;
            $currency[$key]['name'] = $value->devise;
        }
        echo json_encode($app->msg(1,200,'ok',['responses'=>$currency]));
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}