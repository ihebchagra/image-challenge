<?php
require_once 'router.php';

if (isset($_SERVER['HTTP_HX_REQUEST'])) {
    include "pages/$route.php";
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz d'Images Par Iheb Chagra</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"
        rel="stylesheet">
    <script defer src="https://unpkg.com/@alpinejs/morph@3.x.x/dist/cdn.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script defer src="/components/load_components.js"></script>
</head>

<body>
    <div id="content">
        <?php include "pages/$route.php"; ?>
    </div>
    <site-footer />
</body>

</html>