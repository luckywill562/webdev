<?php
namespace Src\Table;
use \Src\App\Table\Table;
use \Src\App\Connexion\Connexion;
class TableUsers extends Table{
    protected $db;
    public function __construct($db){
		$this->db = $db;
    }
    // Check if user already likes post or not
    public function UserLiked($user_id,$post_id){
        return $this->request("SELECT * FROM post_votes WHERE user_id = ? AND post_id = ? AND rating_action='1' AND reaction_type='1'",[$user_id,$post_id],TRUE);	
    }

    public function deleteUserLiked($user_id,$post_id){
		return $this->request("DELETE  FROM post_votes WHERE user_id = ? AND post_id = ? AND rating_action = ? AND reaction_type='1'",[$user_id,$post_id,1] ,TRUE);
	}
    /**
     * detecter si l'utilisateur a ete liker
     */
    public function checkMatched($session_id,$client_id){
        return $this->request("SELECT id FROM matched_users 
        WHERE confirmed=1 AND liker_id = ? AND liked_id = ? 
        || liker_id = ? AND liked_id = ? AND confirmed=1",
        [$session_id,$client_id, $client_id,$session_id],TRUE);	
    }   
    public function getLove($session_id,$client_id,$payload){
        return $this->request("SELECT * FROM matched_users WHERE liker_id = ? AND liked_id = ? AND confirmed = ?",[$session_id,$client_id,$payload],TRUE);	
    }
    public function UnlikeUser($user_id,$client_id){
		return $this->request("DELETE  FROM matched_users WHERE liker_id = ? AND liked_id = ? || liker_id = ? AND liked_id = ?",[$user_id,$client_id,$client_id, $user_id] ,TRUE);
	}
    ///detecte si l'utilisateur a ete retirer
    public function userRetirer($user_retirer_id,$user_qui_retire_id){
        return $this->request("SELECT * FROM retired_list WHERE user_retirer = ? AND user_qui_retire = ?",[$user_retirer_id,$user_qui_retire_id],TRUE);
    }
    //id des utilisateurs retirer
    public function retiredList($session_id){
        return $this->request("SELECT * FROM retired_list WHERE user_qui_retire = ?",[$session_id]);
    }
    // confirm crush user//
    public function AcceptRequestCrush($session_id,$client_id){
        return $this->request("UPDATE matched_users SET confirmed = ? WHERE liker_id = ? AND liked_id =?",[1,$client_id,$session_id]);
    }
    
    /*check blocage*/
    public function GetBlockage($blocked_id, $blocker_id, $status){
        return $this->request("SELECT * FROM blocked WHERE blocked_id = ? AND blocker_id = ? AND confirmed = ?",[$blocked_id, $blocker_id, $status],TRUE);
    }
    
   
    /*user-list-contact*/

    public  function getAllContacts($id,$limit, $session_id){
        return $this->request("SELECT * FROM matched_users 
        WHERE (matched_users.liker_id = ? OR matched_users.liked_id = ?) AND confirmed = 1
         AND id NOT IN (".$id.")
           ORDER BY RAND() LIMIT $limit ",[$session_id, $session_id]);
    }
    public function suggestionsToFollow($id,$limit,$session_id){
        return $this->request("SELECT *,koko_users.id as id FROM koko_users
         LEFT JOIN followers ON   (koko_users.id=followers.followed_id AND followers.follower_id=$session_id)
        LEFT JOIN blocked ON  (koko_users.id=blocked.blocked_id AND blocked.blocker_id=$session_id AND blocked.confirmed = 1 ||
        koko_users.id=blocked.blocker_id AND blocked.blocked_id = $session_id AND blocked.confirmed = 1)
         WHERE koko_users.id != ? AND followers.id IS NULL 
         AND blocked.id IS NULL
          AND koko_users.id NOT IN (".$id.")
           ORDER BY RAND() LIMIT $limit",[$session_id]);
    }
    /*followers*/
    public function CheckFollowing($session_id,$user_id){
        return $this->request("SELECT id,confirmed FROM followers WHERE follower_id = ? AND followed_id = ?",[$session_id,$user_id],null);
    }
    /**
     * delete followers
     */
    public function deleteFollower($follower_id,$followed_id){
		return $this->request("DELETE  FROM followers WHERE follower_id = ? AND followed_id = ?",[$follower_id,$followed_id]);
	}
    /*accept Request*/ 
    public function AcceptRequest($session_id,$follower_id){
        return $this->request("UPDATE followers SET confirmed = ? WHERE follower_id = ? AND followed_id =?",[1,$follower_id,$session_id]);
    }

    public function LikedUser($liker_id,$liked_id){
        $req = $this->db->Sqlprepare("INSERT INTO matched_users SET liker_id = ?, liked_id = ?,created_at=NOW()",[$liker_id,$liked_id],null,TRUE);
        if($req){
            return $this->db->Sqlprepare('SELECT * FROM matched_users WHERE id = ? AND liker_id = ?', [$this->db->lastInsertId(),$liker_id] ,null,TRUE);     
        }
    }
    
    /*detecte les espaces non*/

    public function ParseLigne($parse){
        return  nl2br(trim(preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $parse))); 	
	}
    /*utilisateur*/
    public function GetUser($user_id){
        return $this->request("SELECT *,koko_users.id as id,taux_de_change.id as tid, taux_de_change.devise as devise_name FROM koko_users 
        LEFT JOIN taux_de_change ON  koko_users.devise = taux_de_change.id 
        WHERE koko_users.id = ?",[$user_id],TRUE);
    }
    public function userGender($gender){
        if($gender === 'F'){
            $genre = 'Femme';
        }elseif($gender === 'M'){
            $genre = 'Homme';
        }else{
            $genre = '';
        }
        return $genre;
    }
    public function GetAboutUser($user_id){
        return $this->request("SELECT koko_users.genre,koko_users.date_of_birth,koko_users.max_age_search,
        koko_users.min_age_search,koko_users.sex_search,koko_users.accepted_relation ,about_me.user_id
         FROM koko_users
        LEFT JOIN about_me ON koko_users.id = about_me.user_id 
          WHERE koko_users.id=?",[$user_id],TRUE);
    }
    public function GetUserInterest($user_id){
        return $this->request("SELECT * FROM interest_user
        LEFT JOIN interest_list ON interest_user.interest_id = interest_list.id
         WHERE user_id = ? ",[$user_id]);
    }
    public function GetUserWithDevise($user_id){
        return $this->request("SELECT *,taux_de_change.id as tid FROM koko_users 
        LEFT JOIN taux_de_change ON  koko_users.devise = taux_de_change.id 
        WHERE koko_users.id = ?",[$user_id],TRUE);
    }

    /*check if user is online*/ 

    public function checkSession($user_id){
		$row = $this->request("SELECT user_id FROM user_connexion WHERE user_id = ?",[$user_id],TRUE);
        if($row){
            return true;
        }else{
            return false;
        }
	}

    public function update_avatar($avatar,$session_id){
		return $this->request("UPDATE koko_users SET avatar = ? WHERE id = ?", [$avatar,$session_id],TRUE);
	 }
    
     /*getAllUserFollower// recupere les abonnes de l'<utilisateur></utilisateur> */
     public function GetUserFollower($id,$user_id,$session_id,$limit){
         return $this->request("SELECT *,followers.follower_id as check_id,followers.id,koko_users.name,koko_users.avatar,koko_users.username,koko_users.id as id
          FROM followers
          INNER JOIN koko_users ON followers.follower_id = koko_users.id
          LEFT JOIN blocked ON 
        (koko_users.id=blocked.blocked_id AND blocked.blocker_id=$session_id AND blocked.confirmed = 1 ||
        koko_users.id=blocked.blocker_id AND blocked.blocked_id = $session_id AND blocked.confirmed = 1)
           WHERE followed_id =? AND followers.confirmed = 1 
           AND blocked.id IS NULL
           AND follower_id NOT IN (".$id.") 
            ORDER BY RAND() LIMIT $limit",[$user_id]);
     }

     public function GetUserFollowing($id,$user_id,$session_id,$limit){
        return $this->request("SELECT *, followers.followed_id as check_id,followers.id ,koko_users.name,koko_users.avatar,koko_users.username,koko_users.id as id
         FROM followers
         INNER JOIN koko_users ON followers.followed_id = koko_users.id
         LEFT JOIN blocked ON 
        (koko_users.id=blocked.blocked_id AND blocked.blocker_id=$session_id AND blocked.confirmed = 1 ||
        koko_users.id=blocked.blocker_id AND blocked.blocked_id = $session_id AND blocked.confirmed = 1)
          WHERE follower_id =? AND followers.confirmed = 1 
          AND blocked.id IS NULL
          AND followed_id NOT IN (".$id.") 
          ORDER BY RAND() LIMIT $limit",[$user_id]);
    }
    public function RequestFollowing($id,$user_id,$limit){
        return $this->request("SELECT *,followers.follower_id as check_id,followers.id,koko_users.name,koko_users.avatar,koko_users.username,koko_users.id as id
          FROM followers LEFT JOIN koko_users ON followers.follower_id = koko_users.id
           WHERE followed_id =? AND followers.follower_id NOT IN (".$id.") 
           AND confirmed = 0 ORDER BY RAND() LIMIT $limit",[$user_id]);
    }
    public function CountFollowers($user_id){
        return $this->request("SELECT count(*) as followers FROM followers WHERE followed_id = ? AND confirmed = 1",[$user_id],TRUE);
    }
    public function CountFollowing($user_id){
        return $this->request("SELECT count(*) as following FROM followers WHERE follower_id = ? AND confirmed = 1",[$user_id],TRUE);
    }
    public function CountRequestToFollow($user_id){
        return $this->request("SELECT COUNT(*) as req from followers WHERE followed_id = ? AND confirmed = 0", [$user_id],TRUE);
    }

    public function SearchUser($q,$session_id){
        return $this->request("SELECT * FROM koko_users WHERE username LIKE '%$q%' OR koko_users.name LIKE '%$q%'  AND id != ? LIMIT 5",[$session_id]);
    }

   
} 