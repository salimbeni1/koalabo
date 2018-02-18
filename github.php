<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="">
</head>

<body>
    <script src=""></script>
    <?php

    $output = shell_exec("ls");
    echo "<pre>$output</pre>";

    $old_path = getcwd();
    echo "old_path :  $old_path";
    //chdir('/my/path/');
    //$output = shell_exec('');
    //chdir($old_path);

    echo "git pull will be executed";
    'git pull';
    ?>
</body>

</html>
