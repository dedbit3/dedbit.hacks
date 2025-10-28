___


log into mail.outbound.htb

version is vuln to # CVE-2025-49113

RCE


$config['db_dsnw'] = 'mysql://roundcube:RCDBPass2025@localhost/roundcube';

RCDBPass2025


MariaDB [roundcube]> select * from users;
+---------+----------+-----------+---------------------+---------------------+---------------------+----------------------+----------+-----------------------------------------------------------+
| user_id | username | mail_host | created             | last_login          | failed_login        | failed_login_counter | language | preferences                                               |
+---------+----------+-----------+---------------------+---------------------+---------------------+----------------------+----------+-----------------------------------------------------------+
|       1 | jacob    | localhost | 2025-06-07 13:55:18 | 2025-06-11 07:52:49 | 2025-06-11 07:51:32 |                    1 | en_US    | a:1:{s:11:"client_hash";s:16:"hpLLqLwmqbyihpi7";}         |
|       2 | mel      | localhost | 2025-06-08 12:04:51 | 2025-06-08 13:29:05 | NULL                |                 NULL | en_US    | a:1:{s:11:"client_hash";s:16:"GCrPGMkZvbsnc3xv";}         |
|       3 | tyler    | localhost | 2025-06-08 13:28:55 | 2025-07-12 23:21:24 | 2025-06-11 07:51:22 |                    1 | en_US    | a:2:{s:11:"client_hash";s:16:"7QNGmzCqL0RluRx7";i:0;b:0;} |
+---------+----------+-----------+---------------------+---------------------+---------------------+----------------------+----------+-----------------------------------------------------------+




LhKL1o9Nm3X2




L7Rv00A8TuwJAr67kITxxcSgnIk25Am/

L7Rv00A8TuwJAr67kITxxcSgnIk25Am/


jacob password:
Decrypted password: 595mO8DmwGeD

*holly fuck that took me a minute*



[package]
name = "below"
version = "0.8.0"


can sudo -l 



CVE-2025-27591



jacob ssh password:
gY4Wr3a1evp4

the python exploit worked


