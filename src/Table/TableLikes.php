<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TableLikes extends Table
{
    private $table = 'likes';
    public function countLikes(int $id,string $type){
        return $this->request("SELECT COUNT(*) as count FROM {$this->table} WHERE element_id = ? AND element_type= ?",[$id, $type],TRUE);  
    }
    public function deletePostLike($user_id,$id,$type){
        return $this->request("DELETE  FROM {$this->table} WHERE liker_id = ? AND element_id = ? AND element_type = ?",[$user_id,$id,$type] ,TRUE);
	}
    public function LikedByViewer(int $user_id,int $element_id,string $type){
        return $this->request("SELECT id FROM {$this->table} WHERE liker_id = ? AND element_id = ? AND element_type=?",[$user_id,$element_id,$type],TRUE);	
    }

    public function getLikerList(int $element_id, string $type){
		return $this->request("SELECT * FROM {$this->table} 
		INNER JOIN koko_users ON liker_id = koko_users.id
		 WHERE element_id = ? AND element_type = ?",[$element_id,$type]);
	}
    public function getType(string $type){
        $array = ['album','post','media','comment']; 
        if(in_array($type, $array)){
            return true;
        }else{
            return false;
        }
    }
}