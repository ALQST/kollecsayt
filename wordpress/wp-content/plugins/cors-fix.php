<?php
/**
 * Plugin Name: CORS and Public Access Fix
 * Description: Enable CORS and public access for the REST API
 * Version: 1.0
 * Author: Your Name
 */

// Enable CORS for all REST API requests
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://sosial-iqtisadi-kollec.onrender.com');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
        return $value;
    });
}, 15);

// Make posts publicly accessible without authentication
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    
    // If this is a request to the posts endpoint, allow it without authentication
    if (strpos($_SERVER['REQUEST_URI'], '/wp/v2/posts') !== false) {
        return true;
    }
    
    return $result;
}); 