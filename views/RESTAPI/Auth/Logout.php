<?php 
if($app->IsAjax()){
   $auth->logout();
        echo json_encode($app->msg(1,200,'Votre compte a bien été deconnecté'));
}