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
        if (isset($_POST['password'])) {
            if (
                !isset($usermail) || !isset($data['password']) || empty(trim($usermail))
                || empty(trim($data['password']))
            ):
                http_response_code('422');
                $returnData = $app->msg(0, 422, 'Une erreur s\'est produite, veuillez réesayer!');
                // IF THERE ARE NO EMPTY FIELDS THEN-
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
                        try {
                            $offer = $followerTable->GetPremiumOffer($params['offer_id']);
                            //saved percent
                            $percentage = (100 - $offer->remise);
                            $montantAdeduire = (float) (($percentage * $TransactionTable->CalculPrice($offer->price, $offer->user_id, $session_user_id)) / 100);
                            $realPrice = (float) (($percentage * $offer->price) / 100);
                            $montantAEnvoyer = (float) ($realPrice - ($percentage_per_tafaray * $realPrice) / 100);

                            if ($solde >= $montantAdeduire) {
                                $TransactionTable->update('koko_users', $session_user_id, [
                                    'soldes' => $solde - $montantAdeduire,
                                ]);
                                $TransactionTable->update('koko_users', $offer->user_id, [
                                    'soldes' => $UsersTable->GetUserWithDevise($offer->user_id)->soldes + $montantAEnvoyer,
                                ]);
                                $UsersTable->create('premium_followers', [
                                    'follower_id' => $session_user_id,
                                    'followed_id' => $offer->user_id,
                                    'created_at' => date('Y-m-d H:i:s'),
                                    'expiredAt' =>date("Y-m-d H:i:s",strtotime(date('Y-m-d H:i:s') . "+ $offer->delay days"))
                                ]);
                                http_response_code(200);
                                $returnData = $app->msg(1, 200, 'payment effectué, abonnements validé');
                            } else {
                                http_response_code(422);
                                $returnData = $app->msg(0, 422, 'votre solde est insuffisant');
                            }
                        } catch (\Throwable $th) {
                            $app->Exception($th);
                        }
                    } else {
                        $returnData = $isauth;
                    }
                endif;
            endif;
        }
        echo json_encode($returnData);
    }
}