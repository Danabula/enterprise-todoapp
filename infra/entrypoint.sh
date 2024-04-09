#!/usr/bin/env sh

# create db user
addgroup -g 1000 mariadb
adduser -u 1000 -G mariadb -s /bin/sh -D mariadb

mkdir -p /var/lib/mysql
mkdir -p /run/mysqld
chown -R mariadb:mariadb /var/lib/mysql
chown -R mariadb:mariadb /run/mysqld

# initialize the database
mysql_install_db --user=mariadb --ldata=/var/lib/mysql > /dev/null

# setup root password
mysqld --user mariadb --bootstrap --skip-networking <<EOF
    USE mysql;
    FLUSH PRIVILEGES;
    GRANT ALL ON *.* TO 'root'@'%' IDENTIFIED BY 'supersecurepass' WITH GRANT OPTION;
    GRANT ALL ON *.* TO 'root'@'localhost' IDENTIFIED BY 'supersecurepass' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
EOF

# start the database & enable networking
mysqld --user mariadb --bind-address=0.0.0.0 --port=3306 --skip-networking=0 &
sleep 1

# create the database
cd /project && sudo -E -u node npx prisma db push

# start the webserver
echo "server args: " "$@"
cd /project && exec sudo -E -u node npm run dev "$@"
