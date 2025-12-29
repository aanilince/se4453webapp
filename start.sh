#!/bin/sh
set -e

if [ "$SSH_PASSWORD" ]; then
    echo "root:$SSH_PASSWORD" | chpasswd
fi

/usr/sbin/sshd -D &
exec node server.js