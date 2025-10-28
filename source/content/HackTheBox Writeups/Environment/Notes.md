___


*this probs has CVE's* <====

_http-server-header: nginx/1.22.1


environment.htb © 2025 | Production v1.1



keep getting redirected to this sosrcery site
https://sorcery.htb/login?error={{2*2}}[[3*3]]


leads me to this -> look at git repo note HTTPS

https://sorcery.htb/auth/login


#shit i might need to do

*might need to enum subdomains of those 2 sites* => UDP scan?


https://git.sorcery.htb/nicole_sullivan/infrastructure


gitea running 

[Powered by Gitea](https://about.gitea.com) Version: 1.22.1 Page: **33ms** Template: **6ms**


*nginx is running as a rev prox might b able to smuggle commands?*


 mail:
    restart: always
    image: mailhog/mailhog:v1.0.1


 ftp:
    restart: always
    image: million12/vsftpd:cd94636




nginx is prob running as a reverse proxy -> and handling traffic for the 2websites on localhost


maybe I can smuggle requests???



sorcery keeps going down. I think its a docker container and it shuts down when there are no requests so spam it and it comes up <- theory




*this was listed as one of the issues in sorcery website*

https://git.sorcery.htb/nicole_sullivan/infrastructure/issues/1

Finish replacing database queries #1
The backend was exposed to database statement injection. Most calls have already been replaced with safe ones. We have to do the same for the remaining ones.



_http-server-header: nginx/1.22.1


https://github.com/moften/CVE-2022-4174_CVE-2022-41742

these CVE's apparently let rce  possible or info disclosure with this nginx version,
is this it?




*posting to register gave me this ->>> the passkey and login give me an 200 ok*

HTTP/1.1 405 Method Not Allowed
Server: nginx/1.27.1
Date: Sun, 15 Jun 2025 17:55:14 GMT
Content-Type: text/html; charset=utf-8
Connection: keep-alive
Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept-Encoding
Allow: GET
Allow: HEAD
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
X-Powered-By: Next.js
ETag: "a55nbiihm11jl"
Content-Length: 2001

<!DOCTYPE html><html><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width"/><title>405: Method Not Allowed</title><meta name="next-head-count" content="3"/>





*i can probs do sql injection in either the passkey or the login fields*
*it is being filtered for charcters though I think cause giving me username invalid*



```
' OR 1=1 WITH 0 as _l00 {…} RETURN 1 //
'=' {…} WITH 0 as _l00 RETURN 1 //
```

*tried these 2 on both login and passkey didn't work*

has to be a cipher injection into neo4j right? like thats the database thats running <===





*FUZZ parameters into http://environmnet.htb*




*these r all the pages from fuzzing*


200      GET        1l       27w     1713c http://environment.htb/build/assets/styles-Bl2K3jyg.css                                                          

200      GET        1l      119w     4111c http://environment.htb/build/assets/login-CnECh1Us.css                                                            

200      GET       54l      174w     2391c http://environment.htb/login                                                                                      

405      GET     2575l     8675w   244841c http://environment.htb/mailing                                                                                    
200      GET       87l      392w     4602c http://environment.htb/                                                                                           
301      GET        7l       11w      169c http://environment.htb/storage => http://environment.htb/storage/                                                

301      GET        7l       11w      169c http://environment.htb/storage/files => http://environment.htb/storage/files/                                    

405      GET     2575l     8675w   244839c http://environment.htb/upload                                                                                    
200      GET       50l      135w     2126c http://environment.htb/up                                                                                                                                                                                                                       
302      GET       12l       22w      358c http://environment.htb/logout => http://environment.htb/login  

301      GET        7l       11w      169c http://environment.htb/vendor => http://environment.htb/vendor/




*got an error coming  here*
http://environment.htb/upload

-> can post to here


*theres info*




Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException


*versions*

PHP 8.2.28 — Laravel 11.30.0




* if I fuzz like this i find this var i can pass but why tf would I fuzz this*

 ffuf -w /home/ew/Documents/wordlists/SecLists/Discovery/Web-Content/burp-parameter-names.txt -u "http://environment.htb/?--FUZZ=helloooooooo" -fs 4602

http://environment.htb/?--env=test



*this is the only writeup that seems right*

https://github.com/Disturbante/HTB-writeups/blob/main/environment.md



*next step would be to fuzz the possible vars that can be passed in url and find --env=*

which you can set to preprod login in directly as him to management portal




*these pages are not forbideen*

/mailing => POST ONLY
/upload => POST ONLY
/up 
/login



*in the log in page* -> if i POST with weird &remember parameters laravel throws error


500 Internal server error

*next step would be to fuzz the possible vars that can be passed in url and find --env=*

which you can set to preprod login in directly as him to management portal

# CVE-2024-52301 POC 
*this is the CVE*

*error thrown out by laravel*

        $keep_loggedin = False;
    } elseif ($remember == &#039;True&#039;) {
        $keep_loggedin = True;
    }

    if($keep_loggedin !== False) {
    // TODO: Keep user logged in if he selects &quot;Remember Me?&quot;
    }

    if(App::environment() == &quot;preprod&quot;) { //QOL: login directly as me in dev/local/preprod envs
        $request-&gt;session()-&gt;regenerate();
        $request-&gt;session()-&gt;put(&#039;user_id&#039;, 1);
        return redirect(&#039;/management/dashboard&#039;);
    }

    $user = User::where(&#039;email&#039;, $email)-&gt;first();




## Name: Hish
## Email: hish@environment.htb


do a htb module on file upload bypass rq


*for encrypting session data*
APP_KEY=base64:BRhzmLIuAh9UG8xXCPuv0nU799gvdh49VjFDvETwY6k=



*this was so fucked wtf*
$ gpg --homedir /tmp/mygnu --decrypt /home/hish/backup/keyvault.gpg
gpg: encrypted with 2048-bit RSA key, ID B755B0EDD6CFCFD3, created 2025-01-11
      "hish_ <hish@environment.htb>"
PAYPAL.COM -> Ihaves0meMon$yhere123
ENVIRONMENT.HTB -> marineSPm@ster!!
FACEBOOK.COM -> summerSunnyB3ACH!!




*files owned by group*

hish@environment:/dev$ find / -group audio 2>/dev/null
/dev/snd/seq
/dev/snd/timer
hish@environment:/dev$ find / -group dip 2>/dev/null
hish@environment:/dev$ find / -group video 2>/dev/null
/dev/fb0
/dev/dri/card0
hish@environment:/dev$ find / -group plugdev 2>/dev/null
hish@environment:/dev$ find / -group users 2>/dev/null
hish@environment:/dev$ find / -group netdev 2>/dev/null
/run/wpa_supplicant
hish@environment:/dev$ find / -group bluetooth 2>/dev/null



*write access on this file*
hish@environment:/run$ ls -alh /dev/fb0    
crw-rw---- 1 root video 29, 0 Jul 17 03:18 /dev/fb0