"use strict";(self.webpackChunkwebsite_operator=self.webpackChunkwebsite_operator||[]).push([[5737],{8213:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return c},contentTitle:function(){return i},metadata:function(){return u},toc:function(){return l},default:function(){return f}});var n=t(3117),o=t(102),s=(t(7294),t(3905)),a=["components"],c={title:"Kubernetes Secrets",description:"Kubernetes Secrets"},i=void 0,u={unversionedId:"Kubernetes-Secrets",id:"Kubernetes-Secrets",isDocsHomePage:!1,title:"Kubernetes Secrets",description:"Kubernetes Secrets",source:"@site/docs/Kubernetes-Secrets.md",sourceDirName:".",slug:"/Kubernetes-Secrets",permalink:"/kubernetes-operator/next/Kubernetes-Secrets",editUrl:"https://github.com/aerospike/kubernetes-operator/edit/main/docs/Kubernetes-Secrets.md",tags:[],version:"current",frontMatter:{title:"Kubernetes Secrets",description:"Kubernetes Secrets"},sidebar:"docsSidebar",previous:{title:"Scaling",permalink:"/kubernetes-operator/next/Scaling"},next:{title:"Delete Aerospike Cluster",permalink:"/kubernetes-operator/next/Delete-Aerospike-cluster"}},l=[{value:"Create a Kubernetes secret for a folder",id:"create-a-kubernetes-secret-for-a-folder",children:[],level:2},{value:"Creating a Kubernetes secret for a user&#39;s password",id:"creating-a-kubernetes-secret-for-a-users-password",children:[],level:2}],p={toc:l};function f(e){var r=e.components,t=(0,o.Z)(e,a);return(0,s.kt)("wrapper",(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Kubernetes secrets are used to store information securely. You can create secrets to set up Aerospike authentication, TLS, and features.conf. See ",(0,s.kt)("a",{parentName:"p",href:"/kubernetes-operator/next/Manage-TLS-Certificates"},"Manage-TLS-Certificates")," for more details."),(0,s.kt)("h2",{id:"create-a-kubernetes-secret-for-a-folder"},"Create a Kubernetes secret for a folder"),(0,s.kt)("p",null,"To create a Kubernetes secret for connectivity to the Aerospike cluster, the Aerospike ",(0,s.kt)("inlineCode",{parentName:"p"},"features.conf")," can be packaged in a single directory and converted to Kubernetes secrets with the following command:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl  -n aerospike create secret generic aerospike-secret --from-file=config/samples/secrets\n")),(0,s.kt)("p",null,"To deploy through the Operator, update the name of the secret in the aerospikeConfigSecret spec of the custom resource that defines the Aerospike cluster. You can also refer to files that are in the folder when you are configuring parameters for the Aerospike cluster in the aerospikeConfig spec of the custom resource. "),(0,s.kt)("h2",{id:"creating-a-kubernetes-secret-for-a-users-password"},"Creating a Kubernetes secret for a user's password"),(0,s.kt)("p",null,"To create a secret containing the password for Aerospike cluster admin user by passing the password from the command line:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl  -n aerospike create secret generic auth-secret --from-literal=password='admin123'\n")),(0,s.kt)("p",null,"To deploy with the Operator, you must include the names of the secrets for each user in the custom resource file. For example, suppose that you want to give two users access to the Aerospike cluster. For the first user, you create a secret named auth-secret. For the second user, you create a secret named user1-secret. To enable security for the cluster:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"spec:\n  .\n  .\n  enable-security: true\n  .\n  aerospikeAccessControl:\n    users:\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n      - name: user1\n        secret-name: user1-secret\n        roles:\n          - data-admin\n  .\n  .\n")),(0,s.kt)("p",null,"For guidelines to follow when creating passwords, refer to ",(0,s.kt)("a",{parentName:"p",href:"https://docs.aerospike.com/docs/configure/security/access-control/index.md#local-to-aerospike-passwords"},'"Local-to-Aerospike passwords"'),"."))}f.isMDXComponent=!0},3905:function(e,r,t){t.d(r,{Zo:function(){return l},kt:function(){return d}});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)t=s[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=n.createContext({}),u=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},l=function(e){var r=u(e.components);return n.createElement(i.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,s=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),f=u(t),d=o,m=f["".concat(i,".").concat(d)]||f[d]||p[d]||s;return t?n.createElement(m,a(a({ref:r},l),{},{components:t})):n.createElement(m,a({ref:r},l))}));function d(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var s=t.length,a=new Array(s);a[0]=f;var c={};for(var i in r)hasOwnProperty.call(r,i)&&(c[i]=r[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var u=2;u<s;u++)a[u]=t[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"}}]);