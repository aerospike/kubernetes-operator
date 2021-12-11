"use strict";(self.webpackChunkwebsite_operator=self.webpackChunkwebsite_operator||[]).push([[4270],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=p(r),m=a,k=d["".concat(s,".").concat(m)]||d[m]||u[m]||l;return r?n.createElement(k,i(i({ref:t},c),{},{components:r})):n.createElement(k,i({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,i=new Array(l);i[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var p=2;p<l;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6573:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return c},default:function(){return d}});var n=r(7462),a=r(3366),l=(r(7294),r(3905)),i=["components"],o={title:"Create Aerospike Cluster Using Helm",description:"How to create an Aerospike cluster using Helm",id:"create-cluster-helm"},s=void 0,p={unversionedId:"create-cluster-helm",id:"create-cluster-helm",title:"Create Aerospike Cluster Using Helm",description:"How to create an Aerospike cluster using Helm",source:"@site/docs/create-cluster-helm.md",sourceDirName:".",slug:"/create-cluster-helm",permalink:"/kubernetes-operator/next/create-cluster-helm",editUrl:"https://github.com/aerospike/kubernetes-operator/edit/main/docs/create-cluster-helm.md",tags:[],version:"current",frontMatter:{title:"Create Aerospike Cluster Using Helm",description:"How to create an Aerospike cluster using Helm",id:"create-cluster-helm"},sidebar:"docsSidebar",previous:{title:"Create an Aerospike Cluster",permalink:"/kubernetes-operator/next/create-cluster-kubectl"},next:{title:"Connect To The Aerospike Cluster",permalink:"/kubernetes-operator/next/Connect-to-the-Aerospike-cluster"}},c=[{value:"Requirements",id:"requirements",children:[],level:2},{value:"Configure Persistent Storage",id:"configure-persistent-storage",children:[],level:2},{value:"Create Secrets",id:"create-secrets",children:[],level:2},{value:"Get the Helm Charts",id:"get-the-helm-charts",children:[],level:2},{value:"Deploy the Cluster",id:"deploy-the-cluster",children:[],level:2},{value:"Configurations",id:"configurations",children:[],level:2},{value:"Default Values in &quot;dev&quot; Mode",id:"default-values-in-dev-mode",children:[],level:2}],u={toc:c};function d(e){var t=e.components,r=(0,a.Z)(e,i);return(0,l.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Follow these instructions to use the Operator to deploy the Aerospike cluster using Helm."),(0,l.kt)("h2",{id:"requirements"},"Requirements"),(0,l.kt)("p",null,"Before deploying your Aerospike cluster using Helm, you must ",(0,l.kt)("a",{parentName:"p",href:"/kubernetes-operator/next/install-operator-helm"},"use Helm to install the Aerospike Kubernetes Operator")," on your cluster."),(0,l.kt)("h2",{id:"configure-persistent-storage"},"Configure Persistent Storage"),(0,l.kt)("p",null,"The Aerospike Operator works with dynamically-provisioned storage classes. Aerospike Server pods may have different storage volumes associated with each service."),(0,l.kt)("p",null,"Persistent storage on the pods uses these storage class provisioners."),(0,l.kt)("p",null,"Apply a sample storage class based on your Kubernetes environment:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"EKS: ",(0,l.kt)("inlineCode",{parentName:"li"},"kubectl apply -f eks_ssd_storage_class.yaml")),(0,l.kt)("li",{parentName:"ul"},"GCE: ",(0,l.kt)("inlineCode",{parentName:"li"},"kubectl apply -f gce_ssd_storage_class.yaml")),(0,l.kt)("li",{parentName:"ul"},"Microk8s: ",(0,l.kt)("inlineCode",{parentName:"li"},"kubectl apply -f microk8s_filesystem_storage_class.yaml"))),(0,l.kt)("p",null,"See ",(0,l.kt)("a",{parentName:"p",href:"/kubernetes-operator/next/Storage-provisioning"},"Storage Provisioning")," for more details on configuring persistent storage."),(0,l.kt)("h2",{id:"create-secrets"},"Create Secrets"),(0,l.kt)("p",null,"Next, create Secrets to set up features like the license file (",(0,l.kt)("inlineCode",{parentName:"p"},"features.conf"),"), Aerospike authentication, TLS, and the cluster admin password. See the ",(0,l.kt)("a",{parentName:"p",href:"/kubernetes-operator/next/Manage-TLS-Certificates"},"Manage TLS Certificates")," section for more details."),(0,l.kt)("p",null,"The ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples/secrets"},"example secrets directory")," includes a collection of example TLS certificates, security credentials, and more. Download these files into a local folder called ",(0,l.kt)("inlineCode",{parentName:"p"},"secrets"),", then apply them as a Kubernetes Secret:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl  -n aerospike create secret generic aerospike-secret --from-file=secrets\n")),(0,l.kt)("p",null,"Create a Secret containing the password for the Aerospike cluster admin:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl  -n aerospike create secret generic auth-secret --from-literal=password='admin123'\n")),(0,l.kt)("h2",{id:"get-the-helm-charts"},"Get the Helm Charts"),(0,l.kt)("p",null,"To get the Helm charts, clone the ",(0,l.kt)("inlineCode",{parentName:"p"},"aerospike/aerospike-kubernetes-operator")," repository."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"git clone https://github.com/aerospike/aerospike-kubernetes-operator.git\n")),(0,l.kt)("p",null,"The charts are in the ",(0,l.kt)("inlineCode",{parentName:"p"},"aerospike-kubernetes-operator/helm-charts")," folder."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"cd aerospike-kubernetes-operator/helm-charts\n")),(0,l.kt)("h2",{id:"deploy-the-cluster"},"Deploy the Cluster"),(0,l.kt)("p",null,"Create a Secret containing the Aerospike feature key file ",(0,l.kt)("inlineCode",{parentName:"p"},"features.conf"),"."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl create secret generic aerospike-license --from-file=[path to your features.conf file]\n")),(0,l.kt)("p",null,"Install the chart."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"helm install aerospike ./aerospike-cluster \\\n    --set devMode=true\n")),(0,l.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},'This command assumes few defaults, and deploys an Aerospike cluster in "dev" mode with no data persistence. We recommend you create a custom YAML file with your required configurations, and apply it with ',(0,l.kt)("inlineCode",{parentName:"p"},"helm install"),"."))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"helm install aerospike ./aerospike-cluster/ \\\n    -f [custom YAML file]\n")),(0,l.kt)("h2",{id:"configurations"},"Configurations"),(0,l.kt)("p",null,"For more details on these configurations, see the ",(0,l.kt)("a",{parentName:"p",href:"https://aerospike.github.io/kubernetes-operator/next/Cluster-configuration-settings/#spec"},"AerospikeCluster Customer Resource Spec"),"."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"replicas")),(0,l.kt)("td",{parentName:"tr",align:null},"Aerospike cluster size."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"3"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"image.repository")),(0,l.kt)("td",{parentName:"tr",align:null},"Aerospike Server container image repository."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"aerospike/aerospike-server-enterprise"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"image.tag")),(0,l.kt)("td",{parentName:"tr",align:null},"Aerospike Server container image tag."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"5.5.0.9"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"imagePullSecrets")),(0,l.kt)("td",{parentName:"tr",align:null},"Secrets containing credentials to pull Aerospike container image from a private registry."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"aerospikeAccessControl")),(0,l.kt)("td",{parentName:"tr",align:null},"Aerospike access control configuration. Define users and roles to be created on the cluster."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"aerospikeConfig")),(0,l.kt)("td",{parentName:"tr",align:null},"Aerospike configuration."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"aerospikeNetworkPolicy")),(0,l.kt)("td",{parentName:"tr",align:null},"Network policy (client access configuration)."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"commonName")),(0,l.kt)("td",{parentName:"tr",align:null},"Base string for naming pods, services, stateful sets, etc."),(0,l.kt)("td",{parentName:"tr",align:null},"Release name truncated to 63 characters (without hyphens)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"podSpec")),(0,l.kt)("td",{parentName:"tr",align:null},"Aerospike pod spec configuration."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"rackConfig")),(0,l.kt)("td",{parentName:"tr",align:null},"Aerospike rack configuration."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"storage")),(0,l.kt)("td",{parentName:"tr",align:null},"Aerospike pod storage configuration."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"validationPolicy")),(0,l.kt)("td",{parentName:"tr",align:null},"Validation policy."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"operatorClientCert")),(0,l.kt)("td",{parentName:"tr",align:null},"Client certificates to connect to Aerospike."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"seedsFinderServices")),(0,l.kt)("td",{parentName:"tr",align:null},"Service (e.g. loadbalancer) for Aerospike cluster discovery."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"{}")," (nil)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"devMode")),(0,l.kt)("td",{parentName:"tr",align:null},"Deploy Aerospike cluster in dev mode."),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("inlineCode",{parentName:"td"},"false"))))),(0,l.kt)("h2",{id:"default-values-in-dev-mode"},'Default Values in "dev" Mode'),(0,l.kt)("p",null,'These values are set as defaults when the cluster is deployed in "dev" mode (',(0,l.kt)("inlineCode",{parentName:"p"},"devMode=true"),")."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},"aerospikeConfig:\n  service:\n    feature-key-file: /etc/aerospike/secrets/features.conf\n\n  security:\n    enable-security: false\n\n  network:\n    service:\n      port: 3000\n    fabric:\n      port: 3001\n    heartbeat:\n      port: 3002\n\n  namespaces:\n    - name: test\n      memory-size: 1073741824 # 1GiB\n      replication-factor: 2\n      storage-engine:\n        type: memory\n\npodSpec:\n  multiPodPerHost: true\n\nstorage:\n  volumes:\n  - name: aerospike-config-secret\n    source:\n      secret:\n        secretName: aerospike-license\n    aerospike:\n      path: /etc/aerospike/secrets\n\nvalidationPolicy:\n  skipWorkDirValidate: true\n  skipXdrDlogFileValidate: true\n")))}d.isMDXComponent=!0}}]);