<?php

require_once 'bootstrap.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $username = isset($_POST['username']) ? $_POST['username'] : null;
        $password = isset($_POST['password']) ? $_POST['password'] : null;

        $user = new User($username, $password);

        $connection  = (new Db())->getConnection();
        $selectStatement = $connection->prepare("SELECT * FROM `users` WHERE `username` = :username");

        $selectStatement->execute([
            'username' => $user->getUsername(),
        ]);

        $userData = $selectStatement->fetch();

        if ($userData && password_verify($user->getPassword(), $userData['password'])) {
            // successful login
            $_SESSION['username'] = $user->getUsername();
            echo json_encode([
                'success' => true,
                'username' => $user->getUsername(),
            ]);
        } else {
            // login failed
            echo json_encode([
                'success' => false,
                'message' => 'Invalid username or password',
            ]);
        }
        break;
    case 'DELETE':
        session_destroy();
        echo json_encode([
            'success' => true,
        ]);
        break;
    case 'GET':
        if (isset($_SESSION['username'])) {
            echo json_encode([
                'success' => true,
                'username' => $_SESSION['username'],
            ]);
        } else {
            echo json_encode([
                'success' => false,
            ]);
        }
        break;
}