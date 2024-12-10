<?php

require_once 'bootstrap.php';

$username = isset($_POST['username']) ? $_POST['username'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;

$user = new User($username, $password);
$user->validate();

$connection  = (new Db())->getConnection();
$insertStatement = $connection->prepare("INSERT INTO `users` (`username`, `password`) VALUES (:username, :password)");

$insertStatement->execute([
    'username' => $user->getUsername(),
    'password' =>$user->getPassword(),
]);



echo json_encode([
    'success' => true
]);
