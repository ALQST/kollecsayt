// Enable REST API and remove authentication for posts
define('REST_API_ENABLED', true);
define('JWT_AUTH_CORS_ENABLE', true);

// Allow public access to REST API
define('WP_ENVIRONMENT_TYPE', 'production'); 