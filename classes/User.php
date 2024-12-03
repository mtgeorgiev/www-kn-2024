<?php

class User {

    private $username;
    private $password;

    public function __construct(?string $username, ?string $password) {
        $this->username = $username;
        $this->password = $password;
    }

    public function getUsername() {
        return $this->username;
    }

    public function validate() {

        if (!$this->username) {
            throw new ValidationException('Username is required');
        }

        if (!$this->password) {
            throw new ValidationException('Password is required');
        }
    }
}
