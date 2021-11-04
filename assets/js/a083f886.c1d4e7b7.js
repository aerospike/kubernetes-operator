"use strict";(self.webpackChunkwebsite_operator=self.webpackChunkwebsite_operator||[]).push([[4575],{107:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var n=t(3117),a=t(102),o=(t(7294),t(3905)),i=["components"],s={title:"Multiple Aerospike Clusters",description:"Multiple Aerospike Clusters"},l=void 0,c={unversionedId:"Multiple-Aerospike-clusters",id:"Multiple-Aerospike-clusters",isDocsHomePage:!1,title:"Multiple Aerospike Clusters",description:"Multiple Aerospike Clusters",source:"@site/docs/Multiple-Aerospike-clusters.md",sourceDirName:".",slug:"/Multiple-Aerospike-clusters",permalink:"/kubernetes-operator/next/Multiple-Aerospike-clusters",editUrl:"https://github.com/aerospike/kubernetes-operator/edit/main/docs/Multiple-Aerospike-clusters.md",tags:[],version:"current",frontMatter:{title:"Multiple Aerospike Clusters",description:"Multiple Aerospike Clusters"},sidebar:"docsSidebar",previous:{title:"Rack Awareness",permalink:"/kubernetes-operator/next/Rack-Awareness"},next:{title:"Monitoring",permalink:"/kubernetes-operator/next/Monitoring"}},p=[{value:"Multiple Aerospike clusters in a single k8s namespace",id:"multiple-aerospike-clusters-in-a-single-k8s-namespace",children:[],level:2},{value:"RBAC for other namespaces",id:"rbac-for-other-namespaces",children:[{value:"Create the operator service account for the namespace",id:"create-the-operator-service-account-for-the-namespace",children:[],level:4},{value:"Add service account to operator&#39;s ClusterRoleBinding",id:"add-service-account-to-operators-clusterrolebinding",children:[],level:4}],level:2}],u={toc:p};function d(e){var r=e.components,t=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The operator is able to deploy multiple Aerospike clusters within a single k8s namespace or in multiple k8s namespaces. "),(0,o.kt)("h2",{id:"multiple-aerospike-clusters-in-a-single-k8s-namespace"},"Multiple Aerospike clusters in a single k8s namespace"),(0,o.kt)("p",null,"Deploying multiple clusters in a single namespace is as easy as deploying a single cluster. The user has to just deploy another cluster with a cluster name (cluster object metadata name in cr.yaml file) that is not already registered in that namespace."),(0,o.kt)("h2",{id:"rbac-for-other-namespaces"},"RBAC for other namespaces"),(0,o.kt)("p",null,"For deploying and managing Aerospike cluster's in the operator's namespace (recommended as aerospike) you need not do any additional RBAC configuration."),(0,o.kt)("p",null,"For deploying cluster in namespaces other than the operator's namespace you need to"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"create a service account with name ",(0,o.kt)("inlineCode",{parentName:"li"},"aerospike-operator-controller-manager")," in that namespace"),(0,o.kt)("li",{parentName:"ul"},"add this service account to the operator's ",(0,o.kt)("inlineCode",{parentName:"li"},"ClusterRoleBinding"))),(0,o.kt)("h4",{id:"create-the-operator-service-account-for-the-namespace"},"Create the operator service account for the namespace"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"# Replace ns1 with your target namespace\nkubectl -n ns1 create  serviceaccount aerospike-operator-controller-manager\n")),(0,o.kt)("h4",{id:"add-service-account-to-operators-clusterrolebinding"},"Add service account to operator's ClusterRoleBinding"),(0,o.kt)("p",null,"Find the ClusterRoleBinding created for the operator and add the service account created above"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl get clusterrolebindings.rbac.authorization.k8s.io  | grep aerospike-kubernetes-operator\naerospike-kubernetes-operator.v2.0.0-rc1-74b946466d                 ClusterRole/aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d   41m\n")),(0,o.kt)("p",null,"In the example above the name of the cluster role binding is ",(0,o.kt)("inlineCode",{parentName:"p"},"aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d")),(0,o.kt)("p",null,"Edit the role binding and add a new subject entry for the service account"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"# Replace aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d with the name of the cluster role binding found above\nkubectl edit clusterrolebindings.rbac.authorization.k8s.io  aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d\n")),(0,o.kt)("p",null,"In the editor that is launched append the following lines to the subjects section as shown below"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},"  # A new entry for ns1.\n  # Replace ns1 with your namespace\n  - kind: ServiceAccount\n    name: aerospike-operator-controller-manager\n    namespace: ns1\n")),(0,o.kt)("p",null,"Save and ensure that the changes are applied."),(0,o.kt)("p",null,"Here is a full example of the operator's ClusterRoleBinding targeting ",(0,o.kt)("inlineCode",{parentName:"p"},"aerospike")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"ns1")," namespaces."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRoleBinding\nmetadata:\n  creationTimestamp: "2021-09-16T10:48:36Z"\n  labels:\n    olm.owner: aerospike-kubernetes-operator.v2.0.0-rc1\n    olm.owner.kind: ClusterServiceVersion\n    olm.owner.namespace: test\n    operators.coreos.com/aerospike-kubernetes-operator.test: ""\n  name: aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d\n  resourceVersion: "51841234"\n  uid: be546dd5-b21e-4cc3-8a07-e2fe5fe5274c\nroleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: ClusterRole\n  name: aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d\nsubjects:\n  - kind: ServiceAccount\n    name: aerospike-operator-controller-manager\n    namespace: aerospike\n\n  # New entry\n  - kind: ServiceAccount\n    name: aerospike-operator-controller-manager\n    namespace: ns1     \n')))}d.isMDXComponent=!0},3905:function(e,r,t){t.d(r,{Zo:function(){return p},kt:function(){return m}});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),c=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},p=function(e){var r=c(e.components);return n.createElement(l.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(t),m=a,k=d["".concat(l,".").concat(m)]||d[m]||u[m]||o;return t?n.createElement(k,i(i({ref:r},p),{},{components:t})):n.createElement(k,i({ref:r},p))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=d;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=t[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);