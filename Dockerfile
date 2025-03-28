FROM wordpress:latest

# Install wp-cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
    chmod +x wp-cli.phar && \
    mv wp-cli.phar /usr/local/bin/wp

# Copy custom configuration and content
COPY ./wordpress/wp-content /var/www/html/wp-content
COPY ./wordpress/wp-config-additions.php /tmp/wp-config-additions.php

# Set working directory
WORKDIR /var/www/html

# Configure WordPress and set permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Add custom Apache configuration
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copy wp-config additions to wp-config.php
RUN cat /tmp/wp-config-additions.php >> /var/www/html/wp-config.php && \
    rm /tmp/wp-config-additions.php

# Expose port 80
EXPOSE 80

# Use the default WordPress entrypoint and CMD 