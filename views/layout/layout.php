<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Reseau social de rencontre">
    <title><?= $app->title;?></title>
    <?= $app->reactdevassets();?>
</head>
<body>
    <div id="PWA_ROOT"></div>
    <?php if($app->IsAjax()){
      echo $pagecontenu;
    } 
    ?>
    <script>
    var global = global || window;
    var Buffer = Buffer || [];
    var process = process || {
      env: { DEBUG: undefined },
      version: []
    };

  </script>
     <?= $app->dependenciesapp();?>
     <?= $app->homeassets('main');?>
</body>
</html>