<?php
namespace Src\Entity;

use Src\App\Entity\Entity;

class EntityImage extends Entity
{
    public function GetMediaArray()
    {
        if ($this->media_type === 'video') {
            $dossier = 'videos';
            $media_name = explode(".", $this->media_name);
            $src = $this->app->src($media_name[0] . '.png', 'original', 'thumbnail');
        } else {
            $dossier = 'images';
            $src = $this->app->src($this->media_name, 'original', 'post');
        }
        if (file_exists($this->app->upload_path() . $dossier . SEP . $this->media_name)) {
            $exist = true;
        } else {
            $exist = false;
        }
        if (
            !$this->app->Table('file')->GetMediaPayment(
                $this->media_name,
                $this->app->session_id(),
                $this->media_apartenance
            ) && $this->montant > 0 &&
            !$this->app->Table('follows')->PremiumFollowerOnViewer($this->app->session_id(), $this->author_id)
        ) {
            $locked = true;
        } else {
            $locked = false;
        }
        $session_user_id = $this->app->session_id();
        return [
            'media_id' => $this->id,
            'exist' => $exist,
            'media' => $this->media_name ? $this->media_name : 'image',
            'media_src' => $src,
            'media_height' => $this->media_height,
            'media_width' => $this->media_width,
            'locked' => $locked,
            'media_type' => $this->media_type,
            'deblocked_by_viewer' => (bool) $this->app->Table('file')->GetMediaPayment($this->media_name, $session_user_id, $this->media_apartenance),
            'create_by_viewer' => $this->author_id == $session_user_id,
            'liked_by_viewer' => (bool) $this->app->Table('likes')->LikedByViewer($session_user_id, $this->element_id, 'media'),
            'like_counter' => $this->app->Table('likes')->countLikes($this->element_id, 'media')->count,
            'blocked' => boolval($this->montant),
            'price' => $this->app->format($this->app->Table('transaction')->CalculPrice($this->montant, $this->author_id, $session_user_id)),
            'content_type' => $this->media_apartenance,
        ];
    }
}