FROM wordpress:latest

# Copy custom configuration and content
COPY ./wordpress/wp-content /var/www/html/wp-content
COPY ./wordpress/wp-config-additions.php /tmp/wp-config-additions.php

# Set working directory
WORKDIR /var/www/html

# Configure WordPress
RUN cat /tmp/wp-config-additions.php >> /var/www/html/wp-config.php && \
    rm /tmp/wp-config-additions.php

# Make sure the files have correct permissions
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Use the default WordPress entrypoint and CMD 