<?php

namespace Src\App\Connexion;

use \PDO;

class Mysql{
	
	private $db_name;
	private $db_host;
	private $db_user;
	private $db_pass;
	private $pdo;

	public function __construct($db_name,$db_host,$db_user,$db_pass){	
		$this->db_name = $db_name;
		$this->db_host = $db_host;
		$this->db_user = $db_user;
		$this->db_pass = $db_pass;
	}
	
	public function dbCnx(){
		if($this->pdo === null){
			try {
				$pdo = new PDO('mysql:dbname='.$this->db_name.';host='.$this->db_host.'',$this->db_user,$this->db_pass);
				$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$this->pdo = $pdo;
			} catch (\Throwable $th) {
				throw $th;
			}
		}
		return $this->pdo;		
	}

	public function Sqlquery($statement, $class_name = null, $one = false){
		$req = $this->dbCnx()->query($statement);
		if(
		strpos($statement, 'UPDATE') === 0 ||
		strpos($statement, 'INSERT') === 0 ||
		strpos($statement, 'DELETE') === 0
		){
			return $req;
		}
		if($class_name === null){
			
	    $req->setFetchMode(PDO::FETCH_OBJ);
			
		}else{
	    $req->setFetchMode(PDO::FETCH_CLASS, $class_name);
		}
		if($one){
			$datas = $req->fetch();
		}else{
			$datas = $req->fetchAll();
		}
		return $datas;
	}

	public function Sqlprepare($statement, $attributes, $class_name = null, $one= false){
		$req = $this->dbCnx()->prepare($statement);
		$res = $req->execute($attributes);
		if(
		strpos($statement, 'UPDATE') === 0 ||
		strpos($statement, 'INSERT') === 0 ||
		strpos($statement, 'DELETE') === 0
		){
			return $res;
		}
		if($class_name === null){
	        $req->setFetchMode(PDO::FETCH_OBJ);
		}else{
	        $req->setFetchMode(PDO::FETCH_CLASS, $class_name);
		}
		
		if($one){
			$datas = $req->fetch();
		}else{
			$datas = $req->fetchAll();
		}
		return $datas;
	}

	public function lastInsertId(){
		return $this->dbCnx()->lastInsertId();
	}
	
}
