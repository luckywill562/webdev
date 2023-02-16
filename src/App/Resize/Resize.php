<?php
namespace Src\App\Resize;
  //image validation class
class Resize{
	//set image size
	public $quality = 300;
	
	function getImageExtention($imageType)
	{
		switch(strtolower($imageType)){//determine mime type
			case 'image/png': 
				return "png";
				break;
			case 'image/gif': 
				return "gif";
				break;
			case 'image/jpeg': case 'image/pjpeg': 
				return "jpg";
				break;
			case 'image/bmp': 	
				return "bmp";
				break;
			default: return "jpg";
		}
	}
	
	function resizeImage($filename,$targetPath,$imageType,$quality){
	$imageQuality=$quality;	
		
	// Get new dimensions
	list($width, $height) = getimagesize($filename);

	$new_width=$imageQuality;
	$new_height=($height/$width)*$new_width;

	// Resample
	$image_p = imagecreatetruecolor($new_width, $new_height);

	$image = $this->createImage($imageType,$filename);
	imagealphablending( $image_p, false );
	imagesavealpha( $image_p, true );
	imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

	if(imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height)){
			$this->saveImage($image_p, $targetPath, $imageType, $imageQuality);
		}
	}
	
	function saveImage($source, $destination, $image_type, $imageQuality){
		switch(strtolower($image_type)){//determine mime type
			case 'image/png': 
				imagepng($source, $destination); return true; //save png file
				break;
			case 'image/gif': 
				imagegif($source, $destination); return true; //save gif file
				break;	
			case 'image/jpeg': case 'image/pjpeg': 
				imagejpeg($source, $destination, $imageQuality); return true; //save jpeg file
				break;
			default: return false;
		}
	}
	
	function createImage($imageType,$filename){
		switch(strtolower($imageType)){//determine mime type
			case 'image/png': 
				return imagecreatefrompng($filename);
				break;
			case 'image/gif': 
				return imagecreatefromgif($filename);
				break;
			case 'image/jpeg': case 'image/pjpeg': 
				return imagecreatefromjpeg($filename);
				break;
			default: return imagecreatefromjpeg($filename);;
		}
	}
	
}