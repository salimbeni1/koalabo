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
    echo "My first PHP script!";

    $output = shell_exec("ls");
    echo "<pre>$output</pre>";

    ?>
</body>

</html>
