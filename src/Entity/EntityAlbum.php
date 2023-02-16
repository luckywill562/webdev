<?php
namespace Src\Entity;
use Src\App\Entity\Entity;
class EntityAlbum extends Entity{
    public function getArrayViews($variable){
        $array =  [
            'album_id' => $this->Aid,  
        ];
        return $array +$variable;
    }
    public function getAblumArray(){
        $media = $this->app->Table('album')->getMaxIdPhotoAlbum($this->Aid);
        if($media->media_type === 'video'){
            $media_name = explode(".", $media->media_name);
            $imageUrl = $this->app->src($media_name[0].'.png',210,'thumbnail');
        }elseif($media->media_type === 'image' || $media->media_type === null){
            $imageUrl = $this->app->src($media->media_name,210,'media');
        }elseif(!$media){
            $imageUrl = '/test';
        }

        if($media->montant >0 && !$this->app->Table('file')->GetMediaPayment($media->media_name,$this->app->session_id(),'A')){
            $autorised = false;
        }else{
            $autorised = true;
        }
        return $this->getArrayViews([
            'media_id' => $media->id,
            'price'=> $this->app->format($this->app->Table('transaction')->CalculPrice((int)$media->montant, $this->creator_id,$this->app->session_id())),
            'media_type' => $media->media_type,
            'image_url' => $imageUrl,
            'mediacount' => $this->app->Table('album')->CountPhotosInAlbum($media->element_id)->count,
            'autorised' => $autorised,
            'has_open'=>boolval($this->app->Table('file')->GetMediaPayment($media->media_name,$this->app->session_id(),'A'))
        ]);
        
    }
    public function getVideosArray(){
        return  $this->getAblumArray();
    }
}