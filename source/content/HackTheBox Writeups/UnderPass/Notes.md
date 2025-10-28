___



theres a UDP port 161 running 

if you do snmpwalk you get that there daloradius running on machine


enumerate dirs at /daloradius/FUZZ


http://10.10.11.48/daloradius/doc/install/INSTALL
daloRADIUS version 0.9


dirsearch finds the files 
-> the docker yaml compose file, etc



PORT     STATE         SERVICE REASON
1812/udp open|filtered radius  no-response
1813/udp open|filtered radacct no-response
3306/udp closed        mysql   port-unreach ttl 63

theres creds in docker-compose file

need to dirsearch the app directory for login

[21:39:08] 200 -    4KB - /daloradius/app/users/login.php

http://10.10.11.48/daloradius/app/users/login.php -> login page here no creds yet tho

http://10.10.11.48/daloradius/app/operators/login.php -> another log in page

default creds for daloradius are 
administrator
radius

the second page logged in 

![[Pasted image 20250324215122.png]]

# user listing

![[Pasted image 20250324215245.png]]


svcMosh
412DD4759978ACFCC81DEAB01B382403


created a user and logged into the other portal -> nice

https://huntr.com/bounties/57abd666-4b9c-4f59-825d-1ec832153e79

able to get RCE here



this was md5 bruuuuhhhhhhhhhhhhhh
412DD4759978ACFCC81DEAB01B382403

pass -> underwaterfriends

# this logs in ssh grape

then if sudo -l 
u can see can run mosh-server

run it as sudo and 5 big booms root
