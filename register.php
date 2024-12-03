<?php

require_once 'bootstrap.php';

$username = isset($_POST['username']) ? $_POST['username'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;

$user = new User($username, $password);
$user->validate();

// implement the user registration here


echo json_encode([
    'success' => true
]);
