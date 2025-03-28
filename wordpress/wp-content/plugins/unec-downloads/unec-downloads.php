<?php
/**
 * Plugin Name: UNEC Downloads
 * Description: Custom plugin to handle downloads functionality
 * Version: 1.0
 * Author: UNEC
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register REST API endpoints
add_action('rest_api_init', function () {
    // Register route for categories
    register_rest_route('wp/v2', '/dlm_download_category', array(
        'methods' => 'GET',
        'callback' => 'get_download_categories',
        'permission_callback' => '__return_true'
    ));

    // Register route for downloads
    register_rest_route('wp/v2', '/dlm_download', array(
        'methods' => 'GET',
        'callback' => 'get_downloads',
        'permission_callback' => '__return_true'
    ));
});

// Callback for categories
function get_download_categories() {
    return array(
        array(
            'id' => 1,
            'name' => 'Lectures'
        ),
        array(
            'id' => 2,
            'name' => 'Assignments'
        ),
        array(
            'id' => 3,
            'name' => 'Study Materials'
        )
    );
}

// Callback for downloads
function get_downloads($request) {
    $category_id = $request->get_param('dlm_download_category');
    
    // Sample data - replace with actual database queries
    $downloads = array(
        array(
            'id' => 1,
            'title' => array('rendered' => 'Introduction to Economics'),
            'excerpt' => array('rendered' => 'Basic concepts of economics'),
            'download_link' => '/wp-content/uploads/2024/03/economics-intro.pdf',
            'dlm_download_category' => array(1)
        ),
        array(
            'id' => 2,
            'title' => array('rendered' => 'Mathematics Assignment 1'),
            'excerpt' => array('rendered' => 'Practice problems for calculus'),
            'download_link' => '/wp-content/uploads/2024/03/math-assignment.pdf',
            'dlm_download_category' => array(2)
        )
    );

    if ($category_id) {
        return array_filter($downloads, function($download) use ($category_id) {
            return in_array($category_id, $download['dlm_download_category']);
        });
    }

    return $downloads;
}