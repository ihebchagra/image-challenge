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
    <title>SPA Example</title>
    <script src="https://unpkg.com/htmx.org@2.0.3"></script>
    <script src="https://cdn.jsdelivr.net/npm/alpinejs-web-components/dist/cdn.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script type="module" src="/components/loading-bar.js"></script>
    <script src="components/load.js"></script>
</head>

<body>
    <loading-bar></loading-bar>
    <div>
        <nav>
            <button class="nav-button" hx-get="/home" hx-target="#content" hx-push-url="true">Home</button>
            <button class="nav-button" hx-get="/about" hx-target="#content" hx-push-url="true">About</button>
        </nav>
        <div id="content">
            <?php include "pages/$route.php"; ?>
        </div>
    </div>
</body>

</html>