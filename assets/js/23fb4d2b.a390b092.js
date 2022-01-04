"use strict";(self.webpackChunkwebsite_operator=self.webpackChunkwebsite_operator||[]).push([[5823],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return d}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=u(r),d=o,f=m["".concat(s,".").concat(d)]||m[d]||c[d]||a;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7234:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return p},default:function(){return m}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],l={title:"System Requirements",description:"System Requirements"},s=void 0,u={unversionedId:"System-Requirements",id:"System-Requirements",title:"System Requirements",description:"System Requirements",source:"@site/docs/System-Requirements.md",sourceDirName:".",slug:"/System-Requirements",permalink:"/kubernetes-operator/System-Requirements",editUrl:"https://github.com/aerospike/kubernetes-operator/edit/main/docs/System-Requirements.md",tags:[],version:"current",frontMatter:{title:"System Requirements",description:"System Requirements"},sidebar:"docsSidebar",previous:{title:"Aerospike Kubernetes Operator",permalink:"/kubernetes-operator/"},next:{title:"Install the Operator",permalink:"/kubernetes-operator/install-operator"}},p=[{value:"Local Computer",id:"local-computer",children:[{value:"Install the Operator SDK CLI",id:"install-the-operator-sdk-cli",children:[],level:3}],level:2}],c={toc:p};function m(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The Aerospike Kubernetes Operator deploys and manages Aerospike Database Enterprise Edition, versions 4.9.0 to 5.7.0.8.  "),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Although the Aerospike Kubernetes Operator can be used to deploy Aerospike Community Edition, most of the Operator's features are only compatible with Aerospike Enterprise Edition."))),(0,a.kt)("p",null,"The Operator is supported on:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Kubernetes 1.16, 1.17, 1.18, 1.19, 1.20, 1.21, and 1.22"),(0,a.kt)("li",{parentName:"ul"},"Openshift 4.6, 4.7, and 4.8")),(0,a.kt)("p",null,"On the following platforms:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Amazon Elastic Kubernetes Service"),(0,a.kt)("li",{parentName:"ul"},"Google Kubernetes Engine"),(0,a.kt)("li",{parentName:"ul"},"Microsoft Azure Kubernetes Service"),(0,a.kt)("li",{parentName:"ul"},"Locally via Minikube or Minik8s")),(0,a.kt)("h2",{id:"local-computer"},"Local Computer"),(0,a.kt)("p",null,"Your local computer (the computer where you will be running kubectl commands) needs:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"kubectl v1.11.3+"),(0,a.kt)("li",{parentName:"ul"},"A copy of the files in the Aerospike Kubernetes Operator GitHub repo"),(0,a.kt)("li",{parentName:"ul"},"Operator SDK CLI version 1.10.1")),(0,a.kt)("h3",{id:"install-the-operator-sdk-cli"},"Install the Operator SDK CLI"),(0,a.kt)("p",null,"Install operator-sdk version 1.10.1 using the installation ",(0,a.kt)("a",{parentName:"p",href:"https://v1-10-x.sdk.operatorframework.io/docs/installation/"},"guide")))}m.isMDXComponent=!0}}]);