<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TableMessage extends Table{

   
	/*Lister les messages*/
	public function msgList($id){
		return $this->request("SELECT * FROM (SELECT conversation_id, MAX(created_at) 
		AS created_at FROM messages GROUP BY conversation_id)
		AS x JOIN messages USING (conversation_id, created_at)
		where (sender_id = ? OR receiver_id = ?) 
		ORDER BY created_at DESC
		",[$id,$id]);
	} /*fonction no utiliser*/

	public function ListAllMessageFromUSer($myid,$page,$limit){
		if($page>0){
            $condition = "AND id < $page";
        }else{
            $condition = '';
        }
		return $this->request("SELECT messages.* FROM messages, (SELECT MAX(id) as lastid
		FROM messages
		WHERE (messages.receiver_id = ? OR messages.sender_id = ?)
		GROUP BY CONCAT(LEAST(messages.receiver_id,messages.sender_id),'.',
		GREATEST(messages.receiver_id, messages.sender_id))) as conversations
		WHERE id = conversations.lastid $condition
		ORDER BY messages.created_at DESC LIMIT $limit",[$myid,$myid],null,TRUE);
	}

	
	/*recuperer les messages entre deux utilisateur*/
	public function getAllMessageContent($session,$client){
		return $this->request("SELECT *,koko_users.id AS u_id,koko_users.avatar FROM
		(SELECT messages.id AS msg_id, messages.sender_id, messages.receiver_id,messages.created_at,messages.subject,messages.conversation_id FROM messages WHERE sender_id = ? AND receiver_id = ?  || sender_id = ? AND receiver_id = ? 
		
		ORDER BY id DESC LIMIT 10)sub
		 JOIN koko_users ON receiver_id = koko_users.id
		 ORDER BY created_at
		",[$session,$client,$client,$session]);
	}/*fonction non utiliser/
	/*compter les messages entre deux utilisateur*/
	public function CheckConversationExistence($session,$client){
		return $this->request("SELECT * FROM messages WHERE sender_id = ? AND receiver_id = ? || receiver_id = ? AND sender_id = ?",[$session,$client,$session,$client],true);
	}
	 /*test get message*/ 
	 public function getmessages($sender_id,$receiver_id){
		 return $this->request("SELECT a.username as from_username, b.username as to_username, subject,
		  receiver_id,media, sender_id ,message_status,created_at, messages.id as msg_id,messages.price,koko_users.avatar,koko_users.id as u_id,message_type as type,gift_type
		 FROM messages
		 INNER JOIN koko_users  a ON messages.sender_id = a.id 
		 INNER JOIN koko_users  b ON messages.receiver_id = b.id
		 LEFT JOIN koko_users  ON messages.receiver_id = koko_users.id
		 WHERE (messages.sender_id = ? AND messages.receiver_id = ?)
		 OR (messages.sender_id = ? AND messages.receiver_id = ?) ORDER BY messages.created_at ASC",[$sender_id, $receiver_id,$receiver_id,$sender_id]);
		}
		/*websocket function*/
		public function createNewmessage($subject,$sender_id,$receiver_id,$media,$type){
		   $req = $this->db->Sqlprepare("INSERT INTO messages SET subject = ?, receiver_id =?,sender_id=?,media = ?,created_at = ?,message_type =?",[$subject,$receiver_id,$sender_id,$media,date('Y-m-d H:i:s'),$type], null,TRUE);
		   if($req){
			   return $this->db->Sqlprepare("SELECT * FROM messages WHERE sender_id = ? AND receiver_id = ? AND id = ?",[$sender_id,$receiver_id,$this->db->lastInsertId()],null,TRUE);   
		   }
	   }
	   /*listing media*/
	   public function ListingMedia($message_id){
		   return $this->request("SELECT * FROM medias WHERE element_id = ? AND media_apartenance = ?" ,[$message_id,'message'],null,TRUE);
	   }

	   /*count all not seen message*/ 
	   public function MessagesCount($myid){
		   return $this->request("SELECT COUNT(*) as count FROM messages, (SELECT MAX(id) as lastid
		   FROM messages
		   WHERE (messages.receiver_id = ? OR messages.sender_id = ?)
		   GROUP BY CONCAT(LEAST(messages.receiver_id,messages.sender_id),'.',
		   GREATEST(messages.receiver_id, messages.sender_id))) as conversations
		   WHERE id = conversations.lastid AND message_status = 0 AND receiver_id = ?
		   ORDER BY messages.created_at DESC",[$myid,$myid,$myid],TRUE);
	   }
	   /*update message list to visited*/ 
	   public function update_list_to_visited($session_id){
		return $this->request("UPDATE messages SET message_status = 2 WHERE receiver_id = ? AND message_status = ?", [$session_id,0],TRUE);
	 }
	 /*get message from id*/ 
	 public function GetMessageFromId($message_id){
		 return $this->request('SELECT * FROM messages WHERE id = ?',[$message_id],TRUE);
	 }
	 /*cadeaux*/

	 public function Gift(){
		 return $this->request('SELECT * FROM cadeaux',null);
	 }
	 public function GetGift($id){
		 return $this->request('SELECT * FROM cadeaux WHERE id = ?',[$id],TRUE);
	 }
	 /*incognito*/
	 public function createIncognito_connexion($user_id){
		$check = $this->request('SELECT connexion_id FROM incognito_connexion WHERE user_id = ? AND client_id IS NULL',[$user_id]);
		$online = $this->request('SELECT connexion_id FROM incognito_connexion WHERE user_id = ? AND client_id IS NOT NULL',[$user_id]);
		if($check){
			return ['has_client'=>false,'has_launch'=> true];
		}elseif($online){
			return ['has_client'=>true,'has_launch'=> true];
		}else{
			$req =  $this->request('INSERT INTO incognito_connexion SET user_id = ?', [$user_id]);
			if($req){
				$this->db->Sqlprepare("SELECT connexion_id FROM incognito_connexion WHERE user_id = ? AND connexion_id = ?",[$user_id,$this->db->lastInsertId()],null,TRUE); 
				return ['has_client'=>false,'has_launch'=> true];  
			}
		}
	 }
}