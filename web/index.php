<?php
define('DIR', dirname(__DIR__));
define('SEP', DIRECTORY_SEPARATOR );
require DIR . '/vendor/autoload.php';
require DIR . '/src/Src.php';
$app = Src\Src::getInstance();
$jwt = new Src\App\Auth\JwtHandler();
$auth = new Src\App\Auth\Auth($app->getDb(),$app,$jwt);
$router = new Src\App\Router\Router(DIR . '/views',$app,$auth,$jwt,$app->EmojiLoad());

if($auth->isAuth()){
    $router->get('/','home','home')
    ->get('/filtre','RESTAPI/Filtre/GetUserFilter','filtre')
    ->get('/src/[*:a]/[*:t]/[*:i]','src','src')
    ->get('/watch/[*:i]','watch','watch')
    ->get('/photos/src?[*:i]','photos','photos')
    ->get('/confirm','confirm','confirm')
    ->get('/[*:id]','RESTAPI/Users/profile','profile')
    ->get('/404','error/404','erreur')
    ->run();
}elseif(!$auth->isAuth()){ 
    $router->get('/','admin','admin')
    ->get('/login','login','login')
    ->get('/register','register','register')
    ->get('/forgotten','RESTAPI/Auth/forgotten','forgotten')
    ->get('/reset-password','RESTAPI/Auth/reset','reset')
    ->get('/404','error/404','erreur')
    ->run();
}

