___


MongoDB

Much like MySQL, MariaDB, or PostgreSQL, MongoDB is another database where you can store data in an ordered way. MongoDB allows you to retrieve subsets of data in a quick and structured form. If you are familiar with relational databases, you can assume MongoDB works similarly to any other database. The major exception is that the information isn't stored on tables but rather in documents.  

You can think of these documents as a simple dictionary structure where key-value pairs are stored. In a way, they are very similar to what you would call a record on a traditional relational database, but the information is just stored differently. For example, let's say we are creating a web application for the HR department, and we would like to store basic employee information. You would then create a document for each employee containing the data in a format that looks like this:

`{"_id" : ObjectId("5f077332de2cdf808d26cd74"), "username" : "lphillips", "first_name" : "Logan", "last_name" : "Phillips", "age" : "65", "email" : "lphillips@example.com" }`  

As you see, documents in MongoDB are stored in an associative array with an arbitrary number of fields.  

MongoDB allows you to group multiple documents with a similar function together in higher hierarchy structures called collections for organizational purposes. Collections are the equivalent of tables in relational databases. Continuing with our HR example, all the employee's documents would be conveniently grouped in a collection called "people" as shown in the diagram below.

![MongoDB Collection](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1719679544440.png)

Multiple collections are finally grouped in databases, which is the highest hierarchical element in MongoDB. In relational databases, the database concept groups tables together. In MongoDB, it groups related collections.

![MongoDB Collection](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1719679596244.png)  

Querying the Database

As with any database, a special language is used to retrieve information from the database. Just as relational databases use some variant of SQL, non-relational databases such as MongoDB use NoSQL. In general terms, NoSQL refers to any way of querying a database that is not SQL, meaning it may vary depending on the database used.  

With MongoDB, queries use a structured associative array that contains groups of criteria to be met to filter the information. These filters offer similar functionality to a WHERE clause in SQL and offer operators the ability to build complex queries if needed.

To better understand NoSQL queries, let's start by assuming we have a database with a collection of people containing the following three documents:

![MongoDB Collection](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1719679617512.png)  

If we wanted to build a filter so that only the documents where the last_name is "Sandler" are retrieved, our filter would look like this:  

`**['last_name' => 'Sandler']**`

As a result, this query only retrieves the second document.

If we wanted to filter the documents where the gender is male, and the last_name is Phillips, we would have the following filter:

`**['gender' => 'male', 'last_name' => 'Phillips']**`

This would only return the first document.

If we wanted to retrieve all documents where the age is less than 50, we could use the following filter:

`**['age' => ['$lt'=>'50']]**`

This would return the second and third documents. Notice we are using the **$lt** operator in a nested array. Operators allow for more complex filters by nesting conditions. A complete reference of possible operators can be found on the following link:




# NoSQL Injection

Injection is Injection

While it may seem complex to think about NoSQL Injection, when we boil down injection attacks to their very essence, we can understand the similarities between SQL Injection and NoSQL Injection.

The root cause of an injection attack is that improper concatenation of untrusted user input into a command can allow an attacker to alter the command itself. With SQL injection, the most common approach is to inject a single or double quote, that terminates the current data concatenation and allows the attacker to modify the query. The same approach applies to NoSQL Injection. If untrusted user input is directly added to the query, we have the opportunity to modify the query itself. However, with NoSQL Injection, even if we can't escape the current query, we still have the opportunity to manipulate the query itself. Therefore, there are two main types of NoSQL Injection:

- **Syntax Injection** - This is similar to SQL injection, where we have the ability to break out of the query and inject our own payload. The key difference to SQL injection is the syntax used to perform the injection attack.
- **Operator Injection**—Even if we can't break out of the query, we could potentially inject a NoSQL query operator that manipulates the query's behaviour, allowing us to stage attacks such as authentication bypasses.

In this room, our main focus will be on Operator Injection and the different ways it can be leveraged. This is because it is not as common to find Syntax Injection cases as most libraries used to create the queries apply filters that prevent you from injection into the syntax. However, since user input can vary, these same filters can often be vulnerable to Operator Injection. However, we will cover a Syntax Injection example at the end of the room.  

How to Inject NoSQL

When looking at how NoSQL filters are built, bypassing them to inject any payload might look impossible, as they rely on creating a structured array. Unlike SQL injection, where queries were normally built by simple string concatenation, NoSQL queries require nested associative arrays. From an attacker's point of view, this means that to inject NoSQL, one must be able to inject arrays into the application.  

Luckily for us, many server-side programming languages allow passing array variables by using a special syntax on the query string of an HTTP Request. For the purpose of this example, let's focus on the following code written in PHP for a simple login page:

```php
<?php
$con = new MongoDB\Driver\Manager("mongodb://localhost:27017");


if(isset($_POST) && isset($_POST['user']) && isset($_POST['pass'])){
        $user = $_POST['user'];
        $pass = $_POST['pass'];

        $q = new MongoDB\Driver\Query(['username'=>$user, 'password'=>$pass]);
        $record = $con->executeQuery('myapp.login', $q );
        $record = iterator_to_array($record);

        if(sizeof($record)>0){
                $usr = $record[0];

                session_start();
                $_SESSION['loggedin'] = true;
                $_SESSION['uid'] = $usr->username;

                header('Location: /sekr3tPl4ce.php');
                die();
        }
}
header('Location: /?err=1');

?>
```

The web application is making a query to MongoDB, using the "**myapp**" database and "**login**" collection, requesting any document that passes the filter `**['username'=>$user, 'password'=>$pass]**`, where both **$user** and **$pass** are obtained directly from HTTP POST parameters. Let's take a look at how we can leverage Operator Injection in order to bypass authentication.  

If somehow we could send an array to the **$user** and **$pass** variables with the following content:  

`**$user = ['$ne'=>'xxxx']**` 

`**$pass = ['$ne'=>'yyyy']**` 

The resulting filter would end up looking like this:  

`**['username'=>['$ne'=>'xxxx'], 'password'=>['$ne'=>'yyyy']]**`

We could trick the database into returning any document where the username isn't equal to '**xxxx**,' and the password isn't equal to '**yyyy**'. This would probably return all documents in the login collection. As a result, the application would assume a correct login was performed and let us into the application with the privileges of the user corresponding to the first document obtained from the database.

The problem that remains unsolved is how to pass an array as part of a POST HTTP Request. It turns out that PHP and many other languages allow you to pass an array by using the following notation on the POST Request Body:

`**user[$ne]=xxxx&pass[$ne]=yyyy**`

So let's fire up our favourite proxy and try to test this. For this guide we will be using Burp Proxy.



# Logging in as Other Users

We have managed to bypass the application's login screen, but with the former technique, we can only login as the first user returned by the database. By making use of the $nin operator, we are going to modify our payload so that we can control which user we want to obtain.

First, the $nin operator allows us to create a filter by specifying criteria where the desired documents have some field, not in a list of values. So if we want to log in as any user except for the user admin, we could modify our payload to look like this:

![Burp Request](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1719679859318.png)  

This would translate to a filter that has the following structure:

`**['username'=>['$nin'=>['admin'] ], 'password'=>['$ne'=>'aweasdf']]**`

Which tells the database to return any user for whom the username isn't admin and the password isn't aweasdf. As a result, we are now granted access to another user's account.

Notice that the $nin operator receives a list of values to ignore. We can continue to expand the list by adjusting our payload as follows:

![Burp Request](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1719679886213.png)  

This would result in a filter like this:  

`**['username'=>['$nin'=>['admin', 'jude'] ], 'password'=>['$ne'=>'aweasdf']]**`

This can be repeated as many times as needed until we gain access to all of the available accounts.

**Note: The `jude` user above is not an actual user, but an example of how an additional username can be added.**




# Extracting Users' Passwords

At this point, we have access to all of the accounts in the application. However, it is important to try to extract the actual passwords in use as they might be reused in other services. To accomplish this, we will be abusing the $regex operator to ask a series of questions to the server that allow us to recover the passwords via a process that resembles playing the game hangman.

First, let's take one of the users discovered before and try to guess the length of his password. We will be using the following payload to do that:

![Burp Request](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1719679978838.png)  

Notice that we are asking the database if there is a user with a username of admin and a password that matches the regex: `**^.{7}$**`. This basically represents a wildcard word of length 7. Since the server responds with a login error, we know the password length for the user admin isn't 7. After some trial and error, we finally arrived at the correct answer:

![Burp Request](https://tryhackme-images.s3.amazonaws.com/user-uploads/5ed5961c6276df568891c3ea/room-content/617be9330b818bf2ed2c31f779be7c17.png)  

We now know the password for user admin has length 5. Now to figure out the actual content, we modify our payload as follows:

![Burp Request](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1719679996762.png)  

We are now working with a regex of length 5 (a single letter c plus 4 dots), matching the discovered password length, and asking if the admin's password matches the regex `^c....$`, which means it starts with a lowercase c, followed by any 4 characters. Since the server response is an invalid login, we now know the first letter of the password can't be "c". We continue iterating over all available characters until we get a successful response from the server:

![Burp Request](https://tryhackme-images.s3.amazonaws.com/user-uploads/6093e17fa004d20049b6933e/room-content/6093e17fa004d20049b6933e-1719680018918.png)  

This confirms that the first letter of admin's password is 'a'. The same process can be repeated for the other letters until the full password is recovered. This can be repeated for other users as well if needed.




# Finding Syntax Injection  

Now that we have covered Operator Injection, let's take a look at a Syntax Injection example. A Python application is running to allow you to receive the email address of any username that is provided. To use the application, authenticate via SSH using `ssh syntax@10.201.64.79` along with the credentials below:

![THM key](https://tryhackme-images.s3.amazonaws.com/user-uploads/5ed5961c6276df568891c3ea/room-content/5d471dd234b7fc4eb4edea3c934663c1.png)

|   |   |
|---|---|
|**Username**|syntax|
|**Password**|syntax|

Once authenticated, you can provide a username as input. Let's start by simply providing `admin`:

**Terminal**

```shell
ssh syntax@10.201.64.79
syntax@10.201.64.79's password: 
Please provide the username to receive their email:admin
admin@nosql.int
Connection to 10.201.64.79 closed.
```

We can start to test for Syntax Injection by simply injecting a `'` character, which will result in the error seen in the response below:

**Terminal**

```shell
syntax@10.201.64.79's password: 
Please provide the username to receive their email:admin'
Traceback (most recent call last):
  File "/home/syntax/script.py", line 17, in <module>
    for x in mycol.find({"$where": "this.username == '" + username + "'"}):
  File "/usr/local/lib/python3.6/dist-packages/pymongo/cursor.py", line 1248, in next
    if len(self.__data) or self._refresh():
  File "/usr/local/lib/python3.6/dist-packages/pymongo/cursor.py", line 1165, in _refresh
    self.__send_message(q)
  File "/usr/local/lib/python3.6/dist-packages/pymongo/cursor.py", line 1053, in __send_message
    operation, self._unpack_response, address=self.__address
  File "/usr/local/lib/python3.6/dist-packages/pymongo/mongo_client.py", line 1272, in _run_operation
    retryable=isinstance(operation, message._Query),
  File "/usr/local/lib/python3.6/dist-packages/pymongo/mongo_client.py", line 1371, in _retryable_read
    return func(session, server, sock_info, read_pref)
  File "/usr/local/lib/python3.6/dist-packages/pymongo/mongo_client.py", line 1264, in _cmd
    sock_info, operation, read_preference, self._event_listeners, unpack_res
  File "/usr/local/lib/python3.6/dist-packages/pymongo/server.py", line 134, in run_operation
    _check_command_response(first, sock_info.max_wire_version)
  File "/usr/local/lib/python3.6/dist-packages/pymongo/helpers.py", line 180, in _check_command_response
    raise OperationFailure(errmsg, code, response, max_wire_version)
pymongo.errors.OperationFailure: Failed to call method, full error: {'ok': 0.0, 'errmsg': 'Failed to call method', 'code': 1, 'codeName': 'InternalError'}
Connection to 10.201.64.79 closed.
```

The following line in the error message shows us that there is Syntax Injection:

`for x in mycol.find({"$where": "this.username == '" + username + "'"}):`

We can see that the username variable is directly concatenated to the query string and that a JavaScript function is being executed in the find command, allowing us to inject into the syntax. In this case, we have verbose error messages to give us an indication that injection is possible. However, even without verbose error messages, we could test for Syntax Injection by providing both a false and true condition and seeing that the output differs, as shown in the example below:

**Terminal**

```shell
ssh syntax@10.201.64.79
syntax@10.201.64.79's password: 
Please provide the username to receive their email:admin' && 0 && 'x
Connection to 10.201.64.79 closed.

ssh syntax@10.201.64.79
syntax@10.201.64.79's password: 
Please provide the username to receive their email:admin' && 1 && 'x
admin@nosql.int
Connection to 10.201.64.79 closed.
```

Exploiting Syntax Injection

Now that we have confirmed Syntax Injection, we can leverage this injection point to dump all email addresses. To do this, we want to ensure that the testing statement of the condition always evaluates to true. As we are injecting into the JavaScript, we can use the payload of  `'||1||'`. Let's use this to disclose sensitive information:

**Terminal**

```shell
ssh syntax@10.201.64.79
syntax@10.201.64.79's password: 
Please provide the username to receive their email:admin'||1||'
admin@nosql.int
pcollins@nosql.int
jsmith@nosql.int
[...]
Connection to 10.201.64.79 closed.
```

The Exception to the Rule

It is worth noting that for Syntax Injection to occur, the developer has to create custom JavaScript queries. The same function could be performed using the built-in filter functions where `['username' : username]` would return the same result but not be vulnerable to injection. As such, Syntax Injection is rare to find, as it means that the developers are not using the built-in functions and filters. While some complex queries might require direct JavaScript, it is always recommended to avoid this to prevent Syntax Injection. The example shown above is for MongoDB; for other NoSQL solutions, similar Syntax Injection cases may exist, but the actual syntax will be different.



