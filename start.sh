#!/bin/sh
set -e
/usr/sbin/sshd -D &
exec node server.js