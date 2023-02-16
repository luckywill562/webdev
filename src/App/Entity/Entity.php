<?php
namespace Src\App\Entity;
use  Src;
class Entity{
    public $app;
	public function __construct(){
        $this->app = Src\Src::getInstance();
    }
	public function __get($value){
        $method = 'get'.ucfirst($value);
        $this->$value = $this->$method();
        return $this->$value;
    }
}