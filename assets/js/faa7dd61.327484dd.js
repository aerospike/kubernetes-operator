"use strict";(self.webpackChunkwebsite_operator=self.webpackChunkwebsite_operator||[]).push([[3291],{3905:function(e,r,n){n.d(r,{Zo:function(){return c},kt:function(){return d}});var a=n(7294);function t(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function s(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?s(Object(n),!0).forEach((function(r){t(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function l(e,r){if(null==e)return{};var n,a,t=function(e,r){if(null==e)return{};var n,a,t={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],r.indexOf(n)>=0||(t[n]=e[n]);return t}(e,r);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}var i=a.createContext({}),p=function(e){var r=a.useContext(i),n=r;return e&&(n="function"==typeof e?e(r):o(o({},r),e)),n},c=function(e){var r=p(e.components);return a.createElement(i.Provider,{value:r},e.children)},m={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},u=a.forwardRef((function(e,r){var n=e.components,t=e.mdxType,s=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),d=t,k=u["".concat(i,".").concat(d)]||u[d]||m[d]||s;return n?a.createElement(k,o(o({ref:r},c),{},{components:n})):a.createElement(k,o({ref:r},c))}));function d(e,r){var n=arguments,t=r&&r.mdxType;if("string"==typeof e||t){var s=n.length,o=new Array(s);o[0]=u;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l.mdxType="string"==typeof e?e:t,o[1]=l;for(var p=2;p<s;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1318:function(e,r,n){n.r(r),n.d(r,{frontMatter:function(){return l},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return c},default:function(){return u}});var a=n(7462),t=n(3366),s=(n(7294),n(3905)),o=["components"],l={title:"Aerospike Access Control",description:"Aerospike Access Control"},i=void 0,p={unversionedId:"Aerospike-access-control",id:"Aerospike-access-control",isDocsHomePage:!1,title:"Aerospike Access Control",description:"Aerospike Access Control",source:"@site/docs/Aerospike-access-control.md",sourceDirName:".",slug:"/Aerospike-access-control",permalink:"/kubernetes-operator/Aerospike-access-control",editUrl:"https://github.com/aerospike/kubernetes-operator/edit/main/docs/Aerospike-access-control.md",tags:[],version:"current",frontMatter:{title:"Aerospike Access Control",description:"Aerospike Access Control"},sidebar:"docsSidebar",previous:{title:"XDR",permalink:"/kubernetes-operator/XDR"},next:{title:"Modify Aerospike cluster",permalink:"/kubernetes-operator/Aerospike-configuration-change"}},c=[{value:"Creating a role",id:"creating-a-role",children:[]},{value:"Adding privileges to a role",id:"adding-privileges-to-a-role",children:[]},{value:"Removing privileges from a role",id:"removing-privileges-from-a-role",children:[]},{value:"Creating a user with roles",id:"creating-a-user-with-roles",children:[]},{value:"Add new roles to a user",id:"add-new-roles-to-a-user",children:[]},{value:"Removing roles from a user",id:"removing-roles-from-a-user",children:[]},{value:"Changing a user&#39;s password",id:"changing-a-users-password",children:[]},{value:"Dropping a role",id:"dropping-a-role",children:[]},{value:"Dropping a user",id:"dropping-a-user",children:[]}],m={toc:c};function u(e){var r=e.components,n=(0,t.Z)(e,o);return(0,s.kt)("wrapper",(0,a.Z)({},m,n,{components:r,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Aerospike Access Control includes user, role, and privilege creation and maintenance. For more details see ",(0,s.kt)("a",{parentName:"p",href:"https://docs.aerospike.com/docs/configure/security/access-control/"},"here"),"."),(0,s.kt)("p",null,"To manage your access controls from the operator, configure the ",(0,s.kt)("inlineCode",{parentName:"p"},"aerospikeAccessControl")," section in the Aerospike cluster's Custom Resource (CR) file."),(0,s.kt)("p",null,"Here are a few examples for common access control tasks:"),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"For these examples, assume that cluster is deployed using a file named ",(0,s.kt)("inlineCode",{parentName:"p"},"aerospike-cluster.yaml"),"."))),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#creating-a-role"},"Creating a role")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#adding-privileges-to-a-role"},"Adding privileges to a role")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#removing-privileges-from-a-role"},"Removing privileges from a role")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#creating-a-user-with-roles"},"Creating a user with roles")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#add-new-roles-to-a-user"},"Add roles to a user")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#removing-roles-from-a-user"},"Removing roles from a user")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#changing-a-user-s-password"},"Changing a user's password")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#dropping-a-role"},"Dropping a role")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"/kubernetes-operator/Aerospike-access-control#dropping-a-user"},"Dropping a user"))),(0,s.kt)("h2",{id:"creating-a-role"},"Creating a role"),(0,s.kt)("p",null,"Add a role in ",(0,s.kt)("inlineCode",{parentName:"p"},"roles")," list under ",(0,s.kt)("inlineCode",{parentName:"p"},"aerospikeAccessControl"),"."),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"sys-admin")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"user-admin"),' are standard predefined roles. Here we are adding a new custom role called "profiler" which is given ',(0,s.kt)("inlineCode",{parentName:"p"},"read")," privileges."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  .\n  .\n  aerospikeAccessControl:\n    roles: \n      - name: profiler\n        privileges: \n          - read\n    users:\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"To apply the change, run this command:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")),(0,s.kt)("h2",{id:"adding-privileges-to-a-role"},"Adding privileges to a role"),(0,s.kt)("p",null,"Add the ",(0,s.kt)("inlineCode",{parentName:"p"},"read")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"read-write")," privileges to the ",(0,s.kt)("inlineCode",{parentName:"p"},"profiler")," role in ",(0,s.kt)("inlineCode",{parentName:"p"},"roles")," list under ",(0,s.kt)("inlineCode",{parentName:"p"},"aerospikeAccessControl"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"\napiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  .\n  .\n  aerospikeAccessControl:\n    roles: \n      - name: profiler\n        privileges: \n          - read\n          - read-write\n    users:\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"To apply the change, run this command"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")),(0,s.kt)("h2",{id:"removing-privileges-from-a-role"},"Removing privileges from a role"),(0,s.kt)("p",null,"Remove privileges from the desired role in ",(0,s.kt)("inlineCode",{parentName:"p"},"roles")," list under ",(0,s.kt)("inlineCode",{parentName:"p"},"aerospikeAccessControl"),"."),(0,s.kt)("p",null,"Remove ",(0,s.kt)("inlineCode",{parentName:"p"},"read-write")," ",(0,s.kt)("inlineCode",{parentName:"p"},"privilege"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  .\n  .\n  aerospikeAccessControl:\n    roles: \n      - name: profiler\n        privileges: \n          - read\n    users:\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"Apply the change by running ",(0,s.kt)("inlineCode",{parentName:"p"},"apply")," with the updated config."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")),(0,s.kt)("h2",{id:"creating-a-user-with-roles"},"Creating a user with roles"),(0,s.kt)("p",null,"Create the secret for the user and add the user in ",(0,s.kt)("inlineCode",{parentName:"p"},"users")," list under ",(0,s.kt)("inlineCode",{parentName:"p"},"aerospikeAccessControl"),"."),(0,s.kt)("p",null,"Create a secret ",(0,s.kt)("inlineCode",{parentName:"p"},"profile-user-secret")," containing the password for the user ",(0,s.kt)("inlineCode",{parentName:"p"},"profiler")," by passing the password from the command line:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl  -n aerospike create secret generic profile-user-secret --from-literal=password='userpass'\n")),(0,s.kt)("p",null,"Add ",(0,s.kt)("inlineCode",{parentName:"p"},"profileUser")," user having ",(0,s.kt)("inlineCode",{parentName:"p"},"profiler")," role."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  .\n  .\n  aerospikeAccessControl:\n    roles: \n      - name: profiler\n        privileges: \n          - read\n    users:\n      - name: profileUser\n        secretName: profile-user-secret\n        roles:\n          - profiler\n\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"Apply the change:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")),(0,s.kt)("h2",{id:"add-new-roles-to-a-user"},"Add new roles to a user"),(0,s.kt)("p",null,"Add roles in the desired user's ",(0,s.kt)("inlineCode",{parentName:"p"},"roles")," list."),(0,s.kt)("p",null,"Add ",(0,s.kt)("inlineCode",{parentName:"p"},"user-admin"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"sys-admin")," in ",(0,s.kt)("inlineCode",{parentName:"p"},"profileUser")," roles list."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  .\n  .\n  aerospikeAccessControl:\n    roles: \n      - name: profiler\n        privileges: \n          - read\n    users:\n      - name: profileUser\n        secretName: profile-user-secret\n        roles:\n          - profiler\n          - user-admin\n          - sys-admin\n\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"Apply the change:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")),(0,s.kt)("h2",{id:"removing-roles-from-a-user"},"Removing roles from a user"),(0,s.kt)("p",null,"Remove roles from the desired user's ",(0,s.kt)("inlineCode",{parentName:"p"},"roles")," list."),(0,s.kt)("p",null,"Remove ",(0,s.kt)("inlineCode",{parentName:"p"},"sys-admin")," from the ",(0,s.kt)("inlineCode",{parentName:"p"},"profileUser's")," roles list."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  .\n  .\n  aerospikeAccessControl:\n    roles: \n      - name: profiler\n        privileges: \n          - read\n    users:\n      - name: profileUser\n        secretName: profile-user-secret\n        roles:\n          - profiler\n          - user-admin\n\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"Apply the change:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")),(0,s.kt)("h2",{id:"changing-a-users-password"},"Changing a user's password"),(0,s.kt)("p",null,"Create a new secret ",(0,s.kt)("inlineCode",{parentName:"p"},"new-profile-user-secret")," containing the password for Aerospike cluster user ",(0,s.kt)("inlineCode",{parentName:"p"},"profileUser")," by passing the password from the command line:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl  -n aerospike create secret generic new-profile-user-secret --from-literal=password='newuserpass'\n")),(0,s.kt)("p",null,"Update the ",(0,s.kt)("inlineCode",{parentName:"p"},"secretName")," for ",(0,s.kt)("inlineCode",{parentName:"p"},"profileUser")," to the new secret name ",(0,s.kt)("inlineCode",{parentName:"p"},"new-profile-user-secret"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  .\n  .\n  aerospikeAccessControl:\n    roles: \n      - name: profiler\n        privileges: \n          - read\n    users:\n      - name: profileUser\n        secretName: new-profile-user-secret\n        roles:\n          - profiler\n          - user-admin\n\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"Apply the change:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")),(0,s.kt)("h2",{id:"dropping-a-role"},"Dropping a role"),(0,s.kt)("p",null,"Remove the desired role from ",(0,s.kt)("inlineCode",{parentName:"p"},"roles")," list under ",(0,s.kt)("inlineCode",{parentName:"p"},"aerospikeAccessControl"),". Also remove this role from the ",(0,s.kt)("inlineCode",{parentName:"p"},"roles")," list of all the users."),(0,s.kt)("p",null,"Remove ",(0,s.kt)("inlineCode",{parentName:"p"},"profiler")," role."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  .\n  .\n  aerospikeAccessControl:\n    users:\n      - name: profileUser\n        secretName: new-profile-user-secret\n        roles:\n          - sys-admin\n\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"Apply the change:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")),(0,s.kt)("h2",{id:"dropping-a-user"},"Dropping a user"),(0,s.kt)("p",null,"Remove the desired user from the ",(0,s.kt)("inlineCode",{parentName:"p"},"users")," list under ",(0,s.kt)("inlineCode",{parentName:"p"},"aerospikeAccessControl"),"."),(0,s.kt)("p",null,"Remove ",(0,s.kt)("inlineCode",{parentName:"p"},"profileUser")," user."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n.\n.\n  aerospikeAccessControl:\n    users:\n      - name: admin\n        secretName: auth-secret\n        roles:\n          - sys-admin\n          - user-admin\n")),(0,s.kt)("p",null,"Apply the change:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f aerospike-cluster.yaml\n")))}u.isMDXComponent=!0}}]);