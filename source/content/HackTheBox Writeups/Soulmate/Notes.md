___


erlang epmd running on the machine with and ssh_runner machine -> would need cookie to connect to machine and get RCE!!!

picture upload on registration could be interesting




BEN is user!!!!!



*hardcoded admin password for soulmate.htb*
$adminPassword = password_hash('Crush4dmin990', PASSWORD_DEFAULT);



Username : ben
 Password : XQxHRZ


i have www-data -> running soulmate.htb site





*found an ftp subdomain*


-> there is an ssh_runner node running on epmd but I would need cookie to connect to it or create a new vm for RCE

-> .erlang.cookie or vm.args


crushFTP server on the subdomain



*race condition CVE dumped users*

[*] NEW SESSION: c2f=9LMj
[*] EXFILTRATED 5 USERS: ben, crushadmin, default, jenna, TempAccount
[*] VULNERABLE! RACE CONDITION POSSIBLE!


*CVE*
**[watchTowr-vs-CrushFTP-Authentication-Bypass-CVE-2025-54309](https://github.com/watchtowrlabs/watchTowr-vs-CrushFTP-Authentication-Bypass-CVE-2025-54309)**


*got another exploit got access to the portal*


*crushFTP version*
Version 11.3.0



CrushFTP Version 11.3.0_2

Last Server Restart: Tue Sep 09 22:04:04 GMT 2025

CrushFTP is up to date (Version 11.3.0_2)

[Change Log](https://www.crushftp.com/version11_build.html)



am i admin? looks like
*this one might create user with better perms*
https://www.exploit-db.com/exploits/52295




Username : crushadmin Password : qQKb9D


Username : ben
 Password : 7VQzMG



*what is this password*

04E2xAXYFfDsEYtu



hardcoded creds

        if ($adminCheck->fetchColumn() == 0) {
            $adminPassword = password_hash('Crush4dmin990', PASSWORD_DEFAULT);
            $adminInsert = $this->pdo->prepare("
                INSERT INTO users (username, password, is_admin, name) 
                VALUES (?, ?, 1, 'Administrator')



Crush4dmin990







in /opt container nerd and crush ftp

erlang epmd running on machine



Crush4dmin990 -> cannot su into ben with this




I have access to the files in crush ftp -> running as root



PASSFILE is for crushadmin




nginx is directly serving  the soulmate.htb website

also serving crushFTP through port 9090 on localhost -> so what are others






Crush4dmin990








































