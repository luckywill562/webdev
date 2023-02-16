<?php
namespace Src\Entity;
use Src\App\Entity\Entity;
class EntityPosts extends Entity{
    public function getExtrait(){
        return  substr($this->contenu,0,20);
    } 
    public function getPostContentArray(){
        try {
            return [
                'post_id' => $this->post_id,
                'author_id' => $this->user_id,
                'post_content' => $this->app->Table('menu')->ParseLigne($this->app->EmojiLoad()->shortnameToUnicode($this->app->Table('menu')->parseTwit($this->contenu))) ,
                'liked_by_viewer'=> (bool)$this->app->table('likes')->LikedByViewer($this->app->session_id(),$this->post_id,'post'),
                'like_counter' => $this->app->table('likes')->countLikes($this->post_id,'post')->count,
                'comment_counter' => $this->app->table('comment')->countComments($this->post_id,'post')->count,
                'security_level' => $this->security,
                'date_of_creation' => $this->app->ConvertTime($this->date) ,
                'media_count' => $this->app->Table('image')->CountImagesPost($this->post_id)->count
            ];
        } catch (\Throwable $th) {
            $this->app->Exception($th);
        }
    }
    
}