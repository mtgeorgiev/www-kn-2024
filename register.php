<?php

require_once 'bootstrap.php';

$username = isset($_POST['username']) ? $_POST['username'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;

$user = new User($username, $password);
$user->validate();

$connection  = (new Db())->getConnection();
$insertStatement = $connection->prepare("INSERT INTO `users` (`username`, `password`) VALUES (:username, :password)");

$hashedPassword = password_hash($user->getPassword(), PASSWORD_DEFAULT);

$insertStatement->execute([
    'username' => $user->getUsername(),
    'password' => $hashedPassword,
]);

$id = $connection->lastInsertId();

echo json_encode([
    'success' => true,
    'id' => $id,
]);
