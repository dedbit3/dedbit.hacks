___


port 22 and 80 open


*file upload here*
http://hacknet.htb/profile/edit

*gets uploaded here*
http://hacknet.htb/media/cat.jpg


*if i try XSS in username I get 500 server error*
</h1><script>alert("test")</script><h1>



could try sql inject in login


looking like either its that file upload4
or
some XSS since other users
->server just downloads doesn't run

f21