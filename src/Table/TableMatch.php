<?php
namespace Src\Table;
use \Src\App\Table\Table;

class TableMatch extends Table{
    public $table = 'matched_users';
    public function UserLikeMe($session_id){
        return $this->request("SELECT *,koko_users.id as userPid FROM $this->table 
         LEFT JOIN  koko_users ON matched_users.liker_id = koko_users.id
         WHERE liked_id = ? AND confirmed = ?",[$session_id,0],null,TRUE);	
    }
}