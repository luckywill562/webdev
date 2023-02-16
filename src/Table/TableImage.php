<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TableImage extends Table{
	public $users = "users.id,users.nom,users.prenom,users.username,users.avatar,users.user_status,users.time_status";
	public $table = 'medias';
 
	/*query qui verifier l'existence des element avant de faire une action*/
	public function getExistence($id){
		return $this->request("SELECT id FROM {$this->table} WHERE id = ?",[$id]);
	}
	public function CountImagesPost($post_id){
		return  $this->request("SELECT COUNT(*) as count FROM $this->table WHERE element_id = ?
	   	AND media_apartenance = ?",[$post_id,'post'],TRUE);
	}
	public function getImagesPost($post_id){
		return $this->request("SELECT * FROM $this->table
		WHERE element_id = ? AND media_apartenance = ? LIMIT 4",[$post_id, 'post']);
    }
	public function getOneImagePost($post_id){
		return $this->request("SELECT * FROM $this->table
		WHERE element_id = ?",[$post_id],TRUE);
	}
	public function getPostMedia($post_id){
	   	return $this->request("SELECT * FROM $this->table
	   	WHERE element_id IN(".$post_id.")");
	}
	public function getMessengerMedia($message_id, $media){
		return $this->request("SELECT * FROM medias WHERE element_id = ? AND id = ?",[$message_id,$media],TRUE);
	}
	
	public function createMedia($media_type){
		return $this->request("INSERT INTO medias SET media_type = ?",[$media_type],TRUE);
	}

	
	// Check if user already likes post or not
   
	  
	public function savedByViewer($user_id,$element_id,$type){
        return $this->request("SELECT id FROM saved WHERE user_id = ? AND element_id = ? AND element_type = ?",[$user_id,$element_id,$type],TRUE);	
    }
	public function deleteSaved($user_id,$element_id,$type){
        return $this->request("DELETE  FROM saved WHERE user_id = ? AND element_id = ?  AND element_type = ?",[$user_id,$element_id,$type] ,TRUE);
    }

	public function getMediaNext($id, $album_id,$apartenance){
        return $this->request("SELECT * FROM medias WHERE id = (SELECT min(id) FROM medias WHERE id > ? )AND element_id = ? AND media_apartenance=? LIMIT 1",[$id,$album_id,$apartenance], TRUE);	
    }
    public function getMediaPrev($id,$album_id,$apartenance){
        return $this->request("SELECT * FROM medias WHERE id = (SELECT max(id) FROM medias WHERE id < ?) AND element_id = ? AND media_apartenance=? LIMIT 1",[$id,$album_id,$apartenance], TRUE);
    }
	public function getAllPhotosAlbum($album_id){
        return $this->request("SELECT * FROM medias WHERE element_id = ? AND media_apartenance = ?",[$album_id,'album']);
    }
	public function getSavedElement($limit,$user,$page){
		if($page>0){
            $condition = "AND saved.id < $page";
        }else{
            $condition = '';
        }
		return $this->request("SELECT *, saved.id as saved_id,medias.element_id as album_id,medias.id as media_id FROM saved
		INNER JOIN {$this->table} ON saved.element_id = medias.id 
        WHERE saved.user_id = ? $condition ORDER BY saved.id DESC LIMIT $limit",[$user]);
    }

    public function CountUserPhotos($user_id){
        return $this->request("SELECT COUNT(*) as count FROM medias WHERE author_id = ? AND media_apartenance = ?",[$user_id,'album'],TRUE);
    }
}
