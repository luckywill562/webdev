<?php
define('DIR', dirname(__DIR__));
require DIR . './vendor/autoload.php';
use \Src\App\Table\Table;
Src\Src::load();
$app = Src\Src::getInstance();
$auth = new Src\App\Auth\Auth($app->getDb(),$app);
$jwt = new Src\App\Auth\JwtHandler();
$emoji = new Emojione\Client(new \Emojione\Ruleset());
$router = new Src\App\Router\Router(DIR . '/views',$app,$auth,$jwt,$emoji);
$emoji->imagePathPNG = $app->domain().'emoji/';
?>