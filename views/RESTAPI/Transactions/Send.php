<?php 
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['user_id']) || empty($_POST['user_id']) 
|| !isset($_POST['password']) || empty($_POST['password'])
|| !isset($_POST['montant']) || empty(trim($_POST['montant']))
|| !$app->getInt($_POST['montant'])
|| !$PostTable->getUserExistence($_POST['user_id'])){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite!');
}elseif($auth->isAuth() && isset($_POST['user_id']) && !empty($_POST['user_id'])
 && isset($_POST['montant']) && !empty($_POST['montant'])
 && isset($_POST['password']) && !empty($_POST['password'])
 && $app->getInt($_POST['montant'])
&& $PostTable->getUserExistence($_POST['user_id'])){
    $email = trim($UsersTable->GetUser($session_user_id)->email);
    $password = trim(htmlentities($_POST['password']));
    $correctLogin = $auth->userVerification($domain,$email,$password,$jwt);
    $client_devise = $UsersTable->GetUserWithDevise($_POST['user_id']);
                  
    if($correctLogin['success'] === 1 && $solde >= $_POST['montant']){
        try {
            if($_POST['user_id'] != $session_user_id){
                $TransactionTable->update('koko_users',$session_user_id,[
                    'soldes' => (int)$solde - trim($_POST['montant']),
                ]);
                $pricefirst = $app->Table('transaction')->CalculPrice((int)$_POST['montant'], $session_user_id,$_POST['user_id']);
                $percent = $pricefirst * 5 /100 ;
                $price = $pricefirst- $percent;
                $TransactionTable->update('koko_users',$_POST['user_id'],[
                    'soldes' => $client_devise->soldes + $price,
                ]);
    
                $notification = ['data'=>[
                  'for_user'=> [[
                      'user_id'=>$session_user_id,
                      'Reason' => 'TRANSFERT',
                      'from_user_id'=>$_POST['user_id'],
                      'montant' => $_POST['montant'],
                      'path'=> "/account",
                      'user_type' => 'INFO',
                      'element_id' => '',
                      'element_type' => '',],
                      [
                        'user_id'=>$_POST['user_id'],
                        'Reason' => 'RECEPTION',
                        'from_user_id'=>$session_user_id,
                        'montant' => $price,
                        'path'=> "/account",
                        'user_type' => 'INFO',
                        'element_id' => '',
                        'element_type' => '' ]
                        ]]
                    ];
                    $notifTable->NewNotifications($notification['data']['for_user'],$app);
                    $returnData = $app->msg(1,200,'Transfert bien effectué!');
            }else{
                $returnData = $app->msg(0,500,'une erreur s\'est produite!');
            } 
        } catch (\Throwable $th) {
            $returnData = $app->msg(0,500,'une erreur s\'est produite!');

        }
    }elseif($correctLogin['success'] === 1 && $solde < $_POST['montant']){
        $returnData = $app->msg(0,422,'Votre solde est insufisant!');
    }else{
        $returnData = $correctLogin;
    }
}
echo json_encode($returnData);