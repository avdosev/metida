#!bin/sh

if [[ $EUID -ne 0 ]]; then
	echo "Start as root\n"
	exit -1
fi

packages = {
	nodejs, npm, mysql-server }

apt install packages
#need create special account for working with DB
mysql_secure_installation
#rewrite command from readme
#add script for checking 
