<?php
namespace Src\Table;
use \Src\App\Table\Table;

class TableAlbum extends Table{

   
    public function CountViews($element_id, $element_type){
        return $this->request("SELECT COUNT(*) as count FROM views_activity WHERE element_id = ? AND element_type=?",[$element_id, $element_type],TRUE);
    }
    
    public function create_album($album_title,$creator,$security){
		$req = $this->request("INSERT INTO album SET album_title = ?, created_at = ?,creator_id=?, security =?",[$album_title,date('Y-m-d H:i:s'),$creator,$security],null,TRUE);
		if($req){
			$user = $this->request('SELECT id FROM album WHERE id = ?', [$this->db->lastInsertId()],TRUE);
			return $user;
		}
	}

    public function getComment($id){
        return $this->request("SELECT 
        media_comments.id,media_comments.comment_content,media_comments.user_id,media_comments.element_id,media_comments.date,
        $this->users 
        FROM media_comments 
        LEFT JOIN koko_users ON user_id = koko_users.id
        WHERE element_id = ? LIMIT 5",[$id], NULL);
    }

   
   //ancienne function
    public function AlbumList($user_id,$page,$limit, $security){
        if($page>0){
            $condition = "AND medias.id < $page";
        }else{
            $condition = '';
        }
        return $this->request("SELECT *,medias.id as Aid  FROM (SELECT element_id, min(medias.id) 
		AS id FROM medias WHERE author_id = $user_id AND media_apartenance = ?  GROUP BY element_id)
		AS x JOIN medias USING (element_id, id)
        LEFT JOIN album ON medias.element_id = album.id
        WHERE author_id = ?  $condition AND security <= ? ORDER BY medias.id DESC LIMIT $limit",['album',$user_id,$security]);
    }
    //nouvelle fonction get album
    public function AlbumLists($user_id,$page,$limit, $security){
        if($page>0){
            $condition = "AND id < $page";
        }else{
            $condition = '';
        }
        return $this->request("SELECT *,id as Aid  FROM album
        WHERE creator_id = ?  $condition AND security <= ? ORDER BY created_at DESC LIMIT $limit",[$user_id,$security]);
    }
    public function getMaxIdPhotoAlbum($element_id){
        return $this->request("SELECT min(id),id,media_name,createdAt,media_type,element_id,media_height,media_width,description,montant FROM medias WHERE element_id = ? AND media_apartenance = ?",[$element_id,'album'], true);
    }
    
    public function getSingleAlbum($album_id){
        return $this->request("SELECT *,$this->users ,album.id as Aid FROM album 
        LEFT JOIN koko_users ON album.creator_id = koko_users.id
        WHERE album.id = ?",[$album_id], TRUE);
    }
    public function getMedia($media_id){
       return $this->request("SELECT *,koko_users.username as username, medias.id as media_id ,
       medias.element_id  as album_id,medias.media_type, medias.media_height as height, medias.media_width as width, medias.createdAt as dateofcreation
       FROM medias
       LEFT JOIN album ON element_id = album.id
       LEFT JOIN koko_users ON album.creator_id = koko_users.id
       WHERE medias.id = ? AND media_apartenance = ?",[$media_id, 'album'],true);
    }
    
    public function getFollowingAlbum($limit,int $session){
        return $this->request("SELECT *,album.id as Aid FROM (SELECT *,min(id) 
		AS medias FROM medias WHERE media_apartenance =? GROUP BY element_id )
		AS x JOIN medias USING (element_id,id)
        LEFT JOIN album ON medias.element_id = album.id
        WHERE album.created_at > (DATE_SUB(CURDATE(), INTERVAL 100 DAY)) AND album.creator_id != $session
         ORDER BY RAND() LIMIT $limit",['album'],null);
    }
    public function CountPhotosInAlbum($album_id){
        return $this->request("SELECT COUNT(*) as count FROM medias WHERE element_id = ? AND media_apartenance = ?",[$album_id,'album'],TRUE);
    }
    public function GetUservideos($user_id,$limit,$security,$page){
		if($page>0){
            $condition = "AND id < $page";
        }else{
            $condition = '';
        }
		return $this->request("SELECT *, koko_users.name,album.id as Aid, medias.id as id FROM medias
        INNER JOIN koko_users ON author_id = koko_users.id
        LEFT JOIN album on element_id = album.id
		WHERE album.creator_id = ? AND media_type = ? AND album.security <= ? AND media_apartenance = ?
        $condition ORDER BY medias.createdAt DESC LIMIT $limit",[$user_id,'video',$security,'album']);
	}
}