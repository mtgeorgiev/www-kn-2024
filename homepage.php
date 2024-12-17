<?php

require_once 'bootstrap.php';

if (isset($_SESSION['username'])) {
    // user is logged in

    echo 'you are logged in as ' . $_SESSION['username'];

} else {
    header('Location: firstfile.html');
}