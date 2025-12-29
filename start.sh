set -e
/usr/sbin/sshd
exec node server.js
