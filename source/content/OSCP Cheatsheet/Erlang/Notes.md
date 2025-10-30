___

*Erlang port mapper daemon*
---

*listing nodes on epmd*
`echo -n -e “\x00\x01\x6e” | nc -vn <IP> 4369`


*nmap enum script*
```
sudo nmap -sV -Pn -n -T4 -p 4369 --script epmd-info 10.10.11.86
```






















