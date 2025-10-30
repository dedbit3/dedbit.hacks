___

*General Commands*
```
set -> shows env and path for shell

ver -> shows os version

systeminfo -> shows general systmeinfo

netstat -> show established connections

cls -> clear screen

help -> help with a command

more -> helps read long files

ipconfig -> network adapter configuration

ipconfig /all -> more detailed
```


*DHCP* (release and renew IP addresses) :
```
ipconfig /release
ipconfig /renew
```

*Useful for enumeration*:
```
tracert
ping 
nslookup
```


*Will use 1.1.1.1 DNS for resolution*
`nslookup example.com 1.1.1.1`


*Useful for displaying files/folders*
```
dir /a <- display all files and folders including hidden
dir /s <- display all files and subfolders
```

*These are the equivalents of cat can read files*
```
type 
more 
```

*Move and copy files*
```
copy 
move
```

*Delete files on*
```
del
erase
```

*Task management*
```
tasklist
```


*find tasks for a specific process*
`tasklist /FI "imagename eq sshd.exe"

*kill tasks*
`tasklist /FI "imagename eq sshd.exe"`

- `chkdsk`: checks the file system and disk volumes for errors and bad sectors.
- `driverquery`: displays a list of installed device drivers.
- `sfc /scannow`: scans system files for corruption and repairs them if possible

*Shutdown system options*
`shutdown /?`


