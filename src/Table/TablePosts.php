<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TablePosts extends Table{
    
	
	
    /*query qui verifier l'existence des element avant de faire une action*/
	public function getPostExistence($id){
		return $this->request("SELECT id FROM posts WHERE id = ?",[$id],true);
	}

    /*query qui verifier l'existence des element avant de faire une action*/
	public function getUserExistence($id){
		return $this->request("SELECT id FROM koko_users WHERE id = ?",[$id],true);
	}
	public function uniqId($start, $stop){
	    $alphabet = "1234567890";
	  	return substr(str_shuffle(str_repeat($alphabet, $stop)), $start ,$stop);
    }
	
	public function SelectViewsUserActivity($element_id,$viewer_id,$type){
		return $this->request("SELECT id FROM views_activity WHERE element_id = ? AND viewer_id =? AND element_type =?",[$element_id,$viewer_id,$type],TRUE);
	}
	public function getAllPosts($id,$limit,$session_user_id){
        return $this->request("SELECT *, koko_users.name,posts.id as post_id FROM posts
        JOIN koko_users ON user_id = koko_users.id
        LEFT JOIN followers ON (posts.user_id = followers.followed_id AND follower_id = $session_user_id)
		WHERE (followers.follower_id = $session_user_id AND posts.user_id = followers.followed_id) IS NOT NULL
        AND  last_activity > (DATE_SUB(CURDATE(), INTERVAL 10 DAY))
		AND security <=2
		AND posts.id NOT IN (".$id.") 
		OR last_activity > (DATE_SUB(CURDATE(), INTERVAL 10 DAY))
		AND posts.id NOT IN (".$id.") AND posts.user_id = ?
		ORDER BY RAND() LIMIT $limit",[$session_user_id]);
    }
	/*get one posts with media*/ 

	public function getPost($id){
		return $this->request("SELECT *, koko_users.name, posts.id as post_id FROM posts 
		INNER JOIN koko_users ON user_id = koko_users.id 
		WHERE posts.id = ? ",[$id], TRUE);
	}
	/*get userPost*/ 
	public function GetUserPosts($user_id,$limit,$security,$page){
		if($page>0){
            $condition = "AND posts.id < $page";
        }else{
            $condition = '';
        }
		return $this->request("SELECT *, koko_users.name,posts.id as post_id FROM posts
        INNER JOIN koko_users ON user_id = koko_users.id
		WHERE user_id = ? AND security <= ?
        $condition ORDER BY date DESC LIMIT $limit",[$user_id,$security],NULL);
	}
	

	public function create_post($contenu,$creator,$security){
		$req = $this->request("INSERT INTO posts 
		SET contenu = ?, date = ?,user_id=?, security= ?, last_activity = ?",[$contenu,date('Y-m-d H:i:s'),$creator,$security,date('Y-m-d H:i:s')]);
		if($req){
			return $this->request('SELECT id FROM  posts
			 WHERE id = ? AND user_id = ? ', [$this->db->lastInsertId(),$creator],TRUE);
		}
	}
	

	public function getMedia($media_id, $element_id){
        return $this->request("SELECT *,koko_users.username as username, medias.id as media_id ,
		medias.element_id  as album_id,posts.user_id as creator_id, medias.media_height as height, medias.media_width as width, medias.createdAt as dateofcreation
        FROM medias
        LEFT JOIN posts ON medias.element_id = posts.id
        INNER JOIN koko_users ON medias.author_id = koko_users.id
        WHERE medias.id = ? AND media_apartenance = ?",[$media_id,'post'],true);
    }
	
} 