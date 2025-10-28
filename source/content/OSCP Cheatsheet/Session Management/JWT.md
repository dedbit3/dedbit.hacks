

JWTs are self-contained tokens that can be used to securely transmit session information. It is an [open standard](https://tools.ietf.org/html/rfc7519), providing information for any developer or library creator who wants to use JWTs. The JWT structure is shown in the animation below:

JWT Structure

A JWT consists of three components, each Base64Url encoded and separated by dots:

- **Header** - The header usually indicates the type of token, which is JWT, as well as the signing algorithm that is used.
- **Payload** - The payload is the body of the token, which contain the claims. A claim is a piece of information provided for a specific entity. In JWTs, there are registered claims, which are claims predefined by the JWT standard and public or private claims. The public and private claims are those which are defined by the developer. It is worth knowing the difference between public and private claims, but not for security purposes, hence this will not be our focus in this room.
- **Signature** - The signature is the part of the token that provides a method for verifying the token's authenticity. The signature is created by using the algorithm specified in the header of the JWT. Let's dive a bit into the main signing algorithms.

Signing Algorithms

Although there are several different algorithms defined in the JWT standard, we only really care about three main ones:

- **None** - The None algorithm means no algorithm is used for the signature. Effectively, this is a JWT without a signature, meaning that the verification of the claims provided in the JWT cannot be verified through the signature.
- **Symmetric Signing** - A symmetric signing algorithm, such as HS256, creates the signature by appending a secret value to the header and body of the JWT before generating a hash value. Verification of the signature can be performed by any system that has knowledge of the secret key.
- **Asymmetric Signing** - An asymmetric signing algorithm, such as RS256, creates the signature by using a private key to sign the header and body of the JWT. This is created by generating the hash and then encrypting the hash using the private key. Verification of the signature can be performed by any system that has knowledge of the public key associated with the private key that was used to create the signature.

Security in the Signature

JWTs can be encrypted (called JWEs), but the key power of JWTs comes from the signature. Once a JWT is signed, it can be sent to the client, who can use this JWT wherever needed. We can have a centralised authentication server that creates the JWTs used on several applications. Each application can then verify the signature of the JWT; if verified, the claims provided within the JWT can be trusted and acted upon.




# Signatures

JWTs are self-contained tokens that can be used to securely transmit session information. It is an [open standard](https://tools.ietf.org/html/rfc7519), providing information for any developer or library creator who wants to use JWTs. The JWT structure is shown in the animation below:

JWT Structure

A JWT consists of three components, each Base64Url encoded and separated by dots:

- **Header** - The header usually indicates the type of token, which is JWT, as well as the signing algorithm that is used.
- **Payload** - The payload is the body of the token, which contain the claims. A claim is a piece of information provided for a specific entity. In JWTs, there are registered claims, which are claims predefined by the JWT standard and public or private claims. The public and private claims are those which are defined by the developer. It is worth knowing the difference between public and private claims, but not for security purposes, hence this will not be our focus in this room.
- **Signature** - The signature is the part of the token that provides a method for verifying the token's authenticity. The signature is created by using the algorithm specified in the header of the JWT. Let's dive a bit into the main signing algorithms.

Signing Algorithms

Although there are several different algorithms defined in the JWT standard, we only really care about three main ones:

- **None** - The None algorithm means no algorithm is used for the signature. Effectively, this is a JWT without a signature, meaning that the verification of the claims provided in the JWT cannot be verified through the signature.
- **Symmetric Signing** - A symmetric signing algorithm, such as HS256, creates the signature by appending a secret value to the header and body of the JWT before generating a hash value. Verification of the signature can be performed by any system that has knowledge of the secret key.
- **Asymmetric Signing** - An asymmetric signing algorithm, such as RS256, creates the signature by using a private key to sign the header and body of the JWT. This is created by generating the hash and then encrypting the hash using the private key. Verification of the signature can be performed by any system that has knowledge of the public key associated with the private key that was used to create the signature.

Security in the Signature

JWTs can be encrypted (called JWEs), but the key power of JWTs comes from the signature. Once a JWT is signed, it can be sent to the client, who can use this JWT wherever needed. We can have a centralised authentication server that creates the JWTs used on several applications. Each application can then verify the signature of the JWT; if verified, the claims provided within the JWT can be trusted and acted upon.




# attacking JWT's


The second common mistake with JWTs is not correctly verifying the signature. If the signature isn't correctly verified, a threat actor may be able to forge a valid JWT token to gain access to another user's account. Let's examine the common signature verification issues.

Not Verifying the Signature

The first issue with signature validation is when there is no signature validation. If the server does not verify the signature of the JWT, then it is possible to modify the claims in the JWT to whatever you prefer them to be. While it is uncommon to find APIs where no signature validation is performed, signature validation may have been omitted from a single endpoint within the API. Depending on the sensitivity of the endpoint, this can have a significant business impact.

**Practical Example 2**  

Let's authenticate to the API:

`curl -H 'Content-Type: application/json' -X POST -d '{ "username" : "user", "password" : "password2" }' http://10.201.104.125/api/v1.0/example2`  

Once authenticated, let's verify our user:

`curl -H 'Authorization: Bearer [JWT Token]' http://10.201.104.125/api/v1.0/example2?username=user`  

However, let's try to verify our user without the signature, remove the third part of the JWT (leaving only the dot) and make the request again. You will see that the verification still works! This means that the signature is not being verified. Modify the admin claim in the payload to be `1` and try to verify as the admin user to retrieve your flag.  

**The Development Mistake**

In the example, the signature is not being verified, as shown below:

```python
payload = jwt.decode(token, options={'verify_signature': False})
```

﻿While it is rare to see this on normal APIs, it often happens on server-to-server APIs. In cases where a threat actor has direct access to the backend server, JWTs can be forged.  

**The Fix**  

The JWT should always be verified or additional authentication factors, such as certificates, should be used for server-to-server communication. The JWT can be verified by providing the secret (or public key), as shown in the example below:

```python
payload = jwt.decode(token, self.secret, algorithms="HS256")
```

Downgrading to None

Another common issue is a signature algorithm downgrade. JWTs support the `None` signing algorithm, which effectively means that no signature is used with the JWT. While this may sound silly, the idea behind this in the standard was for server-to-server communication, where the signature of the JWT was verified in an upstream process. Therefore, the second server would not be required to verify the signature. However, suppose the developers do not lock in the signature algorithm or, at the very least, deny the `None` algorithm. In that case, you can simply change the algorithm specified in your JWT as `None`, which would then cause the library used for signature verification to always return true, thus allowing you again to forge any claims within your token.

**Practical Example 3  
**

Authenticate to the API to receive your JWT and then verify your user. To perform this attack, you will need to manually alter the  the `alg` claim in the header to be `None`. You can use [CyberChef](https://gchq.github.io/CyberChef/) for this making use of the URL-Encoded Base64 option. Submit the JWT again to verify that it is still accepted, even if the signature is no longer valid, as changes have been made. You can then alter the `admin` claim to recover the flag.  

**The Development Mistake**

While this may seem like the same issue as before, from a development perspective, it is slightly more complex. Sometimes, developers want to ensure their implementation accepts several JWT signature verification algorithms. The implementation would then usually read the header of the JWT and parse found alg into the signature verification component, as shown below:

```python
header = jwt.get_unverified_header(token)

signature_algorithm = header['alg']

payload = jwt.decode(token, self.secret, algorithms=signature_algorithm)
```

However, when the threat actor specified `None` as the algorithm, signature verification is bypassed. [Pyjwt](https://pyjwt.readthedocs.io/en/stable/), the JWT library used in this room, has implemented security coding to prevent this issue. If a secret is specified when the None algorithm is selected, an exception is raised.

**The Fix**  

If multiple signature algorithms should be supported, the supported algorithms should be supplied to the decode function as an array list, as shown below:

```python
payload = jwt.decode(token, self.secret, algorithms=["HS256", "HS384", "HS512"])

username = payload['username']
flag = self.db_lookup(username, "flag")
```

Weak Symmetric Secrets

If a symmetric signing algorithm is used, the security of the JWT relies on the strength and entropy of the secret used. If a weak secret is used, it may be possible to perform offline cracking to recover the secret. Once the secret value is known, you can again alter the claims in your JWT and recalculate a valid signature using the secret.

**Practical Example 4  
**

For this example, a weak secret was used to generate the JWT. Once you receive a JWT, you have several options to crack the secret. For our example, we will talk about using [Hashcat](https://hashcat.net/hashcat/) to crack the JWT's secret. You could also use other solutions such as [John](https://www.openwall.com/john/) as well. You can use the following steps to crack the secret:

1. Save the JWT to a text file called jwt.txt.
2. Download a common JWT secret list. For this room, you can use `wget https://raw.githubusercontent.com/wallarm/jwt-secrets/master/jwt.secrets.list` to download such a list.
3. Use Hashcat to crack the secret using `hashcat -m 16500 -a 0 jwt.txt jwt.secrets.list`

Once you know what the secret is, you can forge a new admin token to recover the flag!  

**The Development Mistake**

The issue occurs when a weak JWT secret is used. This can often occur when developers are in a hurry or copy code from examples.

**The Fix**  

A secure secret value should be selected. As this value will be used in software and not by humans, a long, random string should be used for the secret.

Signature Algorithm Confusion

The last common issue with signature validation is when an algorithm confusion attack can be performed. This is similar to the `None` downgrade attack, however, it specifically happens with confusion between symmetric and asymmetric signing algorithms. If an asymmetric signing algorithm, for example, RS256 is used, it may be possible to downgrade the algorithm to HS256. In these cases, some libraries would default back to using the public key as the secret for the symmetric signing algorithm. Since the public key can be known, you can forge a valid signature by using the HS256 algorithm in combination with the public key.

**Practical Example 5  
**

This is similar to example 3. Except this time, the None algorithm is not allowed. However, once you authenticate to the example, you will also receive the public key. As the public key isn't regarded as sensitive, it is common to find the public key. Sometimes, the public key is even embedded as a claim in the JWT. In this example, you must downgrade the algorithm to HS256 and then use the public key as the secret to sign the JWT. You can use the script provided below to assist you in forging this JWT:

```python
import jwt

public_key = "ADD_KEY_HERE"

payload = {
    'username' : 'user',
    'admin' : 0
}

access_token = jwt.encode(payload, public_key, algorithm="HS256")
print (access_token)
```

Note: We recommend that you use the AttackBox for this practical example since Pyjwt is already installed for you. Before running the script, edit the file `/usr/lib/python3/dist-packages/jwt/algorithms.py` using your favorite text editor and go to line `143`. Then proceed to comment out lines `143-146` and run the script. If you are using your own VM, you may have to install Pyjwt (`pip3 install pyjwt`) to use this script. You will also need to tamper with the Pyjwt library's algorithm.py file on line `258` to remove the `is_ssh_key` condition as a patch for this vulnerability was released. Keep in mind that this placement can vary per VM and installation. An easier method if you are not comfortable with library code edits is to make use of [jwt.io](https://jwt.io). Once you verify it works, you can alter the claims to make yourself an admin and recover the flag.  

**The Development Mistake**

The mistake in this example is similar to that of example 3 but a bit more complex. While the None algorithm is disallowed, the key issue stems from both symmetric and asymmetric signature algorithms being allowed, as shown in the example below:

```python
payload = jwt.decode(token, self.secret, algorithms=["HS256", "HS384", "HS512", "RS256", "RS384", "RS512"])
```

Care should be given never to mix signature algorithms together as the secret parameter of the decode function can be confused between being a secret or a public key.

**The Fix**  

While both types of signature algorithms can be allowed, a bit more logic is required to ensure that there is no confusion, as shown in the example below:

```python
header = jwt.get_unverified_header(token)

algorithm = header['alg']
payload = ""

if "RS" in algorithm:
    payload = jwt.decode(token, self.public_key, algorithms=["RS256", "RS384", "RS512"])
elif "HS" in algorithm:
    payload = jwt.decode(token, self.secret, algorithms=["HS256", "HS384", "HS512"])

username = payload['username']
flag = self.db_lookup(username, "flag")
```




# Token Lifetime


Token Lifetime

Before verifying the signature of the token, the lifetime of the token should be calculated to ensure that the token has not expired. This is usually performed by reading the `exp` (expiration time) claim from the token and calculating if the token is still valid.

A common issue is if the `exp` value is set too large (or not set at all), the token would be valid for too long or might even never expire. With cookies, the cookie can be expired server-side. However, JWTs do not have this same feature built-in. If we want to expire a token before the `exp` time, we must keep a blocklist of these tokens, breaking the model of decentralised applications using the same authentication server. Therefore, the care should be given to choose the correct `exp` value, given the application's functionality. For example, a different `exp` value is probably used between a mail server and a banking application.

Another approach is to use refresher tokens. If you are going to test an  API that uses JWTs, it is recommended that you do some research into these.

**Practical Example 6  
**

In this example, the JWT implementation did not specify an exp value, meaning tokens are permanently persistent. Use the token below to recover your flag:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJhZG1pbiI6MX0.ko7EQiATQQzrQPwRO8ZTY37pQWGLPZWEvdWH0tVDNPU`  

**The Development Mistake**

As mentioned above, the JWT does not have an `exp` value, meaning it will be persistent. In the event that an `exp` claim isn't present, most JWT libraries would accept the token as valid if the signature is verified.  

**The Fix**  

An `exp` value should be added to the claims. Once added, most libraries will include reviewing the expiry time of the JWT into their checks for validity. This can be done as shown in the example below:

```python
lifetime = datetime.datetime.now() + datetime.timedelta(minutes=5)

payload = {
    'username' : username,
    'admin' : 0,
    'exp' : lifetime
}

access_token = jwt.encode(payload, self.secret, algorithm="HS256")
```




# Cross-Service Relay attacks

**The last common misconfiguration we will review is a Cross-Service misconfiguration. As mentioned before, JWTs are often used in systems with a centralised authentication system that serves multiple applications. However, in some cases, we may want to restrict which applications are accessed with a JWT, especially when there are claims that should only be valid for certain applications. This can be done by using the audience claim. However, if the audience claim isn't correctly enforced, a Cross-Service Relay attack can be executed to perform a privilege escalation attack.

The Audience Claim

JWTs can have an audience claim. In cases where a single authentication system serves multiple applications, the audience claim can indicate which application the JWT is intended for. However, the enforcement of this audience claim has to occur on the application itself, not the authentication server. If this claim is not verified, as the JWT itself is still regarded as valid through signature verification, it can have unintended consequences.

An example of this is if a user has admin privileges or a higher role on a certain application. The JWT allocated to the user usually has a claim that indicates this, such as `"admin" : true`. However, that same user is perhaps not an admin on a different application served by the same authentication system. If the audience claim is not verified on this second application, which also makes use of its admin claim, the server may mistakenly believe that the user has admin privileges. This is called a Cross-Service Relay attack, as shown in the animation below:

Let's take a look at a practical example.

**Practical Example 7  
**

For this last practical example, there are two API endpoints namely `example7_appA` and `example7_appB`. You can use the same GET request you made in the previous examples to recover the flag, but you will need to point it to these endpoints. Furthermore, for authentication, you now also have to include the `"application" : "appX"` data value in the login request made to `example7`. Use the following steps to perform the example:

1. Authenticate to `example7` using the following data segment: `'{ "username" : "user", "password" : "password7", "application" : "appA"}'`. You will notice that an audience claim is added, but that you are not an admin.  
    
2. Use this token in both the admin and user requests you make to `example7_appA` and `example7_appB`. You will notice that while appA accepts the token, you are not an admin, and appB does not accept the token as the audience is incorrect.
3. Authenticate to `example7` using the following data segment: `'{ "username" : "user", "password" : "password7", "application" : "appB"}'`. You will notice that an audience claim is added again and you are an admin this time.
4. Use this token again to verify yourself on both applications and see what happens.

You can use this to now recover your flag.

**The Development Mistake**

The key issue is that the audience claim is not being verified on appA. This can be either because audience claim verification has been turned off or the audience scope has been set too wide.  

**The Fix**

The audience claim should be verified when the token is decoded. This can be done as shown in the example below:

```python
payload = jwt.decode(token, self.secret, audience=["appA"], algorithms="HS256")
```


# Conclusion

In this room, several common misconfigurations and vulnerabilities with JWT implementations were showcased. As a summary, take note of the following:

- As JWTs are sent client-side and encoded, sensitive information should not be stored in their claims.
- The JWT is only as secure as its signature. Care should be taken when verifying the signature to ensure that there is no confusion or weak secrets being used.
- JWTs should expire and have sensible lifetimes to avoid persistent JWTs being used by a threat actor.
- In SSO environments, the audience claim is crucial to ensure that the specific application's JWT is only used on that application.
- As JWTs make use of cryptography to generate the signature, cryptographic attacks can also be relevant for JWT exploitation. We will dive into this a bit more in our cryptography module.  
    
- In this room, we did not cover a JWKS spoofing attack. If you are interested in performing this exploit, take a look at [this room](https://tryhackme.com/r/room/hammer).

