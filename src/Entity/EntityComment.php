<?php
namespace Src\Entity;

use Src\App\Entity\Entity;

class EntityComment extends Entity
{

    public function commentExtrait()
    {
        return '<span>' . substr($this->comment_content, 0, 200) . '</span>';
    }

    public function GetCommentArray($payload)
    {
        $array = [
            'response_content' => $this->app->Table('menu')->ParseLigne($this->app->Table('menu')->parseTwit($this->comment_content)),
            'discussion_id' => $this->element_id,
            'response_id' => $this->comment_id,
            'author_id' => $this->user_id,
            'author_name' => $this->name,
            'author_username' => $this->username,
            'author_avatar' => $this->app->src($this->avatar, 32, 'iup'),
            'process' => false,
            'posted_date' => $this->app->ConvertTime($this->createdAt),
            'type' => $this->comment_for,
            'reply'=>(bool) $this->reply,
        ];
        return $array + $payload;
    }
    public function GetMediaAlbumComment()
    {
        return $this->GetCommentArray([
            'type' => 'album_media',
        ]);
    }
    public function GetPostArrayComment()
    {
        return $this->GetCommentArray([
            'liked_by_viewer' => boolval($this->app->Table('likes')->LikedByViewer($this->app->session_id(), $this->comment_id, 'comment')),
            'like_count' => $this->app->Table('likes')->CountLikes($this->comment_id, "comment")->count,
            'count_response' => $this->app->Table('comment')->countCommentsResponses($this->parent_id,$this->comment_id, $this->comment_for)->count
        ]);
    }
}