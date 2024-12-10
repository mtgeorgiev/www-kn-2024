<?php

require_once 'bootstrap.php';

$connection  = (new Db())->getConnection();

$selectStatement = $connection->prepare("SELECT * FROM `users` WHERE `id` = ?");

$selectStatement->execute([1]);

$user1 = $selectStatement->fetch();


$selectStatement->execute([5]);

$user2 = $selectStatement->fetch();

var_dump($user1, $user2);