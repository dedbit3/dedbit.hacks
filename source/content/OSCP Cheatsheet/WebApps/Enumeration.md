___

General Checklist
---

- FUZZ directories
- FUZZ subdomains
- Check cookies
- Run dirsearch
- Check curl -v
- Check wappalizer what is the tech stack
- Check versions  -> what endpoint has what framework, web server, language used 
- what database is it using 
- What users
- What is the directory structure of the project? credential files? check docs
- Is .git exposed? check dot git extension
- Can I do some type of sql injection
- Can I induce errors
- Can I fuzz query parameters
- SSTI injection somewhere? -> test polyglot payloads

Note:
--
*if something does't work with one tool try another tool*



Extras
---

*Polyglot SSTI Injection Payload*
```
${{<%[%'"}}%\.
```


*If LFI present enumerate user environment:*
/proc/self/environ


*Content types*

`application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`.



*Check if sudo -V is vulnearable !!!! easy root*











