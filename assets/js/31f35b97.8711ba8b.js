"use strict";(self.webpackChunkwebsite_operator=self.webpackChunkwebsite_operator||[]).push([[8452],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),c=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=c(e.components);return a.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(t),m=r,k=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return t?a.createElement(k,o(o({ref:n},p),{},{components:t})):a.createElement(k,o({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9269:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return u}});var a=t(7462),r=t(3366),i=(t(7294),t(3905)),o=["components"],s={title:"Rack Awareness",description:"Rack Awareness"},l=void 0,c={unversionedId:"Rack-Awareness",id:"Rack-Awareness",isDocsHomePage:!1,title:"Rack Awareness",description:"Rack Awareness",source:"@site/docs/Rack-Awareness.md",sourceDirName:".",slug:"/Rack-Awareness",permalink:"/kubernetes-operator/next/Rack-Awareness",editUrl:"https://github.com/aerospike/kubernetes-operator/edit/main/docs/Rack-Awareness.md",tags:[],version:"current",frontMatter:{title:"Rack Awareness",description:"Rack Awareness"},sidebar:"docsSidebar",previous:{title:"Aerospike Configuration Mapping",permalink:"/kubernetes-operator/next/Aerospike-configuration-mapping"},next:{title:"Multiple Aerospike Clusters",permalink:"/kubernetes-operator/next/Multiple-Aerospike-clusters"}},p=[{value:"To add Rack Awareness",id:"to-add-rack-awareness",children:[]},{value:"Deploy the cluster",id:"deploy-the-cluster",children:[]},{value:"Cluster node distribution in racks",id:"cluster-node-distribution-in-racks",children:[]},{value:"Adding a new rack in config",id:"adding-a-new-rack-in-config",children:[]},{value:"Setting rack lavel storage and aerospikeConfig",id:"setting-rack-lavel-storage-and-aerospikeconfig",children:[]},{value:"Merging AerospikeConfig",id:"merging-aerospikeconfig",children:[]},{value:"Removing rack from config",id:"removing-rack-from-config",children:[]},{value:"Simultaneously add and remove rack",id:"simultaneously-add-and-remove-rack",children:[]}],d={toc:p};function u(e){var n=e.components,t=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In many cloud environments, it is a best practice to build a cluster which spans multiple availability zones. Aerospike\u2019s Rack Awareness is a good fit when you need to split the database across racks or zones. For example, if you configure a replication-factor of 2, the master copy of the partition and its replica will be stored on separate hardware failure groups. Rack Awareness provides a mechanism that allows database clients to read on a preferential basis from servers in their closely rack or zone, which can significantly reduce traffic charges by limiting cross-AZ traffic as well as provide lower latency and increased stability."),(0,i.kt)("p",null,"For more details, visit ",(0,i.kt)("a",{parentName:"p",href:"https://docs.aerospike.com/docs/architecture/rack-aware.md"},"Rack Awareness"),"."),(0,i.kt)("h2",{id:"to-add-rack-awareness"},"To add Rack Awareness"),(0,i.kt)("p",null,"Rack specific config for the Aerospike cluster CR file."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"  rackConfig:\n    namespaces:\n      - test\n    racks:\n      - id: 1\n        zone: us-central1-b\n        aerospikeConfig:\n          service:\n            proto-fd-max: 18000\n        storage:\n          filesystemVolumePolicy:\n            initMethod: deleteFiles\n            cascadeDelete: true\n          blockVolumePolicy:\n            cascadeDelete: true\n          volumes:\n            - storageClass: ssd\n              path: /opt/aerospike\n              volumeMode: filesystem\n              sizeInGB: 1\n            - path: /opt/aerospike/data\n              storageClass: ssd\n              volumeMode: filesystem\n              sizeInGB: 3\n      - id: 2\n        zone: us-central1-a\n        aerospikeConfig:\n          service:\n            proto-fd-max: 16000\n  .\n  .\n  .\n  aerospikeConfig:\n    service:\n      feature-key-file: /etc/aerospike/secret/features.conf\n    security:\n      enable-security: true\n    namespaces:\n      - name: test\n        memory-size: 3000000000\n        replication-factor: 1\n        storage-engine:\n          type: device\n          files:\n            - /opt/aerospike/data/test.dat\n          filesize: 2000000000\n          data-in-memory: true\n      - name: testMem\n        memory-size: 3000000000\n        replication-factor: 1\n        storage-engine:\n          type: memory\n")),(0,i.kt)("p",null,"Get full CR file ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/aerospike/aerospike-kubernetes-operator/tree/1.0.1/deploy/samples/rack_enabled_cluster_cr.yaml"},"here"),"."),(0,i.kt)("h2",{id:"deploy-the-cluster"},"Deploy the cluster"),(0,i.kt)("p",null,"Follow the instructions ",(0,i.kt)("a",{parentName:"p",href:"/kubernetes-operator/next/Create-Aerospike-cluster#deploy-aerospike-cluster"},"here")," to deploy this configuration."),(0,i.kt)("h2",{id:"cluster-node-distribution-in-racks"},"Cluster node distribution in racks"),(0,i.kt)("p",null,"Cluster nodes are distributed across racks as evenly as possible. The cluster size is divided by the number of racks to get nodes per rack. If there are remainder nodes, they are distributed one by one across racks starting from first rack."),(0,i.kt)("p",null,"For e.g."),(0,i.kt)("p",null,"Nodes: 10, Racks: 4"),(0,i.kt)("p",null,"Topology:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"NodesForRack1: 3"),(0,i.kt)("li",{parentName:"ul"},"NodesForRack2: 3"),(0,i.kt)("li",{parentName:"ul"},"NodesForRack3: 2"),(0,i.kt)("li",{parentName:"ul"},"NodesForRack4: 2")),(0,i.kt)("h2",{id:"adding-a-new-rack-in-config"},"Adding a new rack in config"),(0,i.kt)("p",null,"Add a new rack section in config yaml file under ",(0,i.kt)("inlineCode",{parentName:"p"},"rackConfig.racks")," section and apply config file using kubectl."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"  rackConfig:\n    namespaces:\n      - test\n    racks:\n      .\n      .\n      .\n      - id: 3\n        zone: us-central1-c\n")),(0,i.kt)("p",null,"Operator redistribute cluster nodes across racks whenever cluster size is updated or number or racks is changed. If user adds a rack without increasing cluster size then old racks will be scaled down and new new rack will be scaled up based on new nodes redistribution."),(0,i.kt)("h2",{id:"setting-rack-lavel-storage-and-aerospikeconfig"},"Setting rack lavel storage and aerospikeConfig"),(0,i.kt)("p",null,"Rack also provide for setting local storage and aerospikeConfig. If local storage is given for rack then rack will use this storage otherwise common global storage will be used. Here aerospikeConfig is config patch which will be merged with common global aerospikeConfig and will be used for rack."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"  rackConfig:\n    namespaces:\n      - test\n    racks:\n      - id: 1\n        zone: us-central1-b\n        aerospikeConfig:\n          service:\n            proto-fd-max: 18000\n        storage:\n          filesystemVolumePolicy:\n            initMethod: deleteFiles\n            cascadeDelete: true\n          blockVolumePolicy:\n            cascadeDelete: true\n          volumes:\n            - storageClass: ssd\n              path: /opt/aerospike\n              volumeMode: filesystem\n              sizeInGB: 1\n            - path: /opt/aerospike/data\n              storageClass: ssd\n              volumeMode: filesystem\n              sizeInGB: 3\n")),(0,i.kt)("h2",{id:"merging-aerospikeconfig"},"Merging AerospikeConfig"),(0,i.kt)("p",null,"Local rack AerospikeConfig patch will be merged with common global base AerospikeConfig using given rules."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"New elements from the patch configMap then it will be added to base configMap"),(0,i.kt)("li",{parentName:"ul"},"Base element will be replaced with a new patch element if",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Element value type is changed"),(0,i.kt)("li",{parentName:"ul"},"Element value is a primitive type and updated"),(0,i.kt)("li",{parentName:"ul"},"Element value is primitive list type and updated"),(0,i.kt)("li",{parentName:"ul"},"Element key is ",(0,i.kt)("inlineCode",{parentName:"li"},"storage-engine")," and its storage-engine type has been changed. (storage-engine can be of ",(0,i.kt)("inlineCode",{parentName:"li"},"device"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"file"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"memory")," type."))),(0,i.kt)("li",{parentName:"ul"},"If element is of map type then patch and base elements will be recursively merged"),(0,i.kt)("li",{parentName:"ul"},"If elements are list of maps then new list elements in the patch list will be appended to the base list and corresponding entries will be merged using the same merge algorithm. Here the order of elements in the base list will be maintained. (corresponding entries are found by matching the special ",(0,i.kt)("inlineCode",{parentName:"li"},"name")," key in maps. Here this list of maps is actually a map of map and main map keys are added in sub-map with key as ",(0,i.kt)("inlineCode",{parentName:"li"},"name")," to convert map of maps to a list of maps).")),(0,i.kt)("p",null,"e.g."),(0,i.kt)("p",null,"Rack local aerospikeConfig and common global aerospikeConfig"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"  rackConfig:\n    racks:\n        aerospikeConfig:\n          service:\n            proto-fd-max: 18000\n          namespaces:\n            - name: test\n              storage-engine:\n                type: device\n                devices:\n                  - /dev/nvme0n2 /dev/sdf2\n            - name: bar\n              memory-size: 6000000000\n              storage-engine:\n                type: memory\n.\n.\n.\n  aerospikeConfig:\n    service:\n      feature-key-file: /etc/aerospike/secret/features.conf\n    security:\n      enable-security: true\n    namespaces:\n      - name: test\n        memory-size: 3000000000\n        replication-factor: 2\n        storage-engine:\n          type: device\n          devices:\n            - /dev/nvme0n1 /dev/sdf\n      - name: bar\n        memory-size: 3000000000\n        replication-factor: 2\n        storage-engine:\n          type: device\n          devices:\n            - /dev/nvme0n10 /dev/sdf10\n")),(0,i.kt)("p",null,"After merging rack local aerospikeConfig"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"  aerospikeConfig:\n    service:\n      proto-fd-max: 18000\n      feature-key-file: /etc/aerospike/secret/features.conf\n    security:\n      enable-security: true\n    namespaces:\n      - name: test\n        memory-size: 3000000000\n        replication-factor: 2\n        # storage-engine type is not changed hence its merged recursively\n        storage-engine:\n          type: device\n          devices:\n            - /dev/nvme0n2 /dev/sdf2\n      - name: bar\n        memory-size: 6000000000\n        replication-factor: 2\n        # storage-engine type is changed hence its replaced\n        storage-engine:\n          type: memory\n")),(0,i.kt)("h2",{id:"removing-rack-from-config"},"Removing rack from config"),(0,i.kt)("p",null,"Remove the desired rack section in config yaml file under ",(0,i.kt)("inlineCode",{parentName:"p"},"rackConfig.racks")," section and apply config file using kubectl."),(0,i.kt)("p",null,"This will try to scale down the desired rack to size 0. One node at a time will be removed from rack. After removing all the nodes from the rack, rack will also be removed. If user is removing rack without decreasing cluster size then other racks will be scaled up based on new node redistribution."),(0,i.kt)("h2",{id:"simultaneously-add-and-remove-rack"},"Simultaneously add and remove rack"),(0,i.kt)("p",null,"If operator has to scale up some racks and scale down some other racks in single call then operator will always scale up first then it will scale down the racks. Hence for a short duration actual cluster size may be more than desired cluster size."))}u.isMDXComponent=!0}}]);