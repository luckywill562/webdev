<?php
namespace Src\Entity;

use Src\App\Entity\Entity;

class EntityUsers extends Entity
{
    public function GetUserArray($variable)
    {
        $UsersTable = $this->app->Table('users');
        $array = [
            'viewer' => (bool) ($this->id === $this->app->session_id()),
            'user_id' => $this->id,
            'first_name' => ucfirst($this->name),
            'user_gender' => $UsersTable->userGender($this->genre),
            'username' => htmlspecialchars($this->username),
            'people_meet_desactived' => (bool) $this->LikeBtn,
            'bio' => $this->app->Table('menu')->ParseLigne($this->app->EmojiLoad()->shortnameToImage($this->app->EmojiLoad()->toShort($this->app->Table('menu')->parseTwit($this->bio)))),
            'online' => (bool) $UsersTable->GetBlockage($this->app->session_id(), $this->id, 1) || (bool) $UsersTable->GetBlockage($this->id, $this->app->session_id(), 1) ? false : $UsersTable->checkSession($this->id),
            'private' => (bool) $this->private,
            'has_requested_follow_viewer' => (bool) $this->app->Table('follows')->hasFollow($this->id, $this->app->session_id(), 0),
            'requested_follow_by_viewer' => (bool) $this->app->Table('follows')->hasFollow($this->app->session_id(), $this->id, 0),
            'followed_by_viewer' => (bool) $this->app->Table('follows')->hasFollow($this->app->session_id(), $this->id, 1),
            'has_follow_viewer' => (bool) $this->app->Table('follows')->hasFollow($this->id, $this->app->session_id(), 1),
            'has_requested_love_viewer' => (bool) $UsersTable->getLove($this->id, $this->app->session_id(), 0),
            'requested_love_by_viewer' => (bool) $UsersTable->getLove($this->app->session_id(), $this->id, 0),
            'has_match_with_viewer' => (bool) ($UsersTable->getLove($this->app->session_id(), $this->id, 1) ||
                $UsersTable->getLove($this->id, $this->app->session_id(), 1)),
            'verified' => (bool) $this->verified,
            'has_blocked_viewer' => (bool) $UsersTable->GetBlockage($this->app->session_id(), $this->id, 1),
            'blocked_by_viewer' => (bool) $UsersTable->GetBlockage($this->id, $this->app->session_id(), 1),
            'viewer_is_premium' => (bool) $this->app->Table('Follows')->PremiumFollowerOnViewer($this->app->session_id(), $this->id),
        ];

        return $array + $variable;
    }
    public function getUserCompleteProfile()
    {
        $UsersTable = $this->app->Table('users');
        $mediaTable = $this->app->Table('image');
        return $this->GetUserArray([
            'avatar' => $this->app->src($this->avatar, 150, 'iup'),
            'content' => [
                'media' => [],
                'posts' => [],
                'followers' => [],
                'following' => [],
                'media_has_next_page' => true,
                'posts_has_next_page' => true,
                'followers_list_has_next_page' => true,
                'following_list_has_next_page' => true
            ],
            'about' => [
                /*about user profile*/
                'me' => [
                ],
                /*about what user need*/
                'i_need' => [
                ],
                'interest' => []
            ],
            'statistiques' => [
                'photos' => $mediaTable->CountUserPhotos($this->id)->count,
                'followers' => $UsersTable->CountFollowers($this->id)->followers,
                'following' => $UsersTable->CountFollowing($this->id)->following,
                'F_Request' => $UsersTable->CountRequestToFollow($this->id)->req,
            ],
        ]);
    }
    public function getUserFilter()
    {
        return $this->GetUserArray([
            'avatar' => $this->app->src($this->avatar, 256, 'iup'),
        ]);
    }
    public function getUserCompleteAvatar()
    {
        return [
            'user' => $this->GetUserArray([
                'avatar' => $this->GetUserAvatar()
            ])
        ];
    }
    public function getUserAuth()
    {
        return $this->GetUserArray([
            'avatar' => $this->GetUserAvatar(),
            'currency' => $this->devise_name,
        ]);
    }
    public function getUserAuthor()
    {
        return $this->GetUserArray([
            'avatar' => $this->GetUserAvatar()
        ]);
    }
    public function GetUserAvatar()
    {
        $path = $this->avatar;
        return [
            'small' => $this->app->src($path, 32, 'iup'),
            'medium' => $this->app->src($path, 52, 'iup'),
            'x56' => $this->app->src($path, 56, 'iup'),
            'x26' => $this->app->src($path, 26, 'iup')
        ];
    }
}