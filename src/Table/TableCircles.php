<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TableCircles extends Table{
    private $table = 'groups';
    /*create new circle*/
    public function create_new_cirlce(string $name,int $creator){
		$req = $this->request("INSERT INTO $this->table
		SET group_name= ?, creator_id = ?, createdAt = ?",[$name,$creator,date('Y-m-d H:i:s')],null,TRUE);
		if($req){
			$group =  $this->request("SELECT * FROM  $this->table WHERE group_id = ? AND creator_id = ? ", [$this->db->lastInsertId(),$creator],TRUE);	
            $this->request("INSERT INTO group_conversations 
		 SET group_id = ?, conversation_author_id = ?, subject = ? , createdAt = ?, message_type= ?",[$group->group_id, $creator, '', date('Y-m-d H:i:s'),'NEW_GROUP']);
            $this->request("INSERT INTO group_member SET group_id = ?, createdAt = ? , user_id=?",[$group->group_id,date('Y-m-d H:i:s'), $creator ]);
            return $group;
		}
	}
    /*select user circle*/
    public function Mycircle($user){
        return $this->request("SELECT group_conversations.*,group_conversations.createdAt as conversationAt, groups.*, group_member.* FROM group_conversations,
        (SELECT MAX(id) as lastid, group_id ,conversation_author_id
         FROM group_conversations GROUP BY group_id) as group_discussions 
         INNER JOIN groups ON group_discussions.group_id = groups.group_id
         INNER JOIN group_member ON (groups.group_id = group_member.group_id AND group_member.user_id = ?)
         WHERE group_conversations.id = group_discussions.lastid
         ORDER BY group_conversations.createdAt DESC
        ",[$user],null, TRUE);
    }
    /*get one circle*/
    public function circle($circle_id){
        return $this->request("SELECT * FROM $this->table WHERE group_id = ?",[$circle_id],null,TRUE);
    }
    /*new subject */
  
    public function getDiscussions($circle_id){
        return $this->request("SELECT *, koko_users.name , group_conversations.id as message_id, group_conversations.group_id FROM group_conversations
        LEFT JOIN koko_users ON conversation_author_id = koko_users.id  
        INNER JOIN groups ON group_conversations.group_id = groups.group_id
        WHERE group_conversations.group_id =?",[$circle_id],null,TRUE);
    }
    /*check if user is member */
    public function checkIfUserIsMemberOfGroup($circle_id, $user_id){
        return $this->request("SELECT group_member.* FROM group_member
        INNER JOIN groups ON group_member.group_id = groups.group_id 
         WHERE group_member.group_id = ? AND group_member.user_id = ?",[$circle_id, $user_id], null, TRUE);
    }
    public function GetCircleProfileMember($circle_id){
        return $this->request("SELECT * FROM group_member 
        INNER JOIN koko_users ON user_id = koko_users.id WHERE group_id = ? 
        ORDER BY RAND() LIMIT 3", [$circle_id],null, TRUE);
    }
    public function addMember(array $newmembers, int $group_id){
        foreach ($newmembers as $value) {
            return $this->request("INSERT INTO group_member SET group_id = ?, createdAt = ? , user_id=?",[$group_id,date('Y-m-d H:i:s'), $value['user_id'] ]);
        }
    }
    /** 
     * message viewers
     */
    public function GetViewers($group_id){
       return $this->request("SELECT * FROM group_member, 
       (SELECT MAX(id) as lastid, group_id ,conversation_author_id,createdAt
        FROM group_conversations WHERE group_id =?) as group_discussions 
        WHERE group_member.seenAt > group_discussions.createdAt AND group_member.group_id = ?",[$group_id,$group_id],null,TRUE);
    }

}