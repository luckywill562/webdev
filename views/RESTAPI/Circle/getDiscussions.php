<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$app->IsAjax() || !$auth->isAuth() || !isset($_POST['group_id']) || empty($_POST['group_id'])  || !$app->getInt($_POST['group_id'])){
    http_response_code(500);
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode($app->msg(0,500,'une erreur s\'est produite'));
}elseif($app->IsAjax() && $auth->isAuth() && isset($_POST['group_id']) && !empty($_POST['group_id']) && $app->getInt($_POST['group_id'])){
    $data=[];
    try {
        if($CircleTable->checkIfUserIsMemberOfGroup($_POST['group_id'], $session_user_id)){
            foreach ($CircleTable->getDiscussions((int)$_POST['group_id']) as $key => $val) {
                $data[$key]['content'] = [
                   'subject_id'=> $val->message_id,
                   'subject'=> htmlspecialchars(nl2br($app->trim($val->subject))),
                   'sended'=> $val->conversation_author_id === $session_user_id ? true : false,
                   'message_type' => $val->message_type ? 'INFO' : 'TEXTE',
                   'texte_info' => $val->message_type === 'NEW_GROUP' ? 'créer le groupe' : '' 
                ];
                $data[$key]['author'] = $UsersTable->GetUser($val->conversation_author_id)->UserFilter;
            }
            $group = [];
            $memberList = []; 
            foreach ($CircleTable->GetCircleProfileMember($val->group_id) as $members => $member) {
                $memberList[$members]= $UsersTable->GetUser($member->user_id)->UserAuthor;
            }
            $viewersList = [];
            foreach ($CircleTable->GetViewers($val->group_id) as $viewers => $viewer) {
                $viewersList[$viewers]= $UsersTable->GetUser($viewer->user_id)->UserAuthor;
            }
            $group['group'] = [
               'members'=> $memberList,
               'group_id'=> $val->group_id,
            ];
            $group['viewers'] = $viewersList;
            $group['conversations'] = $data;
            $returnData = $app->msg(1,200,$group);
        }else{
            $returnData = $app->msg(0,422,'non autorise');
        }
            
    } catch (\Throwable $th) {
        $app->Exception($th);
    }
    echo json_encode($returnData);
}
        
                
