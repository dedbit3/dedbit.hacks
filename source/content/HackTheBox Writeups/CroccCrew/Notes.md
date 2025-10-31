___

# User


Microsoft Windows Active Directory LDAP (Domain: COOCTUS.CORP0.

80/tcp    open  http          syn-ack ttl 125 Microsoft IIS httpd 10.0
looks like theres a cve for this

commonName=DC.COOCTUS.CORP


enumerate:
LDAP
SMB
DNS?
RPC dump
robots.txt
kerbrute

I think rdp is running on machine

look at webpage sources / network requests  -> nothing interesting here



*fuzzing dir not getting nothing as well -> try different wordlists 


TRACE request is enabled it accepts a query parameter 
need a file and variable name to be able to query how tf do I find that


subdomains???


webflow.io is the CMS being used in the website

* remember to always check robots*
robots.txt -> 

User-Agent: *
Disallow:
/robots.txt
/db-config.bak
/backdoor.php



/db-config.bak -> this files hae creds for sqli database

those creds don't work with ad so prob not an AD user



Creds found in desktop image with rdesktop:

visitor
GuestLogin!


