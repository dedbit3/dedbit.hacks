___


proftpd server here 

user anon220 ProFTPD Server (sightless.htb FTP Server) [::ffff:10.10.11.32]
550 SSL/TLS required on the control channel
500 Invalid command: try being more creative


*subdomain*

sqlpad.sightless.htb

About SQLPad

**Version**: 6.10.0


*found RCE for it*
https://github.com/0xDTC/SQLPad-6.10.0-Exploit-CVE-2022-0944


SQLPAD_PORT = 3010
SQLPAD_BASE_URL = "/sqlpad"
SQLPAD_DB_PATH = ../db
SQLPAD_APP_LOG_LEVEL = debug
SQLPAD_WEB_LOG_LEVEL = debug
SQLPAD_SERVICE_TOKEN_SECRET = secr3t
SQLPAD_DEFAULT_CONNECTION_ID = devdbdriverid123

SQLPAD_CONNECTIONS__devdbdriverid123__driver = sqlite
SQLPAD_CONNECTIONS__devdbdriverid123__name = dev connection from config
SQLPAD_CONNECTIONS__devdbdriverid123__filename = "./test/fixtures/sales.sqlite"

*in docker container*

  mssql:
    image: 'mcr.microsoft.com/mssql/server:2019-CU8-ubuntu-16.04'
    hostname: 'mssql'
    restart: always
    ports:
      - 1433:1433
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=SuperP4ssw0rd!
      - MSSQL_PID=Express
    healthcheck:


  mariadb:
    image: mariadb:latest
    restart: always
    ports:
      - 13306:3306
    environment:
      MYSQL_USER: user
      MYSQL_PASSWORD: password
      MYSQL_DATABASE: db
      MYSQL_ROOT_PASSWORD: password


  mysql:
    image: mysql:8
    restart: always
    ports:
      - 23306:3306
    environment:
      MYSQL_USER: user
      MYSQL_PASSWORD: password
      MYSQL_DATABASE: db2
      MYSQL_ROOT_PASSWORD: root
    healthcheck:

  postgres:
    image: postgres:9.6-alpine
    restart: always
    environment:
      POSTGRES_USER: sqlpad
      POSTGRES_PASSWORD: sqlpad
      POSTGRES_DB: sqlpad
    ports:
      - '5432:5432'




in /opt wtf is yarn there is version there as well



*2 users*

michael
node



in /opt wtf is yarn there is version there as well



in /opt wtf is yarn there is version there as well



-> john seems to b a user here

:*U1UI26113beb-60eb-4a58-81eb-2318e27eb3bfjohn@sightless.htbeditor2d3499e3-16ba-4b4b-a49e-c7c5dca89f2d2024-05-15 12:29:23.725 +00:002024-05-15 12:29:27.257 +00:00CU3Ida9a25f7-588c-40f5-89db-58fbebab591fadmin@sightless.htbadmin$2a$10$cjbITibC.4BQQKJ8NOBUv.p0bG2n8t.RIIKRysR6pZnxquAWsLFcC2024-05-15 04:48:09.377 +00:002024-05-15 18:16:54.652 +00:00



└> john --format=bcrypt /home/ew/box/sightless/admin.hash --show 
?:admin

1 password hash cracked, 0 left

?:admin




*apparently these 2 users on machine*

john@sightless.htb

admin@sightless.htb -> pass is admin apparently?


node:!:19053:0:99999:7:::
michael:$6$mG3Cp2VPGY.FDE8u$KVWVIHzqTzhOSYkzJIpFc2EsgmqvPa.q2Z9bLUU6tlBWaEwuxCDEP9UFHIXNUcF2rBnsaFYuJa6DUh/pL2IJD/:19860:0:99999:7:::
root:$6$jn8fwk6LVJ9IYw30$qwtrfWTITUro8fEJbReUc7nXyx2wwJsnYdZYm9nMQDHP8SYm33uisO9gZ20LGaepC3ch6Bb2z/lEpBM90Ra4b.:19858:0:99999:7:::
daemon:*:19051:0:99999:7:::



*docker passwords*
michael
node

?:insaneclownposse
?:blindside




*this worked on ssh yay*
michael
?:insaneclownposse




*wtf is this dir*

drwxr-x--- 2 root  root  4.0K May 15  2024 froxlor.panel
drwxr-x--- 2 10000 10000 4.0K May 15  2024 web1
michael@sightless:/var/customers/tmp$ cd web1


wtf is var customers



*this is the froxlor page*
	ServerName admin.sightless.htb
	ServerAlias admin.sightless.htb


#Domain ID: 1 - CustomerID: 1 - CustomerLogin: web1
<VirtualHost 192.168.1.118:80>
  ServerName web1.sightless.htb
  ServerAlias *.web1.sightless.htb
  ServerAdmin john@sightless.htb
  DocumentRoot "/var/customers/webs/web1"





*ok*


web1:$2y$10$X5tjC19boiHf81unjwyFFuELwOVBDyEJMlm/eG9Ks6qpxli/L3Cii



*can access this login page on localhost* <===

admin.sightless.htb:8080/index.php

user has to be john cause he is the admin <pass would make sense for it to be that web1 hash but cracking.....


whats this
root        1432  0.0  3.5 993232 141176 ?       Ssl  16:15   0:06  _ node /usr/app/server.js


this too
lrwxrwxrwx   1 root root   37 May 14  2024 google-chrome -> /opt/google/chrome/cron/google-chrome


uid=1001(john) gid=1001(john) groups=1001(john),27(sudo)


/var/customers/webs/web1


<VirtualHost 127.0.0.1:8080>
	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html/froxlor


runc was found in /usr/sbin/runc, you may be able to escalate privileges with it






*where to go now*

-> ftp I was still not able to log in
-> there is a log in page for froxlor i still haven't been able to log in




*accessed chrome debugger with port forwarding kept trying ports until I found it. then on network and payload section of the inspector i found the creds*

1. loginname
    
    admin
    
2. password
    
    ForlorfroxAdmin



*froxlor version*
- 2.1.8


 Set the user and group that the server normally runs at.
User				proftpd




*used the restart php-fmp service command in the admin pannel to read the root ssh key file*

*bro this box was kinda fucked*



