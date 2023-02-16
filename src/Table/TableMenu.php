<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TableMenu extends Table{
    /*select les utilisateur qui corespond a la recherche*/
    public function profilMatch($id,$limit,$min,$max,$genre,$session_age,$user_id){
        if($genre != 'A'){
            $genreCondition = "AND genre = '$genre'";
        }else{
            $genreCondition = "";
        }
        return $this->request("SELECT *,koko_users.id as userPid FROM koko_users
        LEFT JOIN blocked ON 
        (koko_users.id=blocked.blocked_id AND blocked.blocker_id=$user_id AND confirmed = 1 ||
        koko_users.id=blocked.blocker_id AND blocked.blocked_id = $user_id AND confirmed = 1)
        LEFT JOIN matched_users ON 
        (koko_users.id=matched_users.liked_id AND matched_users.liker_id=$user_id ||
        koko_users.id=matched_users.liker_id AND matched_users.liked_id = $user_id)
         LEFT JOIN retired_list ON koko_users.id = retired_list.user_retirer
         WHERE retired_list.user_retirer IS NULL
         AND matched_users.id IS NULL
         AND blocked.id IS NULL
          AND koko_users.id NOT IN (".$id.")
         AND koko_users.LikeBtn = 0
         AND date_of_birth >= ? AND date_of_birth <= ? 
         $genreCondition
         AND max_age_search >= ? AND min_age_search <= ? AND koko_users.id != ?
         ORDER BY RAND() LIMIT $limit",[$max,$min,$session_age,$session_age,$user_id]);
    }

    
    public function getusersmatches($username){
        return $this->request("
        SELECT * FROM koko_users WHERE username = ?
        ",[$username],TRUE);
    }

    public function ParseLigne($parse){
        return  nl2br(trim(preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $parse))); 	
	}

    public function parseTwit($str){
        $patterns = array();
        $replace = array();
        //parse URL
        preg_match_all("#([A-Za-z]+://[A-Za-z0-9-_]+.[A-Za-z0-9-_:%&amp;~?;Ã©/.=]+)#" ,$str,$urls); 
        foreach($urls[0] as $url){
           $patterns[] = $url;
           $replace[] = '<a target="_blank" href="'.$url.'">'.$url.'</a>';
        } 
        //parse hashtag
       preg_match_all("/[#]+([a-zA-Z0-9_]+)/",$str,$hashtags);
        foreach($hashtags[1] as $hashtag){
           $patterns[] = '#'.$hashtag;
           $replace[] = '<a class="PLR" target="_blank"  href="discover/'.$hashtag.'">#'.$hashtag.'</a>';
        }
       
        //parse mention
        preg_match_all("/[@]+([a-zA-Z0-9_]+)/",$str,$usernames);
        foreach($usernames[1] as $username){
            $patterns[] = '@'.$username;
            if($this->getusersmatches($username)){
               $replace[] = '<a class="PLR" target="_blank" href="'.$username.'">@'.$username.'</a>';
            }else{
                 $replace[] = '@'.$username;
            }
        }
        return str_replace($patterns,$replace,$str);
    }

    public function getRencard(){
        return $this->request("SELECT *,$this->users, rencards.id as rencard_id FROM rencards 
        LEFT JOIN koko_users ON creator_id = koko_users.id");
    }
    public function getSingleRencard($post_id){
        return $this->request("SELECT *,$this->users, rencards.id as rencard_id FROM rencards 
        LEFT JOIN koko_users ON creator_id = koko_users.id WHERE rencards.id = ?",[$post_id], TRUE);
    }
    public function UserInterested($user_id,$post_id,$confirmed){
        return $this->request("SELECT id FROM rencard_intersted WHERE interested_id = ? AND rencard_id = ? AND confirmed = ?",[$user_id,$post_id,$confirmed],TRUE);	
    }

    public function getInterestedList($post_id){
        return $this->request("SELECT *,koko_users.id as u_id FROM rencard_intersted
        JOIN koko_users ON interested_id = koko_users.id
         WHERE rencard_id = ? ", [$post_id]);
    }
    
} 