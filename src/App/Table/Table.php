<?php
namespace Src\App\Table;
use \Src\App\Connexion\Connexion;

class Table{
	protected $db;
	protected $users = "koko_users.name,koko_users.username,koko_users.avatar";
	public function __construct($db){
		$this->db = $db;
		$this->image_type = "jpg|jpeg|png|mp4";
		$this->min_size = 20;
		$this->max_size = (1024*1024*3);
		$this->max_files = 10;
		$this->error = array();	
    }

    public function create($table,$fields){
		$sql_parts = [];
		$attributes = [];
		foreach($fields as $k => $v){
			$sql_parts[] = "$k = ?";
			$attributes[] = $v;
		}
		$sql_part= implode(', ', $sql_parts);
		return $this->request("INSERT INTO {$table} SET $sql_part", $attributes,TRUE);
	}
	
	public function delete($table,$fields){
		$sql_parts = [];
		$attributes = [];
		foreach($fields as $k => $v){
			$sql_parts[] = "$k = ?";
			$attributes[] = $v;
		}
		$sql_part= implode('AND ', $sql_parts);
		return $this->request("DELETE FROM {$table} WHERE $sql_part", $attributes,TRUE);
	}
    public function update($table,$id ,$fields){
		$sql_parts = [];
		$attributes = [];
		foreach($fields as $k => $v){
			$sql_parts[] = "$k = ?";
			$attributes[] = $v;
		}
		$attributes[] = $id;
		$sql_part = implode(',',$sql_parts);
		return $this->request("UPDATE  {$table} SET $sql_part WHERE id = ?", $attributes,TRUE);
	}

    public function request($statement, $attributes = null, $one = false){
		if($attributes){
            return $this->db->Sqlprepare(
            $statement,
            $attributes,
            str_replace('Table', 'Entity',get_class($this)),
            $one
           );
        }else{
            return $this->db->Sqlquery(
            $statement,
            str_replace('Table', 'Entity',get_class($this)),
            $one
           );
        }
   }
   public function lastInsertId(){
	return $this->db->lastInsertId();
   }
}