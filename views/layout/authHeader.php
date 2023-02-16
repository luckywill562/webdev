<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title;?></title>
    <?= $app->authAssets();?>
</head>
<body class="guest">
  <div id="PWA_ROOT"></div>
  <script>
    var global = global || window;
    var Buffer = Buffer || [];
    var process = process || {
      env: { DEBUG: undefined },
      version: []
    };
  </script>
</body>
</html>