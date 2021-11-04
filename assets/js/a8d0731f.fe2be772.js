"use strict";(self.webpackChunkwebsite_operator=self.webpackChunkwebsite_operator||[]).push([[7180],{3780:function(e,n,r){r.r(n),r.d(n,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var t=r(3117),a=r(102),i=(r(7294),r(3905)),o=["components"],s={title:"Scaling Namespace Storage",description:"Scaling Namespace Storage"},c=void 0,l={unversionedId:"Scaling-namespace-storage",id:"version-1.x.x/Scaling-namespace-storage",isDocsHomePage:!1,title:"Scaling Namespace Storage",description:"Scaling Namespace Storage",source:"@site/versioned_docs/version-1.x.x/Scaling-namespace-storage.md",sourceDirName:".",slug:"/Scaling-namespace-storage",permalink:"/kubernetes-operator/Scaling-namespace-storage",editUrl:"https://github.com/aerospike/kubernetes-operator/edit/main/versioned_docs/version-1.x.x/Scaling-namespace-storage.md",tags:[],version:"1.x.x",frontMatter:{title:"Scaling Namespace Storage",description:"Scaling Namespace Storage"},sidebar:"version-1.x.x/docsSidebar",previous:{title:"Storage Provisioning",permalink:"/kubernetes-operator/Storage-provisioning"},next:{title:"Data In Memory",permalink:"/kubernetes-operator/Data-in-memory"}},p=[{value:"Aerospike Rack Awareness for Vertical Scaling",id:"aerospike-rack-awareness-for-vertical-scaling",children:[],level:2},{value:"Create a new rack",id:"create-a-new-rack",children:[],level:2},{value:"Update the <code>rackConfig</code> section",id:"update-the-rackconfig-section",children:[],level:2},{value:"Apply the change",id:"apply-the-change",children:[],level:2},{value:"Check the pods",id:"check-the-pods",children:[],level:2}],u={toc:p};function d(e){var n=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,t.Z)({},u,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Scaling namespace storage (vertical scaling) is a bit complex. The Operator uses k8s StatefulSet for deploying Aerospike-cluster. StatefulSet uses PersistentVolumeClaim for providing storage. Currently a PersistentVolumeClaim cannot be updated. Hence the Operator can not provide a simple solution for vertical scaling."),(0,i.kt)("h2",{id:"aerospike-rack-awareness-for-vertical-scaling"},"Aerospike Rack Awareness for Vertical Scaling"),(0,i.kt)("p",null,"To perform vertical scaling, the Aerospike Rack Awareness feature can be applied."),(0,i.kt)("p",null,"For this example, we assume that cluster is deployed with the name ",(0,i.kt)("inlineCode",{parentName:"p"},"aerospike-cluster.yaml"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  size: 2\n  image: aerospike/aerospike-server-enterprise:4.7.0.10\n\n  rackConfig:\n    namespaces:\n      - test\n    racks:\n      - id: 1\n        zone: us-central1-b\n        storage:\n          volumes:\n            - path: /dev/sdf\n              storageClass: ssd\n              volumeMode: block\n              sizeInGB: 5\n\n  aerospikeConfig:\n    service:\n      feature-key-file: /etc/aerospike/secret/features.conf\n    security:\n      enable-security: true\n    namespaces:\n      - name: test\n        memory-size: 6000000000\n        replication-factor: 2\n        storage-engine:\n          type: device\n          devices:\n            - /dev/sdf\n.\n.\n.\n")),(0,i.kt)("h2",{id:"create-a-new-rack"},"Create a new rack"),(0,i.kt)("p",null,"Now if we want to resize ",(0,i.kt)("inlineCode",{parentName:"p"},"/dev/sdf")," for namespace ",(0,i.kt)("inlineCode",{parentName:"p"},"test")," then we have to create a new ",(0,i.kt)("inlineCode",{parentName:"p"},"rack")," inside ",(0,i.kt)("inlineCode",{parentName:"p"},"rackConfig")," with updated ",(0,i.kt)("inlineCode",{parentName:"p"},"storage")," config and remove the old rack."),(0,i.kt)("p",null,"The new rack can be created in same physical rack using existing ",(0,i.kt)("inlineCode",{parentName:"p"},"zone/region")," (if there is enough space) to hold new storage and old storage together."),(0,i.kt)("h2",{id:"update-the-rackconfig-section"},"Update the ",(0,i.kt)("inlineCode",{parentName:"h2"},"rackConfig")," section"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: aerospike.com/v1alpha1\nkind: AerospikeCluster\nmetadata:\n  name: aerocluster\n  namespace: aerospike\n\nspec:\n  size: 2\n  image: aerospike/aerospike-server-enterprise:4.7.0.10\n\n  rackConfig:\n    namespaces:\n      - test\n    racks:\n      # Added new rack with id: 2. Old rack with id: 1 is removed\n      - id: 2\n        zone: us-central1-b\n        storage:\n          volumes:\n            - path: /dev/sdf\n              storageClass: ssd\n              volumeMode: block\n              sizeInGB: 8\n\n  aerospikeConfig:\n    service:\n      feature-key-file: /etc/aerospike/secret/features.conf\n    security:\n      enable-security: true\n    namespaces:\n      - name: test\n        memory-size: 10000000000\n        replication-factor: 2\n        storage-engine:\n          type: device\n          devices:\n            - /dev/sdf\n.\n.\n.\n")),(0,i.kt)("h2",{id:"apply-the-change"},"Apply the change"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl apply -f aerospike-cluster.yaml\n")),(0,i.kt)("p",null,"This will create a new rack with ",(0,i.kt)("inlineCode",{parentName:"p"},"id: 2")," and updated ",(0,i.kt)("inlineCode",{parentName:"p"},"storage")," config. Old data will be migrated to new rack. Old rack will be removed gracefully."),(0,i.kt)("h2",{id:"check-the-pods"},"Check the pods"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"$ kubectl get pods -n aerospike\nNAME                READY   STATUS          RESTARTS   AGE\naerocluster-2-0     1/1     Running         0          3m6s\naerocluster-2-1     1/1     Running         0          3m6s\naerocluster-1-1     1/1     Terminating     0          30s\n")))}d.isMDXComponent=!0},3905:function(e,n,r){r.d(n,{Zo:function(){return p},kt:function(){return m}});var t=r(7294);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function o(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function s(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=t.createContext({}),l=function(e){var n=t.useContext(c),r=n;return e&&(r="function"==typeof e?e(n):o(o({},n),e)),r},p=function(e){var n=l(e.components);return t.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(r),m=a,g=d["".concat(c,".").concat(m)]||d[m]||u[m]||i;return r?t.createElement(g,o(o({ref:n},p),{},{components:r})):t.createElement(g,o({ref:n},p))}));function m(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return t.createElement.apply(null,o)}return t.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);