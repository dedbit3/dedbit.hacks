

remember in PS you are dealing with objects and you are accessing 
properties (characteristics)
and 
methods (actions)

*Verb-Noun format for cmdlet*
- `Get-Content`: Retrieves (gets) the content of a file and displays it in the console.
- `Set-Location`: Changes (sets) the current working directory.


*list all cmdltes available for use*
Get-Command



*lists how to use cmdlet*
Get-Help



*Get-Alias shows alises on the system*
For example, `dir` is an alias for `Get-ChildItem`, and `cd` is an alias for `Set-Location`.




*modules can either be binaries or powershell scripts -> the add cmdlet's, functinos and vars for use*
Import-Module
Remove-Module
Install-Module


*can look for modules in repositories to install*
`Find-Module`



*comparison operators*
- `-eq`
- `-ne`: "**not equal**". This operator can be used to exclude objects from the results based on specified criteria.
- `-gt`: "**greater than**". This operator will filter only objects which exceed a specified value. It is important to note that this is a strict comparison, meaning that objects that are equal to the specified value will be excluded from the results.
- `-ge`: "**greater than or equal to**". This is the non-strict version of the previous operator. A combination of `-gt` and `-eq`.
- `-lt`: "**less than**". Like its counterpart, "greater than", this is a strict operator. It will include only objects which are strictly below a certain value.
- `-le`: "**less than or equal to**". Just like its counterpart `-ge`, this is the non-strict version of the previous operator. A combination of `-lt` and `-eq`.


 *like a pattern*
-like



```powershell
Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 1
```


The last in this set of filtering cmdlets is `Select-String`. This cmdlet searches for text patterns within files, similar to `grep` in Unix-based systems or `findstr` in Windows Command Prompt. It’s commonly used for finding specific content within log files or documents


# Select-String -> grep equivalent

supports regex statements as well


Get-ChildItem | Where-Object -Property Length -gt 100



*Get-ComputerInfo <- more powerfull eq of systeminfo*


WDAGUtilityAccount <- virtualized env for edge protects against malware pretty cool

Get-LocalUser <- shows local users on the system

`Get-NetIPConfiguration` < ipconfig equivalent

*interfaces info*
```powershell
Get-NetIPAddress
```



Get-Service <- services are the equivalent of daemons on linux

`Get-Process`

`Get-NetTCPConnection`

`Get-FileHash`



# Invoke-Command

can execute commands on remote servers 
`Invoke-Command`

`-ScriptBlock { ... }`




