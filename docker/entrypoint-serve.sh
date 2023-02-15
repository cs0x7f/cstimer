#!/bin/bash
#

set -e

[[ -f '/.dockerenv' ]] || {
    echo "ERROR: This script is intended to run inside docker container as entrypoint, don't run it manually!!!"
    exit 1
}

# enable Apache SSL module
ln -s /etc/apache2/mods-available/ssl.load /etc/apache2/mods-enabled/ssl.load
# enable SSL site configuration
ln -s /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-enabled/default-ssl.conf

# Generate if not provided and install SSL certs
[[ -f '/mnt/docker/localhost-crt.pem' && -f '/mnt/docker/localhost-key.pem' ]] || {
    openssl req -nodes -x509 -newkey rsa:4096 \
            -subj "/CN=localhost" \
            -keyout /mnt/docker/localhost-key.pem \
            -out /mnt/docker/localhost-crt.pem \
            -sha256 -days 365
}
ln -s /mnt/docker/localhost-crt.pem /etc/ssl/certs/ssl-cert-snakeoil.pem
ln -s /mnt/docker/localhost-key.pem /etc/ssl/private/ssl-cert-snakeoil.key

# Start Apache HTTP server
exec apache2-foreground -c 'ServerName localhost' -c 'DirectoryIndex timer.php'

