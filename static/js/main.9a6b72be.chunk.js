(this["webpackJsonpopenapi2postmanv2-frontend"]=this["webpackJsonpopenapi2postmanv2-frontend"]||[]).push([[0],{1010:function(e){e.exports=JSON.parse('{"v":"5.5.1","fr":60,"ip":0,"op":120,"w":81,"h":81,"nm":"icn-loader","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"circle-blue","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":120,"s":[360]}],"ix":10},"p":{"a":0,"k":[40.5,40.5,0],"ix":2},"a":{"a":0,"k":[37.5,37.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-19.054,0],[0,-19.054],[19.054,0],[0,19.054]],"o":[[19.054,0],[0,19.054],[-19.054,0],[0,-19.054]],"v":[[0,-34.5],[34.5,0],[0,34.5],[-34.5,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.187999994615,0.616000007181,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[37.5,37.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.123],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[0]},{"t":120,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.262],"y":[1]},"o":{"x":[0.581],"y":[0]},"t":0,"s":[0]},{"t":120,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":1800,"st":0,"bm":0}],"markers":[]}')},1011:function(e,t,n){"use strict";n.r(t);var a,r,i,c,o,s,l,p,d=n(7),u=n(381),b=n.n(u),j=n(24),x=(n(392),n(41)),h=n(18),f=n.n(h),m=n(382),O=n(39),v=n(383),g=n.n(v),k=n(21),y=n(5),w=function(e){var t=k.b.div(a||(a=Object(j.a)(["\n    padding: 15px;\n    background-color: #f2dede;\n    border: 1px solid #ebccd1;\n    color: #a94442;\n    margin-bottom: 2rem;\n    width: 500px;\n  "])));return Object(y.jsx)(t,{children:e.text})},S=n(387),A=n.n(S),P=function(e){var t={loop:!0,autoplay:!0,animationData:n(1010),rendererSettings:{preserveAspectRatio:"xMidYMid slice"}};return Object(y.jsx)(A.a,{options:t,height:50,width:50})},I=k.b.div(r||(r=Object(j.a)(["\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  width: 300px;\n"]))),T=k.b.button(i||(i=Object(j.a)(["\n  height: 50px;\n"]))),U=function(){var e,t=new URLSearchParams(window.location.search),n=Object(d.useState)({clientId:"",clientSecret:"",environment:"",apiType:null!==(e=t.get("api"))&&void 0!==e?e:"",otherUrl:""}),a=Object(O.a)(n,2),r=a[0],i=a[1],c="Something went wrong, please try again later",o=Object(d.useState)(!1),s=Object(O.a)(o,2),l=s[0],p=s[1],u=Object(d.useState)(!1),b=Object(O.a)(u,2),j=b[0],h=b[1],v=Object(d.useState)(c),k=Object(O.a)(v,2),S=k[0],A=k[1],U="https://stoplight.io/api/v1/projects/publiq/",B="".concat(U,"uitdatabank/nodes/reference/entry.json?deref=optimizedBundle"),q="".concat(U,"uitpas/nodes/reference/UiTPAS.v2.json?deref=optimizedBundle"),E=function(){var e=Object(m.a)(f.a.mark((function e(){var t,n,a,i,o,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("other"!==r.apiType||r.otherUrl.startsWith(U)){e.next=4;break}return h(!0),A("API URL should start with ".concat(U)),e.abrupt("return");case 4:if(""!==r.apiType){e.next=8;break}return h(!0),A("Please select an API from the list"),e.abrupt("return");case 8:e.t0=r.apiType,e.next="udb-entry"===e.t0?11:"uitpas-api"===e.t0?13:"other"===e.t0?15:17;break;case 11:return t=B,e.abrupt("break",18);case 13:return t=q,e.abrupt("break",18);case 15:return t=r.otherUrl,e.abrupt("break",18);case 17:t=B;case 18:return"test","",n={tokenGrantType:"client_credentials",clientId:r.clientId,clientSecret:r.clientSecret},e.prev=21,p(!0),e.next=25,g()(t,"test","",n);case 25:a=e.sent,i=a.info.name||"postman-collection",o=document.createElement("a"),s=new Blob([JSON.stringify(a)],{type:"text/plain"}),o.href=URL.createObjectURL(s),o.download=i+".json",o.click(),e.next=39;break;case 34:e.prev=34,e.t1=e.catch(21),console.log(e.t1),h(!0),A(c);case 39:p(!1);case 40:case"end":return e.stop()}}),e,null,[[21,34]])})));return function(){return e.apply(this,arguments)}}(),D=function(){h(!1),A("")};return Object(y.jsxs)(y.Fragment,{children:[j&&Object(y.jsx)(w,{text:S}),l?Object(y.jsx)(P,{}):Object(y.jsxs)(I,{children:[Object(y.jsx)("div",{children:Object(y.jsx)("input",{class:"u-full-width",type:"text",placeholder:"client id (test environment)",value:r.clientId,onChange:function(e){i(Object(x.a)(Object(x.a)({},r),{},{clientId:e.target.value})),D()}})}),Object(y.jsx)("div",{children:Object(y.jsx)("input",{type:"password",class:"u-full-width",placeholder:"client secret",value:r.clientSecret,onChange:function(e){i(Object(x.a)(Object(x.a)({},r),{},{clientSecret:e.target.value})),D()}})}),Object(y.jsxs)("div",{children:[Object(y.jsx)("label",{for:"apiType",children:"API"}),Object(y.jsxs)("select",{class:"u-full-width",value:r.apiType,onChange:function(e){i(Object(x.a)(Object(x.a)({},r),{},{apiType:e.target.value})),D()},id:"apiType",children:[Object(y.jsx)("option",{value:"",selected:!0,disabled:!0,children:"Select API"}),Object(y.jsx)("option",{value:"udb-entry",children:"UiTdatabank Entry API"}),Object(y.jsx)("option",{value:"uitpas-api",children:"UiTPAS API"}),Object(y.jsx)("option",{value:"other",children:"Other..."})]})]}),"other"===r.apiType&&Object(y.jsx)("div",{children:Object(y.jsx)("input",{class:"u-full-width",type:"text",placeholder:"url",value:r.otherUrl,onChange:function(e){i(Object(x.a)(Object(x.a)({},r),{},{otherUrl:e.target.value})),D()}})}),Object(y.jsx)(T,{onClick:E,className:"button-primary",children:"Download"})]},"form-wrapper")]})},B=function(e){var t=k.b.div(c||(c=Object(j.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    width: 250px;\n    margin: 5rem 0 2.5rem 0;\n  "])));return Object(y.jsxs)(t,{children:[Object(y.jsx)("img",{src:"https://postman.publiq.be/publiq-logo.png",alt:"publiq logo",width:"130"}),Object(y.jsx)("img",{src:"https://postman.publiq.be/postman-logo.png",alt:"postman logo",width:"100"})]})},q=function(e){var t=k.b.div(o||(o=Object(j.a)(["\n    max-width: 500px;\n    background-color: #efefef;\n    padding: 15px 15px 0 15px;\n    border-radius: 5px;\n    margin-bottom: 2.5rem;\n  "]))),n=k.b.p(s||(s=Object(j.a)(["\n    margin-bottom: 15px;\n  "])));return Object(y.jsxs)(t,{children:[Object(y.jsxs)(n,{children:["Ready to start playing around with our APIs? Use the form below to download a personalized"," ",Object(y.jsx)("a",{href:"https://www.postman.com/",target:"_blank",rel:"noreferrer",children:"Postman"})," ","collection and start making API requests to our test environment in a matter of seconds!"]}),Object(y.jsxs)(n,{children:["We also provide extensive"," ",Object(y.jsx)("a",{href:"https://docs.publiq.be",target:"_blank",rel:"noreferrer",children:"API documentation"})," ","with how-to guides, a technical reference for each API endpoint, and info about authentication and error handling."]})]})},E=Object(k.a)(l||(l=Object(j.a)(["\n    p,\n    input,\n    select,\n    button {\n      font-size: 1.5rem;\n    }\n"])));function D(){var e=k.b.div(p||(p=Object(j.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    flex-wrap: wrap;\n  "])));return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)(E,{}),Object(y.jsxs)(e,{className:"App",children:[Object(y.jsx)(B,{}),Object(y.jsx)(q,{}),Object(y.jsx)(U,{})]})]})}var R=document.getElementById("root");b.a.render(Object(y.jsx)(d.StrictMode,{children:Object(y.jsx)(D,{})}),R)},392:function(e,t,n){},425:function(e,t){},428:function(e,t){},430:function(e,t){},495:function(e,t){},870:function(e,t){},872:function(e,t){},905:function(e,t){},906:function(e,t){},911:function(e,t){},913:function(e,t){},920:function(e,t){},939:function(e,t){}},[[1011,1,2]]]);
//# sourceMappingURL=main.9a6b72be.chunk.js.map