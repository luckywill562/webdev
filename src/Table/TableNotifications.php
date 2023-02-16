<?php
namespace Src\Table;
use \Src\App\Table\Table;
class TableNotifications extends Table{
  /**
   * check notification si elle existe deja
   */
   public function CheckNotification($from_user,$to_user,$type){
     return $this->request("SELECT id FROM notifications WHERE to_user = ? AND from_user = ? AND notification_type = ?",[$to_user,$from_user,$type],TRUE,null);
   }
   public function GetNotification($to_user){
     return $this->request("SELECT * FROM notifications WHERE to_user = ? ORDER BY created_at DESC",[$to_user]);
   }
   public function GetNotSeenNotifications($to_user,$id){
    return $this->request("SELECT * FROM notifications WHERE to_user = ? AND seen = 0 AND id NOT IN (".$id.") ORDER BY created_at DESC",[$to_user]);
   }
  
   
  public function SelectNotificationtype1Count($user_id){
    return $this->request("SELECT COUNT(*) as count FROM notifications WHERE to_user = ? AND seen = 0",[$user_id],TRUE);
  }

  public function notificationcount($user_id){
    return $this->SelectNotificationtype1Count($user_id);
  }

  public function IfNotification($to_user,$notification_type,$element_id){
    return $this->request("SELECT id FROM notifications WHERE 
    to_user = ? AND notification_type = ? AND element_id = ?
    ",[$to_user,$notification_type,$element_id],TRUE);
  }

  public function NotificationsGroup(array $tableau = [],$app){
    if(!empty($tableau)){
      foreach ($tableau as $value) {
        $check = $this->IfNotification($value['user_id'],$value['Reason'],$value['element_id']);
        if($check){
           $this->request("DELETE  FROM notifications WHERE id = ?",[$check->id] ,TRUE);
        }
        $this->NewNotifications($tableau, $app);
      }
    }
  }
  public function DeleteNotification($to_user,$from_user, $type){
    return $this->request("DELETE FROM notifications 
    WHERE to_user = ? AND from_user = ? AND notification_type = ?",[$to_user,$from_user,$type]);
  }

  public function UpdateSingleNotificationToSeen($session_id, $notif_id){
    return $this->request("UPDATE notifications SET seen = ? WHERE to_user = ? AND id =? ", [2,$session_id,$notif_id]);
  }

  public function UpdateNotificationToSeen($to_user){
    return $this->request("UPDATE notifications SET  seen = 1
     WHERE to_user =?",[$to_user]);
  }
  public function updateLoveRequestSeen($user){
    return $this->request("UPDATE matched_users SET  seen = 1
    WHERE liked_id =?",[$user]);
  }
  public function countUserLoveRequestNotSeen($session_id){
    return $this->request("SELECT COUNT(*) as count FROM matched_users WHERE liked_id = ? AND seen = ? AND confirmed=?",[$session_id,0,0],TRUE);
  }
  public function NewNotifications(array $tableau = [],$app){
    try {
      if(!empty($tableau)){
        foreach ($tableau as $value) {
          $this->create('notifications',[
              'to_user' => $value['user_id'],          	
              'from_user' => $value['from_user_id'],
              'notification_type' => $value['Reason'],
              'created_at' =>  date('Y-m-d H:i:s'),
              'montant' => $value['montant'],
              'path' => $value['path'],
              'user' => $value['user_type'],
              'element_id'=>$value['element_id'],
              'element_type'=> $value['element_type']
            ]);
            $returnData = $app->msg(1,200,'envoie d\'une notifications'); 
          }
      }else{
        $returnData = $app->msg(0,500,'erreur'); 
      }
      } catch (\Throwable $th) {
          $returnData = $app->msg(0,500,'erreur'); 
      }
      return $returnData;
  }

  public function CountUserCommentator($post_id){
    return $this->request('SELECT COUNT(*) as count FROM comments, (SELECT MAX(id) as lastid
    FROM comments
    WHERE comments.element_id = ?
    GROUP BY CONCAT(LEAST(comments.element_id,comments.user_id))) as conversations
    WHERE id =  conversations.lastid 
    ',[$post_id],true);
  }
}