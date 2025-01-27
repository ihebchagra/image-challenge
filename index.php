<?php
setlocale(LC_TIME, "fr_FR.UTF8", "fr.UTF8", "fr_FR.UTF-8", "fr.UTF-8");
require_once "router.php";

if (isset($_SERVER["HTTP_HX_REQUEST"])) {
    include "pages/$route.php";
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz d'Images Bi-Hebdomadaire Par Iheb Chagra</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script defer src="/deps/alpine.js"></script>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="styles/quiz.css">
    <script defer src="/components/load_components.js"></script>
</head>

<body>
    <div id="content">
        <?php include "pages/$route.php"; ?>
    </div>
    <site-footer />
</body>

</html>
