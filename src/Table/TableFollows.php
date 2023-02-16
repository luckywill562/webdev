<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TableFollows extends Table{
    public function hasFollow($session_id, $user_id,$confirmed){
        return $this->request("SELECT id,confirmed FROM followers WHERE follower_id = ? AND followed_id = ? AND confirmed = ?",[$session_id,$user_id,$confirmed],true);
    }
    public function SecurityLevel($client_id, $session_id){
        if($client_id === $session_id ){
            $security_level = 3;
        }elseif($client_id != $session_id && $this->hasFollow($session_id,$client_id,1)){
            $security_level = 2;
        }else{
            $security_level = 1;
        }
        return $security_level;
    }
    public function GetFollowerRequest(int $session_id){
        return $this->request("SELECT COUNT(*) as count FROM followers WHERE followed_id = ? AND confirmed = ?",[$session_id,0], TRUE);
    }

    public function UserPremiumOffer(int $user_id, int $degree){
        return $this->request('SELECT * FROM user_premium_offer WHERE user_id = ? AND degree = ?', [$user_id, $degree], true);
    }

    public function GetPremiumOffer(int $id){
        return $this->request("SELECT * FROM user_premium_offer WHERE id = ? ", [$id], TRUE);
    }
    public function getPremiumOffers(int $user_id){
        return $this->request('SELECT * FROM user_premium_offer WHERE user_id = ? ', [$user_id]);
    }

    public function PremiumFollowerOnViewer($follower_id, $followed_id){
        return $this->request("SELECT id FROM premium_followers WHERE follower_id = ? AND followed_id = ? AND expiredAt > DATE_SUB(NOW(), INTERVAL 0 MINUTE)",[$follower_id,$followed_id],true);
    }
    
    
    
}