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

    echo "git pull will be executed";
    'git pull';
    ?>
</body>

</html>
