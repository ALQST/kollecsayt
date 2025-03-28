<?php
/*
Plugin Name: UNEC CORS
Description: Enable CORS for Next.js frontend
Version: 1.0
Author: UNEC
*/

add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: *");
});

// Enable featured images in REST API
add_action('rest_api_init', function() {
    register_rest_field('post', 'featured_image_url', array(
        'get_callback' => function($post) {
            if (has_post_thumbnail($post['id'])) {
                $img_id = get_post_thumbnail_id($post['id']);
                $img_url = wp_get_attachment_image_src($img_id, 'full');
                return $img_url[0];
            }
            return null;
        }
    ));
});
