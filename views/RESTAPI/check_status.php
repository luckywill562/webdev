<?php 
if($app->IsAjax()){
    header("Content-Type: application/json; charset=UTF-8");
    $response = ['assets' => [
        'logo'=> $app->LogoSite(),
    ]];
    echo json_encode($response);
}