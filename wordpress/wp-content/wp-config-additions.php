// Enable REST API
define('REST_API_ENABLED', true);

// Enable debugging
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

// Allow REST API to return more than 10 items
@ini_set('memory_limit', '256M');
define('WP_MEMORY_LIMIT', '256M');

// JWT Authentication (optional, for secured endpoints)
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
