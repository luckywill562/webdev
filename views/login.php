<?php
if ($app->IsAjax() && !$auth->isAuth()) {
    header("Content-Type: application/json; charset=UTF-8");
    $data = $_POST;
    $returnData = [];
    // IF REQUEST METHOD IS NOT EQUAL TO POST
    if ($_SERVER["REQUEST_METHOD"] != "POST"):
        $returnData = $app->msg(0, 404, 'Page Not Found!');

        // CHECKING EMPTY FIELDS
    elseif (
        !isset($data['email'])
        || !isset($data['password'])
        || empty(trim($data['email']))
        || empty(trim($data['password']))
    ):

        $fields = ['fields' => ['email', 'password']];
        $returnData = $app->msg(0, 422, 'Une erreur s\'est produite, réesayer plus tard!', $fields);

        // IF THERE ARE NO EMPTY FIELDS THEN-
    else:
        $email = trim($data['email']);
        $password = trim($data['password']);
        // CHECKING THE EMAIL FORMAT (IF INVALID FORMAT)
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)):
            $returnData = $app->msg(0, 422, 'L\'adresse email n\'est pas valide!');

            // IF PASSWORD IS LESS THAN 8 THE SHOW THE ERROR
        elseif (strlen($password) < 8):
            $returnData = $app->msg(0, 422, 'Votre mot de passe ne correspond pas!');

            // THE USER IS ABLE TO PERFORM THE LOGIN ACTION
        else:
            try {
                //code...
                $returnData = $auth->loginVerification($domain, $email, $password, $jwt);
            } catch (\Throwable $th) {
                $returnData = $app->msg(0, 500, 'une erreur s\'est produite');
            }
        endif;
    endif;
    echo json_encode($returnData);
} elseif ($app->IsAjax() && $auth->isAuth()) {
    echo json_encode($app->msg(1, 200, 'vous etes deja en ligne'));
}