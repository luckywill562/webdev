<?php
if($app->IsAjax() && !$auth->isAuth()){
    header("Content-Type: application/json; charset=UTF-8");
    $data = $_POST;
$returnData = [];
// IF REQUEST METHOD IS NOT EQUAL TO POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = $app->msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS
elseif(!isset($data['email']) 
    || empty(trim($data['email']))
    ):

    $fields = ['fields' => ['email']];
    $returnData = $app->msg(0,422,'Une erreur s\'est produite, réesayer plus tard!',$fields);
else:
    $email = trim($data['email']);
    // CHECKING THE EMAIL FORMAT (IF INVALID FORMAT)
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
        $returnData = $app->msg(0,422,'L\'adresse email n\'est pas valide!');
        elseif(!$auth->CheckEmail($email)):
            $returnData = $app->msg(0,422,'nous ne trouvons aucun compte correspondant a votre adresse email');
        else:
            try {
                $auth->update_reset_token($email);
                $returnData = $app->msg(1,200,'nous vous avons envoyé par email l\'instruction de récuperation de mot de passe');
            } catch (\Throwable $th) {
                $returnData = $app->msg(0,500,'une erreur s\'est produite');
            } 
    endif;
endif;
echo json_encode($returnData);
}elseif($app->IsAjax() && $auth->isAuth()){
    echo json_encode($app->msg(1,200,'vous etes deja en ligne'));
}
