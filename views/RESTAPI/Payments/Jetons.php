<?php
header("Content-Type: application/json; charset=UTF-8");
if (!$auth->isAuth()) {
    $app->E422();
} else if (!isset($_POST['params']) || empty($_POST['params']) || !isset($_POST['password']) || empty($_POST['password'])) {
    $app->E500();
} else {
    $params = json_decode($_POST['params'], true);
    if (empty($params) && !isset($params['offer_id']) && !$app->getInt($params['offer_id'])) {
        $app->E500();
    } else {
        $data = $_POST;
        $usermail = $UsersTable->GetUser($session_user_id)->email;

        if (
            !isset($usermail) || !isset($data['password']) || empty(trim($usermail))
            || empty(trim($data['password']))
        ):
            http_response_code('422');
            $returnData = $app->msg(0, 422, 'Une erreur s\'est produite, veuillez réesayer!');
        else:
            $email = trim($usermail);
            $password = trim(htmlEntities($data['password']));
            // CHECKING THE EMAIL FORMAT (IF INVALID FORMAT)
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)):
                http_response_code(422);
                $returnData = $app->msg(0, 422, 'Adresse email invalide!');
            elseif (strlen($password) < 8):
                http_response_code(422);
                $returnData = $app->msg(0, 422, 'un mot de passe doit contenir au moins 8 caractères!');
            else:
                $isauth = $auth->userVerification($domain, $email, $password, $jwt);
                if (!empty($isauth) && $isauth['success'] === 1 && $isauth['status'] === 200) {
                    http_response_code(200);
                    $returnData = [];
                    /*conversion en dollar*/
                    $convertSessionSoldeToReference = $TransactionTable->convertToReference($solde, $session_devise->reference_en_dollar);
                    $offre = $TransactionTable->selectOffre($params['_id']);
                    #conversion du prix de l'offre en devise de l'utilisateur
                    $offretoDevise = $offre->Price * $session_devise->reference_en_dollar;
                    #verification si le solde est insufissant;  
                    if ((float) $solde < $offretoDevise) {
                        $returnData = $app->msg(0, 422, 'Votre solde est insufisant');
                    } elseif ((float) $solde >= $offretoDevise) {
                        //deduire le montant de l'offre a la solde de l'utilisateur
                        try {
                            //code...
                            $TransactionTable->update('koko_users', $session_user_id, [
                                'soldes' => (int) $solde - (int) $offretoDevise,
                            ]);
                            $TransactionTable->create('user_points', [
                                'user_id' => $session_user_id,
                                'offer_id'=> $params['_id'],
                                'rest'=>$offre->Jeton_number,
                                'createdAt' => date('Y-m-d H:i:s'),
                                'expiredAt'=> date("Y-m-d H:i:s",strtotime(date('Y-m-d H:i:s') . "+ $offre->delay days")),
                            ]);
                            $TransactionTable->create('transactions', [
                                'user_id' => $session_user_id,
                                'transaction_type' => "BUY_POINTS",
                                'created_At' => date('Y-m-d H:i:s'),
                                'montant' => $offretoDevise,
                            ]);
                            $transfert = $app->msg(1, 200, 'achat ok');
                        } catch (\Throwable $th) {
                            //throw $th;
                            $transfert = $app->msg(0, 422, 'achat erreur');
                        }
                        if ($transfert['success'] === 1) {

                            $notification = [
                                'data' => [
                                    'type' => 'BUY_SUCCESS',
                                    'media_src' => '',
                                    'for_user' => [
                                        [
                                            'user_id' => $session_user_id,
                                            'Reason' => 'POINTS_BUY',
                                            'from_user_id' => "",
                                            'montant' => $offretoDevise,
                                            'path' => "/account/transactions",
                                            'user_type' => 'INFO',
                                            'element_id' => null,
                                            'element_type' => 'Jeton'
                                        ],
                                    ]
                                ]
                            ];
                            $notifTable->NewNotifications($notification['data']['for_user'], $app);

                            $returnData = $app->msg(1, 200, 'Felicitation! achat de l\'offre effectuée avec succèss');
                        } else {
                            http_response_code(404);
                            $returnData = $app->msg(0, 404, 'Nous sommes désolé, une erreur s\'est produite lors de votre achat');
                        }
                    }
                }
            endif;
        endif;

    }
    echo json_encode($returnData);
}