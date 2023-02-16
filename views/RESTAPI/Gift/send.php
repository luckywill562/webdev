<?php
$returnData = [];
if (
    !$auth->isAuth() || !isset($_POST['gift']) || empty($_POST['gift']) || $_POST['gift'] < 1
    || !isset($_POST['client_id']) || empty($_POST['client_id'])
) {
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success' => 0, 'status' => 500, 'message' => "une erreur s/'est produite, La session a peut etre expirer ou une erreur serveur"]);
} elseif (
    $auth->isAuth() && isset($_POST['gift']) && !empty($_POST['gift']) || $_POST['gift'] > 1
    && isset($_POST['client_id']) && !empty($_POST['client_id'])
) {
    $gift = $messageTable->GetGift($_POST['gift']);
    $price = $gift->price;
    #conversion du prix de l'offre en devise de l'utilisateur
    $offretoDevise = $price * $session_devise->reference_en_dollar;
    $client_devise = $UsersTable->GetUserWithDevise($_POST['client_id']);
    $offreToClientDevise = $price * $client_devise->reference_en_dollar;
    if ($offretoDevise <= $solde) {
        $transfert = $TransactionTable->create('transactions', [
            'user_id' => $session_user_id,
            'transaction_type' => 3,
            'created_At' => date('Y-m-d H:i:s'),
            'montant' => $offretoDevise,
        ]);
        if ($transfert) {
            $TransactionTable->create('transactions', [
                'user_id' => $_POST['client_id'],
                'transaction_type' => 1,
                'created_At' => date('Y-m-d H:i:s'),
                'montant' => $offreToClientDevise,
            ]);
        }
        $returnData = $app->msg(1, 200, 'Cadeaux envoyé');
    } else {
        $returnData = $app->msg(0, 422, 'Votre solde est insufisant');
    }
}
echo json_encode($returnData);