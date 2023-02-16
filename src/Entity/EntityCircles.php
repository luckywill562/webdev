<?php
namespace Src\Entity;
use Src\App\Entity\Entity;
class EntityCircles extends Entity{
    
    public function getSubjectArray(){
        return [
            'subject'=>[
                'title'=> $this->title,
                'content'=> $this->app->Table('menu')->ParseLigne($this->app->EmojiLoad()->shortnameToImage($this->app->EmojiLoad()->toShort($this->app->Table('menu')->parseTwit($this->content)))),
                'element_id'=> $this->subject_id
            ],
            'author' => [
                'name'=>ucfirst($this->name),
                'avatar'=>$this->app->src($this->avatar,52,'iup'),
                'username'=>$this->username,
            ],
             
             'statistiques'=>[
                'created_date'=> $this->app->ConvertTime($this->subjectcreatedAt)
             ],
             'responses' =>[]
        ];
    }
}