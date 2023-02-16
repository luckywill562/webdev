<?php
namespace Src\Table;
use \Src\App\Table\Table;
use Intervention\Image\ImageManagerStatic as Image;
class TableFile extends Table{
    public function makeimg($chemin,$file){
        return Image::make($chemin.$file);
    }

    public function intervention($file,$width,$height,$chemin){
        // open an image file
        $img = $this->makeimg($chemin,$file)
               ->orientate()
               ->fit($width,$height)
               ->interlace();
        header('Content-Type: image/jpg');
        echo $img->response('jpg');
       
    }

    public function blur($file,$size,$chemin){
        // open an image file
        if($size === 'original'){
            $img = $this->makeimg($chemin,$file)
            ->orientate()
            ->interlace()
            ->pixelate(22)->blur(50);
        }else{
            $img = $this->makeimg($chemin,$file)
                   ->orientate()
                   ->pixelate(22)
                   ->fit($size,$size)
                   ->blur(50)
                   ->interlace();
        }
        // finally we save the image as a new file
        //$img->save('bar.jpg');
        //echo $img->response('png');
        header('Content-Type: image/jpg');
        echo $img->response('jpg');
    }

    public function saveblur($file,$chemin,$type){
        // open an image file
            $img = $this->makeimg($chemin.$type.'/',$file)
            ->orientate()
            ->interlace()
            ->pixelate(30)->blur(15);
        // finally we save the image as a new file
        //echo $img->response('png');
        //header('Content-Type: image/jpg');
            $img->save($chemin.'flou/'.$file);
        //echo $img->response('jpg');
    }

    public function srcBlur($file,$size,$chemin,$type){
        $blurPath = $chemin. 'flou/';
        $file_path = $chemin . $type .'/';
        try {
            if(file_exists($blurPath.$file)){
                
                if($size === 'original'){
                    $img = $this->makeimg($blurPath,$file)
                    ->pixelate(80);
                    header('Content-Type: image/jpg');
                       echo $img->response('jpg');     
                }else{
                    $img = $this->makeimg($blurPath,$file)
                       ->orientate()
                       ->fit($size, $size)
                       ->interlace()
                       ->pixelate(80);
                       header('Content-Type: image/jpg');
                       echo $img->response('jpg');
                }
            }else{
                $this->saveblur($file,$chemin,$type); 
                if($size === 'original'){
                    $img = $this->makeimg($file_path,$file)
                    ->interlace()
                       ->orientate()
                       ->pixelate(80)->blur(10);
                       header('Content-Type: image/jpg');
                       echo $img->response('jpg');
                }else{
                    $img = $this->makeimg($file_path,$file)
                       ->orientate()
                       ->fit($size, $size)
                       ->interlace()
                       ->pixelate(80)->blur(10);
                       header('Content-Type: image/jpg');
                       echo $img->response('jpg');
                    }
                         
            }
        } catch (\Throwable $th) {
            //throw $th;
            die('error');
        }
    }

    public function srcoriginal($file,$size,$chemin){
        if($size === 'original'){
            $img = Image::make(@file_get_contents($chemin.$file))
            ->interlace()
            ->text('tafaray.com', 10, 10,function($font){
                $font->file(realpath('fonts'.DIRECTORY_SEPARATOR.'segoeui.ttf'));
                $font->color('#FFF');
                $font->size('13');
                $font->valign('top');
            });
            header('Content-type: image/jpg');
            echo $img->response('jpg',90);
        }else{
            try {
                //code...
                $img = Image::make(@file_get_contents($chemin.$file))
                ->fit($size, $size)->interlace();
                header('Content-Type: image/jpg');
                echo $img->response('jpg');
            } catch (\Throwable $th) {
                die('une erreur s\'est produite');
            }

        }
    }
    public function imageRatio($file, $size,$chemin){
        try {
            $img = Image::make(@file_get_contents($chemin.$file))
                    ->interlace()
                    ->fit($size,300);
        
                    header('Content-Type: image/jpg');
                    echo $img->response('jpg');
            /**
             * null,function($constraint){
                        $constraint->aspectRatio();
                    }
             */
        } catch (\Throwable $th) {
            //throw $th;
            die('une erreur s\'est produite');
        }
    }
    public function imageMessenger($file, $size,$chemin){
        try {
            $img = Image::make(@file_get_contents($chemin.$file))
                    ->interlace()
                    ->resize($size,null,function($constraint){
                        $constraint->aspectRatio();
                    });
        
                    header('Content-Type: image/jpg');
                    echo $img->response('jpg');
        } catch (\Throwable $th) {
            //throw $th;
            die('une erreur s\'est produite');
        }
    }
    public function GetMediaConfidentiality($media,$table){
        return $this->request("SELECT * FROM $table WHERE media_name = ?",[$media],TRUE);
    }
    public function GetMediaPayment($media,$session_id,$media_type){
        return $this->request("SELECT * FROM autorisations WHERE media_name = ? AND user_id = ?",[$media,$session_id],null,TRUE);
    }

    public function uniqId($start, $stop){
	    $alphabet = "1234567890";
	  	return substr(str_shuffle(str_repeat($alphabet, $stop)), $start ,$stop);
    }
    public function validateImage(){
		$images = $this->images();
		foreach ($images as $image)
		{
			$type = $image["type"];
			$image_type = explode("/", $type);
			$content_type = explode("|", $this->image_type);
			$size = $image["size"];
		}
			if (count($images) > $this->max_files)
			{
				$this->error = array("error_type" => "ERROR_MAX_FILES");
			
			}
			else if (!array_search($image_type[1], $content_type))
			{
				$this->error = array(
				"error_type" => "ERROR_CONTENT_TYPE", 
				"image_name" => $image["name"], 
				"image_type" => $image["type"]
				);
			
			}
			else if ($size < $this->min_size)
			{
				$this->error = array(
				"error_type" => "ERROR_MIN_SIZE", 
				"image_name" => $image["name"], 
				"image_type" => $image["size"]
				);
				
			}
			else
			{
				return true;	
			}			
		}
    public function validateImages(){
		foreach ($_FILES as $image)
		{
			$type = $image["type"];
			$image_type = explode("/", $type);
			$content_type = explode("|", $this->image_type);
			$size = $image["size"];
		}
			if (count($image) > $this->max_files)
			{
				return ['error'=>1, 'msg'=>'ERROR_MAX_FILE'];
			
			}
			else if (!array_search($image_type[1], $content_type))
			{
				return ['error'=>1, 'msg'=> "ERROR_CONTENT_TYPE"];
			
			}
			else if ($size < $this->min_size)
			{
				return ['error'=>1, "ERROR_MIN_SIZE"];
				
			}else if ($size > $this->max_size){
                return ['error'=>1, "ERROR_MAX_SIZE"];
            }
			else
			{
				return ['error'=>0, 'msg'=>'CAN_UPLOADED','payload'=>['image_type'=>$image_type[0]]];
			}			
		}
	 /*compteur images les images*/
	public function countImages(){
		foreach ($_FILES as $file){
			return count($file["name"]);	
		}
	}
    
	public function images()
	{
		$images = array();
		foreach ($_FILES as $file)
		{
			for ($x = 0; $x < count($file["name"]); $x++)
			{
                $type = $file["type"][$x];
		     	$image_type = explode("/", $type);
                 
              if($image_type[0] === "image"){
                  $image_details = getimagesize($file['tmp_name'][$x]);
                  $width = $image_details[0];
                  $height = $image_details[1];
                  $blob = file_get_contents($file['tmp_name'][$x]);
                  $file_type = $file['type'][$x];
                      $images[] = array(
                      "name" => $this->uniqId(0, 40).'.jpg', 
                      "size"=> $file["size"][$x],
                      "tmp_name" => $file["tmp_name"][$x],
                      "height" => $height,
                      "width" => $width,
                      "type" => $file["type"][$x],
                      "error" => $file["error"][$x],
                      "blob" => $blob,
                      "file_type" => $file_type,
                      );
                  }else{
                    $images[] = array(
                        "name" => $file["name"][$x], 
                        "size"=> $file["size"][$x],
                        "tmp_name" => $file["tmp_name"][$x],
                        "type" => $file["type"][$x],
                        "error" => $file["error"][$x]
                        );
                  }

              }
		}
		return $images;
	}
	
	public function saveVideos($tmp_name, $folder, $image_name)
	{
		if($this->http_stream_file(move_uploaded_file($tmp_name, $folder.$image_name)))
		{
			return TRUE;
		}
		else
		{
			return false;
		}
	}

    public function getMediaExistence($id,$table){
		return $this->request("SELECT media_name,montant,author_id FROM {$table} WHERE id = ? AND montant > 0",[$id],TRUE);
	}

    public function checkMessengerIfContentIsNotFree($media){
        return $this->request("SELECT * FROM medias
        LEFT JOIN messages ON medias.element_id = messages.id
        WHERE media_name = ? 
        ",[$media],TRUE);
    }
}
