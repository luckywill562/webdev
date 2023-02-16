<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$auth->isAuth()){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success' => 0,'status'=> 500,'message' => "une erreur s/'est produite, La session a peut etre expirer ou une erreur serveur"]);
}elseif($auth->isAuth()){
    $variable = $messageTable->Gift();
    $gift_list = [];
    foreach ($variable as $key => $value) {
        $gift_list[$key]['gift_name'] = $value->name;
        $gift_list[$key]['gift_price'] =number_format($session_devise->reference_en_dollar * $value->price, 2, '.',' ') ;
        $gift_list[$key]['gift_icon'] = $value->icons;
        $gift_list[$key]['gift_id'] = $value->id;
        $gift_list[$key]['devise'] = $session_devise->devise;
    }
    echo json_encode(['success'=>1,'status'=>200, 'giftList'=>$gift_list]);
}