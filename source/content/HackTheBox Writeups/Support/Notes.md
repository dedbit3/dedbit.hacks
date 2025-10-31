___

## Nmap Summary

```
Scanned at 2024-11-07 16:46:18 EST for 296s
Not shown: 65517 filtered tcp ports (no-response)
PORT      STATE SERVICE       REASON          VERSION
53/tcp    open  domain        syn-ack ttl 127 Simple DNS Plus
88/tcp    open  kerberos-sec  syn-ack ttl 127 Microsoft Windows Kerberos (server time: 2024-11-07 21:49:39Z)
135/tcp   open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
139/tcp   open  netbios-ssn   syn-ack ttl 127 Microsoft Windows netbios-ssn
389/tcp   open  ldap          syn-ack ttl 127 Microsoft Windows Active Directory LDAP (Domain: support.htb0., Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds? syn-ack ttl 127
464/tcp   open  kpasswd5?     syn-ack ttl 127
593/tcp   open  ncacn_http    syn-ack ttl 127 Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped    syn-ack ttl 127
3268/tcp  open  ldap          syn-ack ttl 127 Microsoft Windows Active Directory LDAP (Domain: support.htb0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped    syn-ack ttl 127
5985/tcp  open  http          syn-ack ttl 127 Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
9389/tcp  open  mc-nmf        syn-ack ttl 127 .NET Message Framing
49664/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
49668/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
49674/tcp open  ncacn_http    syn-ack ttl 127 Microsoft Windows RPC over HTTP 1.0
49686/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
49691/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
49710/tcp open  msrpc         syn-ack ttl 127 Microsoft Windows RPC
Service Info: Host: DC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-time: 
|   date: 2024-11-07T21:50:31
|_  start_date: N/A
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 19493/tcp): CLEAN (Timeout)
|   Check 2 (port 51101/tcp): CLEAN (Timeout)
|   Check 3 (port 45724/udp): CLEAN (Timeout)
|   Check 4 (port 30964/udp): CLEAN (Timeout)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked
|_clock-skew: -1s

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 16:51
Completed NSE at 16:51, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 16:51
Completed NSE at 16:51, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 16:51
Completed NSE at 16:51, 0.00s elapsed
Read data files from: /usr/bin/../share/nmap
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 295.92 seconds
           Raw packets sent: 131188 (5.772MB) | Rcvd: 255 (18.641KB)
```


---

# Enum4linux enum (no user/no passwd)

└> sudo enum4linux-ng 10.10.11.174             
[sudo] password for ew: 
ENUM4LINUX - next generation (v1.3.4)

 ==========================
|    Target Information    |
 ==========================
[*] Target ........... 10.10.11.174
[*] Username ......... ''
[*] Random Username .. 'pmgmennx'
[*] Password ......... ''
[*] Timeout .......... 5 second(s)

 =====================================
|    Listener Scan on 10.10.11.174    |
 =====================================
[*] Checking LDAP
[+] LDAP is accessible on 389/tcp
[*] Checking LDAPS
[+] LDAPS is accessible on 636/tcp
[*] Checking SMB
[+] SMB is accessible on 445/tcp
[*] Checking SMB over NetBIOS
[+] SMB over NetBIOS is accessible on 139/tcp

 ====================================================
|    Domain Information via LDAP for 10.10.11.174    |
 ====================================================
[*] Trying LDAP
[+] Appears to be root/parent DC
[+] Long domain name is: support.htb

 ===========================================================
|    NetBIOS Names and Workgroup/Domain for 10.10.11.174    |
 ===========================================================
[-] Could not get NetBIOS names information via 'nmblookup': timed out

 =========================================
|    SMB Dialect Check on 10.10.11.174    |
 =========================================
[*] Trying on 445/tcp
[+] Supported dialects and settings:
Supported dialects:
  SMB 1.0: false
  SMB 2.02: true
  SMB 2.1: true
  SMB 3.0: true
  SMB 3.1.1: true
Preferred dialect: SMB 3.0
SMB1 only: false
SMB signing required: true

 ===========================================================
|    Domain Information via SMB session for 10.10.11.174    |
 ===========================================================
[*] Enumerating via unauthenticated SMB session on 445/tcp
[+] Found domain information via SMB
NetBIOS computer name: DC
NetBIOS domain name: SUPPORT
DNS domain: support.htb
FQDN: dc.support.htb
Derived membership: domain member
Derived domain: SUPPORT

 =========================================
|    RPC Session Check on 10.10.11.174    |
 =========================================
[*] Check for null session
[+] Server allows session using username '', password ''
[*] Check for random user
[+] Server allows session using username 'pmgmennx', password ''
[H] Rerunning enumeration with user 'pmgmennx' might give more results

 ===================================================
|    Domain Information via RPC for 10.10.11.174    |
 ===================================================
[-] Could not get workgroup/domain from lsaquery
[-] Could not get domain SID from lsaquery
[-] Could not determine if host is part of domain or part of a workgroup

 ===============================================
|    OS Information via RPC for 10.10.11.174    |
 ===============================================
[*] Enumerating via unauthenticated SMB session on 445/tcp
[+] Found OS information via SMB
[*] Enumerating via 'srvinfo'
[+] Found OS information via 'srvinfo'
[+] After merging OS information we have the following result:
OS: unknown
OS version: null
OS release: ''
OS build: '20348'
Native OS: not supported
Native LAN manager: not supported
Platform id: null
Server type: null
Server type string: 'failed on directory /var/lib/samba/private/msg.sock: No such file or directory'

 =====================================
|    Users via RPC on 10.10.11.174    |
 =====================================
[*] Enumerating users via 'querydispinfo'
[-] Could not extract users from querydispinfo output, please open a GitHub issue
[*] Enumerating users via 'enumdomusers'
[-] Could not extract users from eumdomusers output, please open a GitHub issue

 ======================================
|    Groups via RPC on 10.10.11.174    |
 ======================================
[*] Enumerating local groups
[-] Could not parse result of 'enumalsgroups domain' command, please open a GitHub issue
[*] Enumerating builtin groups
[-] Could not parse result of 'enumalsgroups builtin' command, please open a GitHub issue
[*] Enumerating domain groups
[-] Could not parse result of 'enumdomgroups' command, please open a GitHub issue

 ======================================
|    Shares via RPC on 10.10.11.174    |
 ======================================
[*] Enumerating shares
[+] Found 0 share(s) for user '' with password '', try a different user

 =========================================
|    Policies via RPC for 10.10.11.174    |
 =========================================
[*] Trying port 445/tcp
[-] SMB connection error on port 445/tcp: STATUS_ACCESS_DENIED
[*] Trying port 139/tcp
[-] SMB connection error on port 139/tcp: session failed

 =========================================
|    Printers via RPC for 10.10.11.174    |
 =========================================
[-] Could not parse result of enumprinters command, please open a GitHub issue


---

# Enum4linux-ng (random user no password)

└> sudo enum4linux-ng 10.10.11.174 -u 'pmgmennx' 
ENUM4LINUX - next generation (v1.3.4)

 ==========================
|    Target Information    |
 ==========================
[*] Target ........... 10.10.11.174
[*] Username ......... 'pmgmennx'
[*] Random Username .. 'diklaxne'
[*] Password ......... ''
[*] Timeout .......... 5 second(s)

 =====================================
|    Listener Scan on 10.10.11.174    |
 =====================================
[*] Checking LDAP
[+] LDAP is accessible on 389/tcp
[*] Checking LDAPS
[+] LDAPS is accessible on 636/tcp
[*] Checking SMB
[+] SMB is accessible on 445/tcp
[*] Checking SMB over NetBIOS
[+] SMB over NetBIOS is accessible on 139/tcp

 ====================================================
|    Domain Information via LDAP for 10.10.11.174    |
 ====================================================
[*] Trying LDAP
[+] Appears to be root/parent DC
[+] Long domain name is: support.htb

 ===========================================================
|    NetBIOS Names and Workgroup/Domain for 10.10.11.174    |
 ===========================================================
[-] Could not get NetBIOS names information via 'nmblookup': timed out

 =========================================
|    SMB Dialect Check on 10.10.11.174    |
 =========================================
[*] Trying on 445/tcp
[+] Supported dialects and settings:
Supported dialects:
  SMB 1.0: false
  SMB 2.02: true
  SMB 2.1: true
  SMB 3.0: true
  SMB 3.1.1: true
Preferred dialect: SMB 3.0
SMB1 only: false
SMB signing required: true

 ===========================================================
|    Domain Information via SMB session for 10.10.11.174    |
 ===========================================================
[*] Enumerating via unauthenticated SMB session on 445/tcp
[+] Found domain information via SMB
NetBIOS computer name: DC
NetBIOS domain name: SUPPORT
DNS domain: support.htb
FQDN: dc.support.htb
Derived membership: domain member
Derived domain: SUPPORT

 =========================================
|    RPC Session Check on 10.10.11.174    |
 =========================================
[*] Check for null session
[+] Server allows session using username '', password ''
[*] Check for user session
[+] Server allows session using username 'pmgmennx', password ''
[*] Check for random user
[+] Server allows session using username 'diklaxne', password ''
[H] Rerunning enumeration with user 'diklaxne' might give more results

 ===================================================
|    Domain Information via RPC for 10.10.11.174    |
 ===================================================
[-] Could not get workgroup/domain from lsaquery
[-] Could not get domain SID from lsaquery
[-] Could not determine if host is part of domain or part of a workgroup

 ===============================================
|    OS Information via RPC for 10.10.11.174    |
 ===============================================
[*] Enumerating via unauthenticated SMB session on 445/tcp
[+] Found OS information via SMB
[*] Enumerating via 'srvinfo'
[+] Found OS information via 'srvinfo'
[+] After merging OS information we have the following result:
OS: unknown
OS version: null
OS release: ''
OS build: '20348'
Native OS: not supported
Native LAN manager: not supported
Platform id: null
Server type: null
Server type string: 'failed on directory /var/lib/samba/private/msg.sock: No such file or directory'

 =====================================
|    Users via RPC on 10.10.11.174    |
 =====================================
[*] Enumerating users via 'querydispinfo'
[-] Could not extract users from querydispinfo output, please open a GitHub issue
[*] Enumerating users via 'enumdomusers'
[-] Could not extract users from eumdomusers output, please open a GitHub issue

 ======================================
|    Groups via RPC on 10.10.11.174    |
 ======================================
[*] Enumerating local groups
[-] Could not parse result of 'enumalsgroups domain' command, please open a GitHub issue
[*] Enumerating builtin groups
[-] Could not parse result of 'enumalsgroups builtin' command, please open a GitHub issue
[*] Enumerating domain groups
[-] Could not parse result of 'enumdomgroups' command, please open a GitHub issue

 ======================================
|    Shares via RPC on 10.10.11.174    |
 ======================================
[*] Enumerating shares
[+] Found 6 share(s):
ADMIN$:
  comment: Remote Admin
  type: Disk
C$:
  comment: Default share
  type: Disk
IPC$:
  comment: Remote IPC
  type: IPC
NETLOGON:
  comment: Logon server share
  type: Disk
SYSVOL:
  comment: Logon server share
  type: Disk
support-tools:
  comment: support staff tools
  type: Disk
[*] Testing share ADMIN$
[+] Mapping: DENIED, Listing: N/A
[*] Testing share C$
[+] Mapping: DENIED, Listing: N/A
[*] Testing share IPC$
[+] Mapping: OK, Listing: NOT SUPPORTED
[*] Testing share NETLOGON
[+] Mapping: OK, Listing: DENIED
[*] Testing share SYSVOL
[+] Mapping: OK, Listing: DENIED
[*] Testing share support-tools
[+] Mapping: OK, Listing: OK

 =========================================
|    Policies via RPC for 10.10.11.174    |
 =========================================
[*] Trying port 445/tcp
[-] SMB connection error on port 445/tcp: STATUS_ACCESS_DENIED
[*] Trying port 139/tcp
[-] SMB connection error on port 139/tcp: session failed

 =========================================
|    Printers via RPC for 10.10.11.174    |
 =========================================
[-] Could not parse result of enumprinters command, please open a GitHub issue

Completed after 30.74 seconds

___

# AD users from ad enum

ford.victoria
stoll.rachelle
daughtler.mabel
langley.lucy
west.laura
monroe.david
cromwell.gerard
bardot.mary
raven.clifton
levine.leopoldo
thomas.raphael
anderson.damian
wilson.shelby
hernandez.stanley
smith.rosario
support
ldap
krbtgt
Guest
Administrator


---

# pass policy

Domain password information:
  Password history length: 24
  Minimum password length: 7
  Maximum password age: not set
  Password properties:
  - DOMAIN_PASSWORD_COMPLEX: true
  - DOMAIN_PASSWORD_NO_ANON_CHANGE: false
  - DOMAIN_PASSWORD_NO_CLEAR_CHANGE: false
  - DOMAIN_PASSWORD_LOCKOUT_ADMINS: false
  - DOMAIN_PASSWORD_PASSWORD_STORE_CLEARTEXT: false
  - DOMAIN_PASSWORD_REFUSE_PASSWORD_CHANGE: false
Domain lockout information:
  Lockout observation window: 30 minutes
  Lockout duration: 30 minutes
  Lockout threshold: None
Domain logoff information:
  Force logoff time: not set



# check these out

=========|| SAM / SYSTEM Backup Checks
C:\Windows\System32\config\RegBack\SAM Found!
C:\Windows\System32\config\SAM Found!
C:\Windows\System32\config\SYSTEM Found!
C:\Windows\System32\config\RegBack\system Found!



Stopped at registry check!!!