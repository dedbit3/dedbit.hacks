___


# Subdomain


www                     [Status: 200, Size: 36182, Words: 12829, Lines: 587, Duration: 205ms]
lms                     [Status: 200, Size: 19347, Words: 4910, Lines: 353, Duration: 190ms]
WWW                     [Status: 200, Size: 36182, Words: 12829, Lines: 587, Duration: 143ms]


```js
<script>var _p = { "web": "http:\/\/lms.permx.htb\/", "web_url": "http:\/\/lms.permx.htb\/web\/", "web_relative": "\/", "web_course": "http:\/\/lms.permx.htb\/courses\/", "web_main": "http:\/\/lms.permx.htb\/main\/", "web_css": "http:\/\/lms.permx.htb\/web\/css\/", "web_css_theme": "http:\/\/lms.permx.htb\/web\/css\/themes\/chamilo\/", "web_ajax": "http:\/\/lms.permx.htb\/main\/inc\/ajax\/", "web_img": "http:\/\/lms.permx.htb\/main\/img\/", "web_plugin": "http:\/\/lms.permx.htb\/plugin\/", "web_lib": "http:\/\/lms.permx.htb\/main\/inc\/lib\/", "web_upload": "http:\/\/lms.permx.htb\/app\/upload\/", "web_self": "\/index.php", "self_basename": "index.php", "web_query_vars": "", "web_self_query_vars": "\/index.php", "web_cid_query": "", "web_rel_code": "\/main\/" }</script>
```


Symfony Requirements Checker ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ > PHP is using the following php.ini file: /etc/php/7.4/apache2/php.ini > Checking Symfony requirements: ...............W...............W........ [OK] Your system is ready to run Symfony projects Optional recommendations to improve your setup ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ * Requirements file should be up-to-date > Your requirements file is outdated. Run composer install and > re-check your configuration. * intl ICU version installed on your system (70.1) should match the ICU data bundled with Symfony (67.1) > In most cases you should be fine, but please verify there is no > inconsistencies between data provided by Symfony and the intl > extension. See https://github.com/symfony/symfony/issues/15007 > for an example of inconsistencies you might run into. Note The command console could use a different php.ini file ~~~~ than the one used with your web server. To be on the safe side, please check the requirements from your web server using the web/config.php script.


http://lms.permx.htb/documentation/

version of camillo which is the lms being used

found an rce exploit for it www-data


## this password logs onto mtz

$_configuration['db_password'] = '03F6lY3uXAP2bkW8';

database_password: root



changed /etc/passwd to writable for my user and manually added a new user with root priviledges

used openssl passwd 123

to generate DES password hash for the /etc/passwd file


