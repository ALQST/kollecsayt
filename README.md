# Next.js WordPress API Integration

This is a Next.js application that integrates with WordPress API to fetch and display content. The application uses environment variables to configure the WordPress API endpoint.

## Project Overview

This application is built with:
- Next.js for the frontend framework
- WordPress REST API for content management
- Environment variables for configuration

## Local Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```env
   WORDPRESS_API_URL=http://your-wordpress-site.com/wp-json/wp/v2
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `WORDPRESS_API_URL`: The URL of your WordPress REST API endpoint

## Hosting Requirements

For hosting providers, the following setup is required:

### WordPress Setup
1. Ensure the WordPress installation is accessible via HTTPS
2. Enable the WordPress REST API
3. Configure CORS if the frontend and WordPress are on different domains
4. Ensure the `/wp-json/wp/v2` endpoint is accessible

### Frontend Deployment
1. Set up environment variables in your hosting platform:
   - Configure `WORDPRESS_API_URL` to point to your WordPress installation
2. Build requirements:
   - Node.js version specified in `package.json`
   - Run `npm install` to install dependencies
   - Run `npm run build` to create production build
3. Start the application:
   - Use `npm start` for production deployment

### Security Considerations
1. Ensure SSL/TLS is enabled for both WordPress and Next.js applications
2. Configure appropriate CORS headers in WordPress
3. Implement rate limiting if necessary
4. Keep both WordPress and Next.js updated to latest stable versions

## Troubleshooting

- If the API connection fails, verify the `WORDPRESS_API_URL` is correctly set
- Ensure WordPress REST API is enabled and accessible
- Check CORS configuration if experiencing API connection issues

## Support

For technical issues:
1. Check the troubleshooting section
2. Review WordPress REST API documentation
3. Consult Next.js documentation for deployment-specific questions
