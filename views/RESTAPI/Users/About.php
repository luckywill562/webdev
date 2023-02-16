<?php
header("Content-Type: application/json; charset=UTF-8");
$returnData = [];
if(!$auth->isAuth() || !isset($_POST['user_id']) || empty($_POST['user_id']) ){
    header('500 Internal Server Error', TRUE, 500);
    $returnData = $app->msg(0,500,'une erreur s\'est produite, Veuillez réessayer plus tard!');
}elseif($auth->isAuth() && isset($_POST['user_id']) && !empty($_POST['user_id'])){
    $res = $UsersTable->GetAboutUser($_POST['user_id']);
    $interestreq = $UsersTable->GetUserInterest($_POST['user_id']);
    $interest = [];
    foreach ($interestreq as $key => $value) {
        $interest[$key]['interest_img'] = $value->image;
        $interest[$key]['interest_name'] = $value->name;
    }
    
    if((int)$res->accepted_relation === 1){
        $accepted_relation = 'Amitié';
    }elseif((int)$res->accepted_relation === 2){
        $accepted_relation = 'Rélation amoureuse';
    }elseif((int)$res->accepted_relation === 3) {
        $accepted_relation = 'Toute relation possible';
    }else{
        $accepted_relation = 'non definie';
    }
    $returnData= [
        'about'=>[
            /*about user profile*/
            'me'=>[
                ['title'=> 'habite à ','content'=>'Antananarivo'],
                ['title'=>'nationalité','content'=>'malagasy'],
                ['title' =>'genre','content'=> $UsersTable->userGender($res->genre),'key'=>$res->genre],
                ['title' =>'âge','content'=>date('Y')- $res->date_of_birth],
                ['title' =>'taille','content'=> '120cm'],
                ['title' =>'poids','content'=> '90kg'],
                ['title' =>'relation accepté','content'=> $accepted_relation],
                ['title' =>'apparence','content'=> 'Taille Fine'],
                ['title' =>'orientation sexuel','content'=> 'Hétérosexuel'],
                ['title' =>'yeux','content'=>'marron' ],
                ['title'=>'situation amoureuse','content'=>'célibataire'],
                ['title'=>'cheveux','content'=>'noir'],
                ['title'=>'nombres d\'enfants' , 'content'=>0],
                ['title'=>'fumeur(se)', 'content'=>'non'],
                ['title'=>'buveur(se)', 'content'=>'non'],

                
            ],
            /*about what user need*/
            'i_need'=>[
                ['title' =>'Genre','content'=> 'F'],
                ['title' =>'Age','content'=> 24],
                ['title' =>'Taille','content'=> '120cm'],
                ['title' =>'Poids','content'=> '90kg'],
                ['title' =>'Apparence','content'=> 'Taille Fine']
            ],
            'interest'=> $interest
        ],
    ];
}
echo json_encode($returnData);