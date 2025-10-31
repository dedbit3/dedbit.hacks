___

# User

script.js allows you to upload an AI model to the machine

*this is probs what i have to do*

https://splint.gitbook.io/cyberblog/security-research/tensorflow-remote-code-execution-with-malicious-model

https://github.com/Splinter0/tensorflow-rce

this gets me shell yay. compiling this was such a bitch had to use a docker container!!!!


*hard coded credentials in app.py*

app = Flask(__name__)
app.secret_key = "Sup3rS3cr3tKey4rtIfici4L"

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'models'


*dumped users.db hashes*

*got user*

user: gael
pass: mattp005numbertwo

*user part of this group*
uid=1000(gael) gid=1000(gael) groups=1000(gael),1007(sysadm)


# Root

/etc/laurel/config.toml

*Unexpected in root*
/123
/asd

-rw-r----- 1 root sysadm 52357120 Mar  4 22:19 /var/backups/backrest_backup.tar.gz

*log in creds for backrest web app*
backrest_root
?:!@#$%^
