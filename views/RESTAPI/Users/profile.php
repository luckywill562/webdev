<?php
if ($app->IsAjax()) {
    header("Content-Type: application/json; charset=UTF-8");
    $user_id = $_POST['id'];
    try {
        if ($auth->isAuth() && isset($_POST['id']) && !empty($_POST['id'])) {
            $row = $auth->fetchUserprofil($user_id);
            http_response_code(401);
            $returnData = [
                "success" => 0,
                "status" => 401,
                "message" => "Unauthorized"
            ];
            if (
                $row != null && !(bool) $UsersTable->GetBlockage($row['id'],
                    $session_user_id, 1)
                && !(bool) $UsersTable->GetBlockage($session_user_id,
                    $row['id'], 1)
            ) {
                http_response_code(200);
                $returnData = [
                    "success" => 1,
                    "status" => 200,
                    'payload' => $UsersTable->GetUser($row['id'])->UserCompleteProfile
                ];
            }
            $UsersTable->create('profile_visited', [
                'visitor_id' => $session_user_id,
                'visited_id' => $row['id']
            ]);
        } else {
            http_response_code(401);
            $returnData = [
                "success" => 0,
                "status" => 401,
                "message" => "Unauthorized"
            ];
        }
    } catch (\Throwable $th) {
        $app->Exception($th);
    }

    echo json_encode($returnData);
}