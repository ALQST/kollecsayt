FROM wordpress:latest

# Copy custom configuration and content
COPY ./wordpress/wp-content /var/www/html/wp-content
COPY ./wordpress/wp-config-additions.php /var/www/html/wp-config-additions.php

# Set working directory
WORKDIR /var/www/html

# Make sure the files have correct permissions
RUN chown -R www-data:www-data /var/www/html/wp-content
RUN chmod -R 755 /var/www/html/wp-content

# Expose port 80
EXPOSE 80

# Use the default WordPress entrypoint and CMD 