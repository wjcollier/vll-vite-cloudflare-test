import explicitRenderHtml from"./index.html";require("dotenv").config();const SECRET_KEY=process.env.SECRET_KEY;async function handlePost(e){var t=(await e.formData()).get("cf-turnstile-response"),e=e.headers.get("CF-Connecting-IP"),n=new FormData;n.append("secret",SECRET_KEY),n.append("response",t),n.append("remoteip",e);t=await(await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{body:n,method:"POST"})).json();return t.success?new Response("Turnstile token successfully validated. \n"+JSON.stringify(t)):new Response("The provided Turnstile token was not valid! \n"+JSON.stringify(t))}export default{async fetch(e){var t,n;return"POST"===e.method?handlePost(e):"/explicit"===(n=new URL(e.url)).pathname?(t=await explicitRenderHtml(),new Response(t,{headers:{"Content-Type":"text/html"}})):"/"===n.pathname?(t=await explicitRenderHtml(),(n=new Response(t,{headers:{"Content-Type":"text/html"}})).headers.set("Cache-Control","no-store"),n.headers.set("Pragma","no-cache"),n):fetch(e)}};