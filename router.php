<?php
$allowed_routes = ['quiz', 'about'];
$request_uri = $_SERVER['REQUEST_URI'];
$path = trim(parse_url($request_uri, PHP_URL_PATH), '/');

// Bypass asset requests
if (preg_match('/\.(?:png|jpg|jpeg|gif|css|js)$/', $path)) {
    return false;  // Let the server handle the request
}

$route = $path ?: 'quiz';

if (!in_array($route, $allowed_routes)) {
    header('HTTP/1.0 404 Not Found');
    echo '404 Not Found';
    exit;
}