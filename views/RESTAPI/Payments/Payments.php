<?php
header("Content-Type: application/json; charset=UTF-8");
if (isset($_POST['media_appartenance']) && $_POST['media_appartenance'] === 'post') {
    if (isset($_POST['media_type']) && $_POST['media_type'] === 'video') {
        $path = $file_path . 'videos' . SEP;
    } else {
        $path = $file_path . 'images' . SEP;
    }
    $link = '/post';
    $media_type = 'post';
} elseif (isset($_POST['media_appartenance']) && $_POST['media_appartenance'] === 'album') {
    if (isset($_POST['media_type']) && $_POST['media_type'] === 'video') {
        $path = $file_path . 'videos' . SEP;
    } else {
        $path = $file_path . 'images' . SEP;
    }

    $link = '/album';
    $media_type = 'media';
}
$table = 'medias';
try {
    if (
        !$auth->isAuth() || empty($_POST['media_appartenance']) || !isset($_POST['media_appartenance']) ||
        empty($_POST['media']) || !isset($_POST['media']) ||
        empty($_POST['media_id']) || !isset($_POST['media_id'])
    ) {
        http_response_code(500);
        header('500 Internal Server Error', TRUE, 500);
        echo json_encode($app->E500());
    } elseif (!$fileTable->getMediaExistence($_POST['media_id'], $table) || !file_exists($path . $_POST['media'])) {
        http_response_code(404);
        header('404 Page Not Found', TRUE, 404);
        echo json_encode($app->msg(0, 404, 'le contenu est introuvable'));
    } elseif (
        $auth->isAuth() && !empty($_POST['media_appartenance']) && isset($_POST['media_appartenance']) ||
        !empty($_POST['media']) && isset($_POST['media']) && !empty($_POST['media_id']) && isset($_POST['media_id'])
    ) {
        $data = $_POST;
        $usermail = $UsersTable->GetUser($session_user_id)->email;
        if (isset($_POST['password'])) {
            if (
                !isset($usermail) || !isset($data['password']) || empty(trim($usermail))
                || empty(trim($data['password']))
            ):

                $fields = ['fields' => ['email', 'password']];
                $returnData = $app->msg(0, 422, 'Une erreur s\'est produite, veuillez réesayer!', $fields);
                // IF THERE ARE NO EMPTY FIELDS THEN-
            else:
                $email = trim($usermail);
                $password = trim(htmlEntities($data['password']));
                // CHECKING THE EMAIL FORMAT (IF INVALID FORMAT)
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)):
                    $returnData = $app->msg(0, 422, 'Adresse email invalide!');
                elseif (strlen($password) < 8):
                    $returnData = $app->msg(0, 422, 'un mot de passe doit contenir au moins 8 caractères!');
                else:
                    $isauth = $auth->userVerification($domain, $email, $password, $jwt);
                    if(!empty($isauth) && $isauth['success'] === 1 && $isauth['status'] === 200){
                        $media = $fileTable->getMediaExistence($_POST['media_id'], $table);
                        if (!$fileTable->GetMediaPayment($_POST['media'], $session_user_id, $_POST['media_appartenance']) && !(bool)$followerTable->PremiumFollowerOnViewer($session_user_id, $media->author_id)) {
                            $montantAdeduire = (float) $app->Table('transaction')->CalculPrice($media->montant, $media->author_id, $session_user_id);
                            //verification du solde
                           if ($solde >= $montantAdeduire) {
                                $montantAEnvoyer = (float)$media->montant - ($percentage_per_tafaray * $media->montant) / 100;
                                if ($session_user_id != $media->author_id) {
                                    //deduire le montant
                                    try {
                                        $TransactionTable->update('koko_users', $session_user_id, [
                                            'soldes' => $solde - $montantAdeduire,
                                        ]);
                                        $result = $app->msg(1, 200, 'transfert effectué');
                                    } catch (\Throwable $th) {
                                        $app->Exception($th);
                                    }
                                    if ($result['success'] === 1) {
                                        try {
                                            //transferer l'argent
                                            $TransactionTable->update('koko_users', $media->author_id, [
                                                'soldes' => $UsersTable->GetUserWithDevise($media->author_id)->soldes + $montantAEnvoyer,
                                            ]);
                                            $reception = $app->msg(1, 200, 'montant bien reçu');
                                        } catch (\Throwable $th) {
                                            $app->Exception($th);
                                        }
                                        //creation de l'autorisatons
                                        $TransactionTable->create('autorisations', [
                                            'user_id' => $session_user_id,
                                            'media_name' => $_POST['media'],
                                            'created_At' => date('Y-m-d H:i:s'),
                                            'media_creator_id' => $media->author_id,
                                            'media_type' => $_POST['media_appartenance'],
                                        ]);
                                        $TransactionTable->create('transactions', [
                                            'user_id' => $session_user_id,
                                            'transaction_type' => 'DEDUCTION_FOR_MEDIAS',
                                            'created_At' => date('Y-m-d H:i:s'),
                                            'montant' => $montantAdeduire,
                                        ]);
                                        $notificationpath = $link . '/' . $_POST['element_id'] . '/' . $_POST['media_id'];
                                        if ($reception['success'] === 1) {
                                            $TransactionTable->create('transactions', [
                                                'user_id' => $media->author_id,
                                                'transaction_type' => 'RECEPTION_MEDIA_PAYMENT',
                                                'created_At' => date('Y-m-d H:i:s'),
                                                'montant' => $montantAEnvoyer,
                                            ]);
                                            $notification = [
                                                'data' => [
                                                    'type' => 'DEBLOCAGE_SUCCESS',
                                                    'media_src' => $app->src($_POST['media'], 'original', $media_type),
                                                    'for_user' => [
                                                        [
                                                            'user_id' => $session_user_id,
                                                            'Reason' => 'DEDUCTION_FOR_MEDIAS',
                                                            'from_user_id' => $media->author_id,
                                                            'montant' => $montantAdeduire,
                                                            'path' => "/account",
                                                            'user_type' => 'INFO',
                                                            'element_id' => $_POST['media_id'],
                                                            'element_type' => $_POST['media_appartenance'],

                                                        ],
                                                        [
                                                            'user_id' => $media->author_id,
                                                            'Reason' => 'RECEPTION_MEDIA_PAYMENT',
                                                            'from_user_id' => $session_user_id,
                                                            'montant' => $montantAEnvoyer,
                                                            'path' => "/account",
                                                            'user_type' => 'INFO',
                                                            'element_id' => $_POST['media_id'],
                                                            'element_type' => $_POST['media_appartenance']
                                                        ],
                                                        [
                                                            'user_id' => $media->author_id,
                                                            'Reason' => 'DEBLOCAGE_CONTENT',
                                                            'from_user_id' => $session_user_id,
                                                            'montant' => 0,
                                                            'path' => $notificationpath,
                                                            'user_type' => '',
                                                            'element_id' => $_POST['media_id'],
                                                            'element_type' => $_POST['media_appartenance']
                                                        ]
                                                    ]
                                                ]
                                            ];
                                            $notifTable->NewNotifications($notification['data']['for_user'], $app);

                                            $returnData = $app->msg(1, 200, 'Déblocage du contenu réussie', $notification);
                                        } else {
                                            $returnData = $app->msg(0, 500, 'Le transfert de l\'argent n\'est pas réussie');
                                        }
                                    }
                                } else {
                                    $returnData = $app->msg(0, 402, 'Le contenu vous appartient, donc vous ne payez pas pour le voir');
                                }
                            } else {
                                $returnData = $app->msg(0, 402, 'Votre solde est insufisant , Vous avez ' . $app->format($solde) . $devise . ' dans votre compte');
                            }
                        } else {
                            $returnData = $app->msg(1, 200, 'Vous  avez déjà accèss  ce contenu');
                        }
                    } else {
                        $returnData = $app->msg(0, 500, 'Vous avez entrer un mauvais mot de passe');
                    }
                endif;
            endif;
            echo json_encode($returnData);
        } else {
            echo json_encode(["message" => "confirmez votre identité pour proceder au payment", 'success' => 1, 'status' => 200, 'step' => 2]);
        }
    }
} catch (\Throwable $th) {
    $app->Exception($th);
}