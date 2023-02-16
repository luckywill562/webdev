<?php
header("Content-Type: application/json; charset=UTF-8");
if(!$auth->isAuth() || !isset($_POST['image']) || empty($_POST['image'])){
    header('500 Internal Server Error', TRUE, 500);
    echo json_encode(['success' => 0]);
}elseif($auth->isAuth() AND isset($_POST['image']) AND !empty($_POST['image'])){
    $imgClass = new Src\App\Resize\Resize;
    $imageData = $_POST["image"];
    $image_array_1 = explode(";", $imageData);
    $image_array_2 = explode(",", $image_array_1[1]);
    $data = base64_decode($image_array_2[1]);
        //get image type
    $typePosition  = strpos($imageData, ';');
    $imageType = explode(':', substr($imageData, 0, $typePosition))[1];
    $imageExt = $imgClass->getImageExtention($imageType);
    $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
    $imageData = str_replace('data:image/png;base64,', '', $imageData);
    $imageData = str_replace('data:image/gif;base64,', '', $imageData);
    $imageData = str_replace('data:image/bmp;base64,', '', $imageData);
    $imageData = str_replace('data:image/tiff;base64,', '', $imageData);
    $imageName =  uniqid().'.jpg';
    $data = base64_decode($imageData);
    $file = $file_path.'avatar/'.$imageName;
    if($file){
        $UsersTable->update_avatar($imageName,$session_user_id);
    }
    $success = file_put_contents($file, $data);
    echo json_encode(['success' => 1]);
}
