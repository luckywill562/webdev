<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TableComment extends Table{
    private $table = 'comments';
    public function getComment(int $element_id,int $parent_id,int $limit,int $page,string $type, bool $reply){
        if($page>0){
            $condition = "AND {$this->table}.id < {$page}";
        }else{
            $condition = '';
        }
        return $this->request("SELECT 
        {$this->table}.id as comment_id,{$this->table}.content as comment_content,{$this->table}.user_id,{$this->table}.element_id as element_id,{$this->table}.createdAt,
        {$this->table}.comment_for,parent_id,reply, $this->users 
        FROM {$this->table} 
        INNER JOIN koko_users ON user_id = koko_users.id
        WHERE element_id = ? AND parent_id = ? AND comment_for = ? AND reply = ? $condition ORDER BY createdAt DESC LIMIT $limit",[$element_id,$parent_id,$type,$reply], NULL);
    }

    public function singleComment(int $id,string $type){
        return $this->request("SELECT
        {$this->table}.id as comment_id,{$this->table}.content as comment_content,{$this->table}.user_id,{$this->table}.element_id as element_id,{$this->table}.createdAt,
        {$this->table}.comment_for,parent_id,reply, $this->users 
         FROM {$this->table}
        INNER JOIN koko_users ON user_id = koko_users.id
        WHERE {$this->table}.id = ? AND comment_for = ? ",[$id,$type],TRUE);
    }
    public function createComment(string $contenu,int $creator,int $element_id,int $parent_id,string $type, $reply){
		$req = $this->request("INSERT INTO $this->table
		SET content = ?, user_id=? , element_id=?, parent_id = ?,comment_for =?, reply=?,createdAt = ?",
        [$contenu,$creator,$element_id,$parent_id,$type,$reply,date('Y-m-d H:i:s')],TRUE);
		if($req){
			return $this->request("SELECT *,$this->users,comments.id as comment_id,content as comment_content FROM comments 
            INNER JOIN koko_users ON user_id = koko_users.id
            WHERE comments.id = ? AND user_id = ? ", [$this->db->lastInsertId(),$creator],TRUE);	
		}
	}
    public function CountLikes($comment_id, $element_type){
        return $this->request("SELECT COUNT(*) as count FROM comment_likes WHERE comment_id = ? AND element_type = ?",[$comment_id, $element_type], TRUE);
    }

    public function Liked_by_viewer($user_id,$comment_id,$type){
        return $this->request("SELECT * FROM comment_likes WHERE user_id = ? AND comment_id = ? AND element_type = ?",[$user_id,$comment_id, $type],TRUE);	
    }

    public function countComments(int $id,string $type){
        return $this->request("SELECT COUNT(*) as count FROM {$this->table} WHERE element_id = ? AND comment_for = ?",[$id,$type],TRUE);  
    }
    public function countCommentsResponses(int $id, int $parent_id,string $type){
        return $this->request("SELECT COUNT(*) as count FROM {$this->table} WHERE element_id = ? AND parent_id = ? AND comment_for = ? AND reply = ?",[$id,$parent_id,$type, true],TRUE);  
    }
    public function getType(string $type){
        $array = ['album','post','album_media','post_media']; 
        if(in_array($type, $array)){
            return true;
        }else{
            return false;
        }
    }
    public function CheckCommentExistance($id){
        return $this->request("SELECT id FROM {$this->table} WHERE id =?", [$id], true);
    }
}