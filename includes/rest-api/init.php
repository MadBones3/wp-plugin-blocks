<?php 
/* 
* up_rest_api_signup_handler function is found in the signup.php
* up_rest_api_signin_handler function is found in the signin.php
*/ 

function up_rest_api_init() {
    //example.com/wp-json/up/v1/signup
    register_rest_route('up/v1', '/signup', [
        'methods'               => WP_REST_Server::CREATABLE,
        'callback'              => 'up_rest_api_signup_handler',
        'permission_callback'   => '__return_true'
    ]);
    //example.com/wp-json/up/v1/signin
    register_rest_route('up/v1', '/signin', [
        'methods'               => WP_REST_Server::EDITABLE,
        'callback'              => 'up_rest_api_signin_handler',
        'permission_callback'   => '__return_true'
    ]);
}