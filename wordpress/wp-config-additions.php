// Enable REST API
define('REST_API_ENABLED', true);

// Enable debugging
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Allow REST API to return more than 10 items
@ini_set('memory_limit', '256M');
define('WP_MEMORY_LIMIT', '256M');

// Set up local development URLs
define('WP_HOME','http://localhost:8000');
define('WP_SITEURL','http://localhost:8000');

// Allow CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Enable CORS for REST API
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    if (!isset($_SERVER['HTTP_ORIGIN'])) {
        return $result;
    }
    $origin = $_SERVER['HTTP_ORIGIN'];
    if (strpos($origin, 'http://localhost:3000') !== false || strpos($origin, 'http://localhost:8000') !== false) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $result;
    }
    return new WP_Error('rest_cors', 'CORS not allowed', array('status' => 403));
});

define('WP_ENVIRONMENT_TYPE', 'development');