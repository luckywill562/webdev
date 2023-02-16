<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth()){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'Une erreur s\'est produite, veullez reesayer!');
}elseif($auth->isAuth()){  
    try {
        $account = [
            'devise'=>$session_devise->devise,
            'total' => $app->format($TransactionTable->CalculSoldeAccount($session_user_id)) ,
            'animate' => (int)$TransactionTable->CalculSoldeAccount($session_user_id)
        ];
        $transaction = [];
        foreach($TransactionTable->AllTransaction($session_user_id) as $key => $val){
            $montant = $app->format($val->montant);
            $transaction[$key]['montant'] = $montant;
            $transaction[$key]['transaction_type'] = $val->transaction_type;
            $transaction[$key]['transaction_name'] = $TransactionTable->Transaction_type($val->transaction_type)['name'];
            $transaction[$key]['transaction_date'] = $app->createDateFormat($val->created_At);
            $transaction[$key]['info'] = $TransactionTable->Transaction_type($val->transaction_type,$montant)['info'];
        }
        $returnData =$app->msg(1,200,'ok',['solde' => $account,'transactions'=>$transaction]);
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
}
echo json_encode($returnData);