<?php
namespace Src\App\Auth;
use \PDO;

class Auth extends JwtHandler{
	protected $db;
	protected $token;
    public $app;
    public $jwt;
	public function __construct($db,$app, $jwt){
		parent::__construct();
		$this->db = $db;
        $this->app = $app;
        $this->jwt = $jwt;
    }
    public function uniqId($start, $stop){
	    $alphabel = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
	  	return substr(str_shuffle(str_repeat($alphabel, $stop)), $start ,$stop);
	  }

	public function loginVerification($domain,$email,$password){
       
		try{
            $fetch_user_by_email = "SELECT * FROM `koko_users` WHERE `email`=:email";
            $query_stmt = $this->db->dbCnx()->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $query_stmt->execute();
            
            // IF THE USER IS FOUNDED BY EMAIL
            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row['password']);
                
                // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
                // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
                if($check_password):
                    $token = $this->jwt->_jwt_encode_data(
                        $domain,array("user_id"=> $row['id'])
                    );
                    setcookie('s_id',$row['id'], time() + 60*60*24*7);
                    setcookie('isLogedin',$token, time() + 60*60*24*7);
                    $remember_token = $this->uniqId(0, 60); 
                    $this->db->Sqlprepare('UPDATE koko_users SET remember_token = ? WHERE id = ?',[$remember_token,$row['id']]);
                    setcookie('security-token',$row['id'] .'=='. $remember_token. sha1($row['id']. 'zaraoapptoken'), time() + 60 * 60 *24 *7);
                    
                    $returnData = [
                        'success' => 1,
                        'message' => 'You have successfully logged in.',
                        'token' => $token
                    ];
					return $returnData;
                // IF INVALID PASSWORD
                else:
                    return $this->app->msg(0,422,'Le mot de passe que vous avez entrez n\'est pas valide!');
                endif;

            // IF THE USER IS NOT FOUNDED BY EMAIL THEN SHOW THE FOLLOWING ERROR
            else:
                return $this->app->msg(0,422,'L\'adresse email que vous avez entrer n\'est pas valide!');

            endif;
        }
        catch(\PDOException $e){
           return $this->app->msg(0,500,$e->getMessage());
        }
	}
    public function logout(){
        setcookie('isLogedin',NULL, -1);
        setcookie('s_id',NULL, -1);
        setcookie('security-token',null, -1);
        unset($_SESSION);
    }
    public function userVerification($domain,$email,$password,$jwt){
		try{
            $fetch_user_by_email = "SELECT * FROM `koko_users` WHERE `email`=:email";
            $query_stmt = $this->db->dbCnx()->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $query_stmt->execute();

            // IF THE USER IS FOUNDED BY EMAIL
            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row['password']);

                // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
                // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
                if($check_password):
                    $token = $jwt->_jwt_encode_data(
                        $domain,array("user_id"=> $row['id'])
                    );
                    
                    $returnData = [
                        'success' => 1,
                        'status' => 200,
                        'message' => 'Vous êtes en ligne.',
                        'token' => $token
                    ];
					return $returnData;
                // IF INVALID PASSWORD
                else:
                    return $this->app->msg(0,422,'Le mot de passe que vous avez entrez n\'est pas valide!');
                endif;

            // IF THE USER IS NOT FOUNDED BY EMAIL THEN SHOW THE FOLLOWING ERROR
            else:
               return $this->app->msg(0,422,'L\'adresse email que vous avez entrer n\'est pas valide!');
            endif;
        }
        catch(\PDOException $e){
           return $this->app->msg(0,500,$e->getMessage());
        }
	}


    public function newAuth($islogedin,$s_id){
        if(isset($islogedin) && !empty($islogedin) && isset($s_id) && !empty($s_id)):
            $this->token = ['bearer',$islogedin];
            if(isset($this->token[1]) && !empty(trim($this->token[1]))):   
                $data = $this->_jwt_decode_data($this->token[1]);
               
                if(isset($data['auth']) && isset($data['data']->user_id) && $data['auth'] && (int)$data['data']->user_id === $s_id):
                    return true;
                else:
                    return false;

                endif; // End of isset($this->token[1]) && !empty(trim($this->token[1]))
            
            else:
                return null;

            endif;// End of isset($this->token[1]) && !empty(trim($this->token[1]))

        else:
            return null;

        endif;
    }
	
	public function isAuth(){
        if(isset($_COOKIE['isLogedin']) && !empty($_COOKIE['isLogedin']) && isset($_COOKIE['s_id']) && !empty($_COOKIE['s_id'])):
            $this->token = ['bearer',$_COOKIE['isLogedin']];
            if(isset($this->token[1]) && !empty(trim($this->token[1]))):   
                $data = $this->_jwt_decode_data($this->token[1]);
                if(isset($data['auth']) && isset($data['data']->user_id) && $data['auth']):
                    if($data['data']->user_id === $_COOKIE['s_id']):
                    return true;
                    else:
                       return false;
                     endif;
                else:
                    $this->logout();
                    return null;

                endif; // End of isset($this->token[1]) && !empty(trim($this->token[1]))
            
            else:
                return null;

            endif;// End of isset($this->token[1]) && !empty(trim($this->token[1]))

        else:
            $this->logout();
        endif;
    }

    public function reconnect_from_coockie($reload){
		if(!$this->isAuth() && isset($_COOKIE['security-token'])){
			$remember_token = $_COOKIE['security-token'];
			$parts= explode('==', $remember_token);
			$user_id = $parts[0];
			$user = $this->db->Sqlprepare('SELECT * FROM koko_users WHERE id = ?',[$user_id],null,TRUE);
			$expected = $user_id .'=='. $user->remember_token. sha1($user_id. 'zaraoapptoken');
			if($user){
				if($expected == $remember_token){
                    $token = $this->jwt->_jwt_encode_data(
                        $this->app->domain(),array("user_id"=> $user_id)
                    );
                    setcookie('s_id',$user_id, time() + 60*60*24*7);
                    setcookie('isLogedin',$token, time() + 60*60*24*7);
                    setcookie('security-token',$remember_token, time() + 60*60*24*7);
                    if($reload){
                        header("location: /");
                    }
                    return true;
				}else{
					setcookie('security-token',null, -1);
                    return false;
				}
			}else{
				 $this->logout();
                 return false;
			}
		}
	}
    public function fetchUserprofil($user_id){
        try{
            $fetch_user_by_id = "SELECT * FROM `koko_users` WHERE `username`=:id";
            $query_stmt = $this->db->dbCnx()->prepare($fetch_user_by_id);
            $query_stmt->bindValue(':id', $user_id);
            $query_stmt->execute();
            if($query_stmt->rowCount()):
               return $query_stmt->fetch(PDO::FETCH_ASSOC);
            else:
                return null;
            endif;
        }
        catch(\PDOException $e){
            return null;
        }
    }
   
    
    /*check email if exist on register*/

    public function CheckEmail($email){
        try{
            $check_email = "SELECT `email`,`id` FROM `koko_users` WHERE `email`=:email";
            $check_email_stmt = $this->db->dbCnx()->prepare($check_email);
            $check_email_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $check_email_stmt->execute();
            if($check_email_stmt->rowCount()):
                return $check_email_stmt->fetch(PDO::FETCH_OBJ);
            endif;
        }
        catch(\PDOException $e){
            return $e->getMessage();
        }
    }

    public function Checkusernane($username){
        try{
            $check_email = "SELECT `username` FROM `koko_users` WHERE `username`=:username";
            $check_email_stmt = $this->db->dbCnx()->prepare($check_email);
            $check_email_stmt->bindValue(':username', $username,PDO::PARAM_STR);
            $check_email_stmt->execute();
            $returnData = $check_email_stmt->rowCount();
        }
        catch(\PDOException $e){
            $returnData = $e->getMessage();
        }
        return $returnData;
    }
    public function update_reset_token($email){   
        $token =   $this->uniqid(0,60);
        $user_id = $this->CheckEmail($email)->id;
        $req = $this->db->dbCnx()->prepare("UPDATE `koko_users` SET reset_token = ?,resetAt =NOW() WHERE id =? ");
        $req->execute([$token,$user_id ]);
        //mail($email,"Cliquer ici pour réinitialiser votre compte tafary","http://www.tafaray.com/reset-password?user_id={$user_id}&reset_token={$token}");
    }
    public function ResetAccount($user_id, $reset_token){
        $stmt = $this->db->dbCnx()->prepare("SELECT * FROM `koko_users` WHERE id =? AND reset_token = ? AND resetAt > DATE_SUB(NOW(), INTERVAL 10 MINUTE)");
        $stmt->execute([$user_id, $reset_token]);
        $user = $stmt->Fetch();
        if($user){
            return true;
        }else{
            return false;
        }
    }

}
