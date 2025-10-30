___

## Nmap Summary
```
Not shown: 65532 closed tcp ports (reset)
PORT      STATE    SERVICE REASON         VERSION
22/tcp    open     ssh     syn-ack ttl 63 OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 7e:46:2c:46:6e:e6:d1:eb:2d:9d:34:25:e6:36:14:a7 (RSA)
| ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDSrBVJEKTgtUohrzoK9i67CgzqLAxnhEsPmW8hS5CFFGYikUduAcNkKsmmgQI09Q+6pa+7YHsnxcerBnW0taI//IYB5TI/LSE3yUxyk/ROkKLXPNiNGUhC6QiCj3ZTvThyHrFD9ZTxWfZKEQTcOiPs15+HRPCZepPouRtREGwmJcvDal1ix8p/2/C8X57ekouEEpIk1wzDTG5AM2/D08gXXe0TP+KYEaZEzAKM/mQUAqNTxfjc9x5rlfPYW+50kTDwtyKta57tBkkRCnnns0YRnPNtt0AH374ZkYLcqpzxwN8iTNXaeVT/dGfF4mA1uW89hSMarmiRgRh20Y1KIaInHjv9YcvSlbWz+2sz3ev725d4IExQTvDR4sfUAdysIX/q1iNpleyRgM4cvDMjxD6lEKpvQYSWVlRoJwbUUnJqnmZXboRwzRl+V3XCUaABJrA/1K1gvJfsPcU5LX303CV6LDwvLJIcgX
lEbtjhkcxz7b7CS78BEW9hPifCUDGKfUs=
|   256 45:7b:20:95:ec:17:c5:b4:d8:86:50:81:e0:8c:e8:b8 (ECDSA)
| ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBHYLF+puo27gFRX69GBeZJqCeHN3ps2BScsUhKoDV66yEPMOo/Sn588F/wqBnJxsPB3KSFH+kbYW2M6erFI3U5k=
|   256 cb:92:ad:6b:fc:c8:8e:5e:9f:8c:a2:69:1b:6d:d0:f7 (ED25519)
|_ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG/QUl3gapBOWCGEHplsOKe2NlWjlrb5vTTLjg6gMuGl
80/tcp    open     http    syn-ack ttl 63 Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Did not follow redirect to http://alert.htb/
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache/2.4.41 (Ubuntu)
12227/tcp filtered unknown no-response
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 20:34
Completed NSE at 20:34, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 20:34
Completed NSE at 20:34, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 20:34
Completed NSE at 20:34, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 828.39 seconds
           Raw packets sent: 72313 (3.182MB) | Rcvd: 214538 (36.054MB)

```

# Subdomain Enum
```
 :: Method           : GET
 :: URL              : http://alert.htb
 :: Wordlist         : FUZZ: /home/ew/Documents/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt
 :: Header           : Host: FUZZ.alert.htb
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
 :: Filter           : Response status: 301
________________________________________________

statistics              [Status: 401, Size: 467, Words: 42, Lines: 15, Duration: 193ms]
:: Progress: [4989/4989] :: Job [1/1] :: 187 req/sec :: Duration: [0:00:30] :: Errors: 0 ::

```

# Notes

It doesn't seem vuln to LFI ( local file inclusion)

It is vulnerable to XSS and files with php code can be uploaded as well as js
but it checks for .md extension which is annoying

pages=messages is a page

There is a post request there

This is a php website

stastics.alert.htb is a subdomain but need creds to log in 

*ok it is vulnerable to XSS so what how shell from this*


 *the way to get here was crazy fire thogh ngl*

<pre>root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Netw
ork Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
systemd-timesync:x:102:104:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:106::/nonexistent:/usr/sbin/nologin
syslog:x:104:110::/home/syslog:/usr/sbin/nologin
_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
tss:x:106:111:TPM software stack,,,:/var/lib/tpm:/bin/false
uuidd:x:107:112::/run/uuidd:/usr/sbin/nologin
tcpdump:x:108:113::/nonexistent:/usr/sbin/nologin
landscape:x:109:115::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:110:1::/var/cache/pollinate:/bin/false
fwupd-refresh:x:111:116:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
usbmux:x:112:46:usbmux daemon,,,:/var/lib/usbmux:/usr/sbin/nologin
sshd:x:113:65534::/run/sshd:/usr/sbin/nologin
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
albert:x:1000:1000:albert:/home/albert:/bin/bash
lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
david:x:1001:1002:,,,:/home/david:/bin/bash
</pre>

# 2 users here
albert:x:1000:1000:albert:/home/albert:/bin/bash
david:x:1001:1002:,,,:/home/david:/bin/bash



*ran hydra on the statistics page targeting albert using rockyou as the wordlist*

[80][http-get] host: statistics.alert.htb   login: albert   password: manchesterunited


So from here

In opt theres chrome and website-checker which is running on 8080 with a cronjob

There's also the david user 


*Processes*
```
root         786  0.0  0.2 241368 11292 ?        Ssl  18:07   0:00 /usr/sbin/ModemManager
root        1003  0.0  0.0   6816  3020 ?        Ss   18:08   0:00 /usr/sbin/cron -f
root        1012  0.0  0.0   8360  3460 ?        S    18:08   0:00  _ /usr/sbin/CRON -f
root        1039  0.0  0.0   2608   528 ?        Ss   18:08   0:00  |   _ /bin/sh -c /root/scripts/php_bot.sh
root        1041  0.0  0.0   6892  3364 ?        S    18:08   0:00  |       _ /bin/bash /root/scripts/php_bot.sh
root        1047  0.0  0.0   2636   736 ?        S    18:08   0:00  |           _ inotifywait -m -e modify --format %w%f %e /opt/website-monitor/config
root        1048  0.0  0.0   6892   224 ?        S    18:08   0:00  |           _ /bin/bash /root/scripts/php_bot.sh
root        1013  0.0  0.0   8360  3460 ?        S    18:08   0:00  _ /usr/sbin/CRON -f
root        1040  0.0  0.0   2608   596 ?        Ss   18:08   0:00      _ /bin/sh -c /root/scripts/xss_bot.sh
root        1042  0.0  0.0   6892  3220 ?        S    18:08   0:00          _ /bin/bash /root/scripts/xss_bot.sh
root        1049  0.0  0.0   2636   792 ?        S    18:08   0:00              _ inotifywait -m -e create --format %w%f %e /var/www/alert.htb/messages --exclude 2024-03-10_15-48-34.txt
root        1050  0.0  0.0   6892  1960 ?        S    18:08   0:00              _ /bin/bash /root/scripts/xss_bot.sh
root        1011  0.0  0.6 207256 26432 ?        Ss   18:08   0:00 /usr/bin/php -S 127.0.0.1:8080 -t /opt/website-monitor
root        1024  0.0  0.5 396348 20872 ?        Ssl  18:08   0:02 /usr/bin/python3 /usr/bin/fail2ban-server -xf start

```


*Theres a php bot checking the website-checker opt/website-monitor/config

        AllowOverride All
        AuthType Basic
        AuthName "Restricted Area"
        AuthUserFile /var/www/statistics.alert.htb/.htpasswd
        Require valid-user


*if I could somehow read this*

Look at the statistics website brother lmao

# Fail2ban

*failtoban is running and there r hashes here*

Found /var/lib/fail2ban/fail2ban.sqlite3: regular file, no read permission    ix:path=/run/user/1000/b

dbfile = /var/lib/fail2ban/fail2ban.sqlite3


ââAnalyzing Htpasswd Files (limit 70)
-rw-r--r-- 1 root root 47 Jan 11  2020 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/basic/authz_owner/.htpasswd

username:$apr1$1f5oQUl4$21lLXSN7xQOPtNsj5s4Nk/

-rw-r--r-- 1 root root 47 Jan 11  2020 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/basic/file/.htpasswd

username:$apr1$uUMsOjCQ$.BzXClI/B/vZKddgIAJCR.

-rw-r--r-- 1 root root 117 Jan 11  2020 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_anon/.htpasswd

username:digest anon:25e4077a9344ceb1a88f2a62c9fb60d8
05bbb04

anonymous:digest anon:faa4e5870970cf935bb9674776e6b26a

-rw-r--r-- 1 root root 62 Jan 11  2020 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest/.htpasswd
username:digest private area:fad48d3a7c63f61b5b3567a4105bbb04

-rw-r--r-- 1 root root 62 Jan 11  2020 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_time/.htpasswd
username:digest private area:fad48d3a7c63f61b5b3567a4105bbb04

-rw-r--r-- 1 root root 62 Jan 11  2020 /usr/lib/python3/dist-packages/fail2ban/tests/files/config/apache-auth/digest_wrongrelm/.htpasswd
username:wrongrelm:99cd340e1283c6d0ab34734bd47bdc30
4105bbb04


*this has SUID set*

-rwsr-xr-x 1 root root 206K Mar  5  2024 /opt/google/chrome/chrome-sandbox

*what is this*

/var/crash/_opt_easywall_easywall_web_passwd.py.1000.crash

*website monitor has .git*

*cracked these 2 password from  failtoban directory got it form linpeas*

?:password
?:foo

# Root

*being part of the management group i could write to a php file in the website-monitor tool that was being ran by a bot running as root so then just put php rev shell code there and get root*


