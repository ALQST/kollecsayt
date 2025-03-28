<?php
/**
 * Plugin Name: UNEC File Manager
 * Description: Custom plugin to handle file management with REST API support
 * Version: 1.0
 * Author: UNEC
 */

if (!defined('ABSPATH')) {
    exit;
}

// Register custom post type for files
function register_file_post_type() {
    register_post_type('unec_file', array(
        'labels' => array(
            'name' => 'Files',
            'singular_name' => 'File'
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-media-document'
    ));

    register_taxonomy('file_category', 'unec_file', array(
        'labels' => array(
            'name' => 'File Categories',
            'singular_name' => 'File Category'
        ),
        'public' => true,
        'show_in_rest' => true,
        'hierarchical' => true
    ));

    register_post_meta('unec_file', 'file_url', array(
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ));
}
add_action('init', 'register_file_post_type');

// Register REST API endpoints
add_action('rest_api_init', function () {
    register_rest_route('wp/v2', '/unec_files', array(
        'methods' => 'GET',
        'callback' => 'get_files',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wp/v2', '/file_categories', array(
        'methods' => 'GET',
        'callback' => 'get_file_categories',
        'permission_callback' => '__return_true'
    ));
});

// Callback for files endpoint
function get_files($request) {
    $args = array(
        'post_type' => 'unec_file',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    );

    $category_id = $request->get_param('category');
    if ($category_id) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'file_category',
                'field' => 'term_id',
                'terms' => $category_id
            )
        );
    }

    $posts = get_posts($args);
    $files = array();

    foreach ($posts as $post) {
        $categories = wp_get_post_terms($post->ID, 'file_category', array('fields' => 'all'));
        $file_url = get_post_meta($post->ID, 'file_url', true);

        $files[] = array(
            'id' => $post->ID,
            'title' => array('rendered' => $post->post_title),
            'excerpt' => array('rendered' => $post->post_excerpt),
            'download_link' => $file_url,
            'categories' => array_map(function($cat) {
                return array(
                    'id' => $cat->term_id,
                    'name' => $cat->name
                );
            }, $categories)
        );
    }

    return $files;
}

// Callback for categories endpoint
function get_file_categories() {
    $terms = get_terms(array(
        'taxonomy' => 'file_category',
        'hide_empty' => false
    ));

    return array_map(function($term) {
        return array(
            'id' => $term->term_id,
            'name' => $term->name
        );
    }, $terms);
}