<?php
$file = $match['params']['i'];
$sizelist = array('x256', 'x150', 'x210', 'x52', 'x32', 'x56', 'x26', 'x16', 'xoriginal');
$dossier = array('iup', 'iuu', 'post', 'mmedia', 'media', 'emoji', 'thumbnail', 'largethumb', 'icon');
if (
    isset($match['params']['a']) && isset($match['params']['t'])
    && in_array($match['params']['a'], $sizelist) && in_array($match['params']['t'], $dossier)
) {
    $ssize = $match['params']['a'];
    $type = $match['params']['t'];
    $chemin = '';
    $size = substr($ssize, 1);
    if ($type === 'iup' || $type === 'avatar') {
        $chemin = $file_path . 'avatar' . SEP;
        $height = $size;
    } elseif ($type === 'media') {
        $chemin = $file_path . 'images' . SEP;
        $height = $size;
    } elseif ($type === 'post') {
        $chemin = $file_path . 'images' . SEP;
        $height = $size;
    } elseif ($type === 'mmedia') {
        $chemin = $file_path . 'images' . SEP;
        $height = $size;
    } elseif ($type === 'thumbnail' || $type === 'largethumb') {
        $chemin = $file_path . 'thumbnail' . SEP;
        $height = $size;
    } elseif ($type === 'emoji') {
        $height = $size;
        $chemin = 'public/emoji/';
    }
    if ($type === 'media') {
        $table = 'medias';
        $media_type = 'album';
    } else if ($type === 'post') {
        $table = 'medias';
        $media_type = 'post';
    } else if ($type === 'icon') {
        $chemin = 'web/img/';
    } else {
        $table = 'medias';
        $media_type = 'AVATAR';
    }
    if ($file != "safe.jpg" && $type != 'iup') {
        if ($type === 'media' || $type === 'post') {
            $confident = $fileTable->GetMediaConfidentiality($file, $table);

            $payment = $fileTable->GetMediaPayment($file, $session_user_id, $media_type);
            $premium = (bool) $followerTable->PremiumFollowerOnViewer($session_user_id, $confident->author_id);

            if (
                $type === 'media' && (int) $confident->montant === 0 || $confident->montant > 0 && $payment || $confident->montant > 0 && $premium
                || $confident->montant > 0 && $confident->author_id === $session_user_id
            ) {
                $fileTable->srcoriginal($file, $size, $chemin);
            } elseif ($type === 'media' && (int) $confident->montant > 0 && !$payment && $confident->author_id != $session_user_id) {
                /* $fileTable->blur($file,$size,$chemin);*/
                $fileTable->srcoriginal('blocked.jpg', $size, $file_path . 'safe/', 'album');
            } elseif (
                $type === 'post' && (int) $confident->montant === 0 || $confident->montant > 0 && $payment || $confident->montant > 0 && $premium
                || $confident->montant > 0 && $confident->author_id === $session_user_id
            ) {
                //si l'image n'est pas payment
                $fileTable->srcoriginal($file, $size, $chemin);
            } elseif ($type === 'post' && (int) $confident->montant > 0 && !$payment && $confident->author_id != $session_user_id && !$premium) {
                // $fileTable->srcBlur($file,$size,$file_path,'posts');
                //$fileTable->blur($file,$size,$chemin);
                //si l'image est payant et c'est un client qui regarde
                $fileTable->srcoriginal('blocked.jpg', $size, $file_path . 'safe/', 'album');
            }
        } elseif ($type === 'thumbnail') {
            $fileTable->srcoriginal($file, $size, $chemin);
        } elseif ($type === 'mmedia') {
            $check = $fileTable->checkMessengerIfContentIsNotFree($file);
            if ($check->price > 0 && $check->author_id != $session_user_id) {
                if ($size === 'original') {
                    $fileTable->srcoriginal('blocked.jpg', $size, $file_path . 'safe/', 'album');
                } else {
                    $fileTable->blur($file, $size, $chemin);
                }
            } else {
                $fileTable->imageMessenger($file, $size, $chemin);
            }
        } elseif ($type === 'largethumb') {
            $fileTable->imageRatio($file, $size, $chemin);
        } elseif ($type === 'icon') {
            $fileTable->srcoriginal($file, $size, $chemin);
        }

    } elseif ($type === 'avatar' || $type === 'iup') {
        if (file_exists($file_path . 'avatar' . SEP . $file)) {
            $fileTable->srcoriginal($file, $size, $chemin);
        } else {
            $fileTable->srcoriginal('default.jpg', $size, $chemin);
        }
    } else {
        $fileTable->srcoriginal($file, $size, $chemin);
    }
}