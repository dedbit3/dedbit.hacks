---

---
___

*files to read*

|   |   |
|---|---|
|**Location**|**Description**|
|`/etc/issue`|contains a message or system identification to be printed before the login prompt.|
|`/etc/profile`|controls system-wide default variables, such as Export variables, File creation mask (umask), Terminal types, Mail messages to indicate when new mail has arrived|
|`/proc/version`|specifies the version of the Linux kernel|
|`etc/passwd`|has all registered users that have access to a system|
|`/etc/shadow`|contains information about the system's users' passwords|
|`/root/.bash_history`|contains the history commands for `root` user|
|`/var/log/dmessage`|contains global system messages, including the messages that are logged during system startup|
|`/var/mail/root`|all emails for `root` user|
|`/root/.ssh/id_rsa`|Private SSH keys for a root or any known valid user on the server|
|`/var/log/apache2/access.log`|the accessed requests for `Apache` web server|
|`C:\boot.ini`|contains the boot options for computers with BIOS firmware|

*very cool file can even give cmd's if option is enabled*
/proc/self/environ

if headers are being injected into the environment you can pass php script and
/proc/self/environ?cmd=whoami RCE


User-Agent: <?php system($_GET['cmd']); ?>



*null byte can be used to bypass when .php is added to the end of the file for example*
%00


can bypass replacing ../ with empty strings
 `....//....//....//....//....//etc/passwd`


To make it clearer, if we try this concept in the file system using `cd ..`, it will get you back one step; however, if you do `cd .`, It stays in the current directory. Similarly, if we try `/etc/passwd/..`, it results to be `/etc/` and that's because we moved one to the root. Now if we try `/etc/passwd/.`, the result will be `/etc/passwd` since dot refers to the current directory.



Remote File Inclusion - RFI

Remote File Inclusion (RFI) is a technique to include remote files into a vulnerable application. Like LFI, the RFI occurs when improperly sanitizing user input, allowing an attacker to inject an external URL into include function. One requirement for RFI is that the allow_url_fopen option needs to be on.

The risk of RFI is higher than LFI since RFI vulnerabilities allow an attacker to gain Remote Command Execution (RCE) on the server. Other consequences of a successful RFI attack include:

- Sensitive Information Disclosure
- Cross-site Scripting (XSS)
- Denial of Service (DoS)

An external server must communicate with the application server for a successful RFI attack where the attacker hosts malicious files on their server. Then the malicious file is injected into the include function via HTTP requests, and the content of the malicious file executes on the vulnerable application server.



*remediation*

As a developer, it's important to be aware of web application vulnerabilities, how to find them, and prevention methods. To prevent the file inclusion vulnerabilities, some common suggestions include:

1. Keep system and services, including web application frameworks, updated with the latest version.
2. Turn off PHP errors to avoid leaking the path of the application and other potentially revealing information.
3. A Web Application Firewall (WAF) is a good option to help mitigate web application attacks.
4. Disable some PHP features that cause file inclusion vulnerabilities if your web app doesn't need them, such as allow_url_fopen on and allow_url_include.
5. Carefully analyze the web application and allow only protocols and PHP wrappers that are in need.
6. Never trust user input, and make sure to implement proper input validation against file inclusion.
7. Implement whitelisting for file names and locations as well as blacklisting



