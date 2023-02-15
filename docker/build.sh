#!/usr/bin/env bash
#

[[ -f 'Makefile' ]] || { 
    echo "ERROR: Run this script from project root directory"
    exit 1
}

docker run \
    --name cstimer_build \
    -a STDIN -a STDOUT -a STDERR \
    --rm \
    -v "$PWD:/mnt/build" -w /mnt/build \
    eclipse-temurin:8-jdk-centos7 \
    /usr/bin/env make "$@"

