<?php
use Ratchet\App;
if ($app->IsAjax() && !$auth->isAuth()) {
    header("Content-Type: application/json; charset=UTF-8");
    $data = $_POST;
    $pattern1 = '/[\'\/~`\!@#$%\^&\*\(\)\-\+=\{\}\[\]\|;:"\<\>,\\?\\\]/';
    $pattern2 = '/[\s]+/';
    $returnData = [];
    if (
        !isset($data['name']) || !isset($data['email']) || !isset($data['password'])
        || !isset($data['passwordC']) || !isset($data['Dbirth']) || !isset($data['Mbirth'])
        || !isset($data['Ybirth']) || !isset($data['sexe'])
        || !isset($data['username'])
        || empty(trim($data['name'])) || empty(trim($data['email'])) || empty(trim($data['password']))
        || empty(trim($data['passwordC'])) || empty(trim($data['Dbirth'])) || empty(trim($data['Mbirth']))
        || empty(trim($data['Ybirth'])) || empty(trim($data['sexe']))
        || empty(trim($data['username']))
        || !isset($_POST['currency'])
    ):
        $returnData = $app->msg(0, 422, 'Veuillez complétez tous les champs!');
    elseif (strlen($data['name']) < 4):
        $returnData = $app->msg(0, 422, 'Votre nom doit contenir au moins 4 caracteres!');
    elseif (strlen($data['name']) >= 60):
        $returnData = $app->msg(0, 422, 'Votre nom est trop long!');
    elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)):
        $returnData = $app->msg(0, 422, 'Votre adresse email n\'est pas valide!');
    elseif (strlen($data['password']) < 8):
        $returnData = $app->msg(0, 422, 'Votre mot de passe doit contenir au moins 8 caractères');
    elseif ($data['password'] != $data['passwordC']):
        $returnData = $app->msg(0, 422, 'Les deux mot de passe doit etre identiques');
    elseif ($auth->CheckEmail($data['email'])):
        $returnData = $app->msg(0, 422, 'Cette email est déjà utilisé par un autre compte');
    elseif (!$app->getInt($_POST['Ybirth']) || !$app->getInt($_POST['Dbirth']) || !$app->getInt($_POST['Mbirth'])):
        $return = $app->msg(0, 422, 'veuillez choisir une date correct');
    elseif ((int) date('Y') - (int) trim($_POST['Ybirth']) < 18):
        $returnData = $app->msg(0, 422, 'Vous devez avoir plus de 18 ans');
    elseif (preg_match($pattern1, trim($client->toShort($data['username']))) || preg_match($pattern2, trim($client->toShort($data['username'])))):
        $returnData = $app->msg(0, 422, 'Votre nom d\'utilisateur ne doit pas contenir des caractères spéciaux ou des espaces');
    elseif (strlen(trim($client->toShort($data['username']))) < 6):
        $returnData = $app->msg(0, 422, 'Choisissez un nom d\'utilisateur plus long');
    elseif ($auth->Checkusernane(trim($client->toShort($data['username']))) || (bool) array_search($_POST['username'], $routerArray)):
        $returnData = $app->msg(0, 422, 'Choisissez un autre nom d\'utilisateur');
    
    else:
        $email = trim($data['email']);
        $password = trim($data['password']);
        $name = htmlspecialchars(trim($data['name']));
        $username = htmlspecialchars($data['username']);
        $date_of_birth = (int) trim($data['Ybirth']);
        if ((int) $data['step'] === 1) {
            $returnData = $app->msg(1, 200, 'Veuillez compléter les autre étapes nécessaires!');
        } elseif ((int) $data['step'] === 6) {
            if (
                !isset($data['max_age_required']) || !isset($data['min_age_required'])
                || !isset($data['interested_sex']) || !isset($data['accepted_relation'])
                || !isset($data['currency']) || empty($data['currency'])
                || empty(trim($data['max_age_required'])) || empty(trim($data['min_age_required']))
                || empty(trim($data['interested_sex'])) || empty(trim($data['accepted_relation']))
                || !$app->getInt($_POST['max_age_required']) || !$app->getInt($_POST['min_age_required']) 
                || !$app->getInt($_POST['currency'])
            ) {
                $returnData = $app->msg(1, 200, 'Veuillez compléter correctement toutes les étapes necessaires a l\'inscriptions!');
            } else {
                try {
                    $PostTable->create('koko_users', [
                        'name' => $name,
                        'email' => $email,
                        'password' => password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]),
                        'date_of_birth' => trim($data['Ybirth']),
                        'username' => $username,
                        'avatar' => 'avatar.jpg',
                        'max_age_search' => trim($data['max_age_required']),
                        'min_age_search' => trim($data['min_age_required']),
                        'sex_search' => trim($data['interested_sex']),
                        'genre' => trim($data['sexe']),
                        'day_of_birth' => trim($data['Dbirth']),
                        'month_of_birth' => trim($data['Mbirth']),
                        'confirmation_token' => $auth->uniqId(0, 60),
                        'accepted_relation' => trim($data['accepted_relation']),
                        'createdAt' => date('Y-m-d H:i:s')
                    ]);

                    $auth = $auth->loginVerification($domain, $email, $password, $jwt);
                    if ($auth['success'] === 1) {
                        $returnData = $app->msg(1, 200, 'Vous êtes inscrits', ['step' => 'logged']);
                    } else {
                        $returnData = $app->msg(0, 500, 'une erreur s\'est produite, essayer de se connecter!', ['step' => 'logged']);
                    }
                } catch (\Throwable $th) {
                    $returnData = $app->msg(0, 500, 'une erreur s\'est produite!');
                }
            }
        }

    endif;

    echo json_encode($returnData);
} elseif ($app->IsAjax() && $auth->isAuth()) {
    echo json_encode($app->msg(1, 200, 'vous etes deja en ligne'));
}