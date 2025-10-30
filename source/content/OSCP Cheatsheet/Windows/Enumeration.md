___


*Remember to Configure*:
/etc/krb5.conf

*Enumerate*:
- Ports
- Smb shares
- rpc
- Kerberos user enum

*Tools*:
ldapdomaindump
enum4linux-ng
lookupsid.py


*Sample krb5.conf flile*:
```
[domain_realm]
    .frizz.htb = FRIZZ.HTB
    frizz.htb = FRIZZ.HTB
 
[libdefaults]
    default_realm = FRIZZ.HTB
    dns_lookup_realm = false
    dns_lookup_kdc = true
    ticket_lifetime = 24h
    forwardable = true
 
[realms]
    FRIZZ.HTB = {
        kdc = FRIZZDC.FRIZZ.HTB
        admin_server = FRIZZDC.FRIZZ.HTB
        default_domain = FRIZZ.HTB
```
