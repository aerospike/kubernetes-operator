---
title: Cluster Configuration Settings
description: Cluster Configuration Settings
---

Aerospike cluster configuration settings are in the Aerospike cluster Custom Resource (CR). You can edit this file to make changes to your Aerospike cluster.

The [Operator Custom Resource Definition (CRD)](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/crd/bases/asdb.aerospike.com_aerospikeclusters.yaml) specifies the CR the Operator uses to manage the cluster.


## Example CR

This basic CR is included as an example to get you started. It creates a simple cluster with no storage, using data-in-memory (DIM).

For a more realistic and more complicated real-world example, we recommend the [example rack-enabled cluster CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/rack_enabled_cluster_cr.yaml).

These and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike
spec:
  size: 2
  image: aerospike/aerospike-server-enterprise:5.6.0.7

  podSpec:
    multiPodPerHost: true

  storage:
    filesystemVolumePolicy:
      cascadeDelete: true
      initMethod: deleteFiles
    volumes:
      - name: workdir
        source:
          persistentVolume:
            storageClass: ssd
            volumeMode: Filesystem
            size: 3Gi
        aerospike:
          path: /opt/aerospike
      - name: aerospike-config-secret
        source:
          secret:
            secretName: aerospike-secret
        aerospike:
          path: /etc/aerospike/secret

  aerospikeAccessControl:
    users:
      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin

  aerospikeConfig:
    logging:
      - name: /var/log/aerospike/aerospike.log
        any: info
        clustering: debug
    service:
      feature-key-file: /etc/aerospike/secret/features.conf
    security:
      enable-security: true
    network:
      service:
        port: 3000
      fabric:
        port: 3001
      heartbeat:
        port: 3002
    namespaces:
      - name: test
        memory-size: 3000000000
        replication-factor: 2
        storage-engine:
          type: memory
```

## Configuration

The initial part of the CR selects the CRD and the namespace to use for the Aerospike cluster.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike
```

## Spec

The spec section defines the cluster's configurations.

| Field                                                                    | Required | Type      | Default | Description                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------ | -------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| size <br /><sub>`Dynamic`</sub>                                          | Yes      | Integer   |         | The size/number of Aerospike node pods to run for this cluster.                                                                                                                                                                                                                                                     |
| image <br /><sub>`Dynamic` **`Rolling restart`**</sub>                   | Yes      | String    |         | The official Aerospike Enterprise Server docker image to use for the node in the cluster.                                                                                                                                                                                                                           |
| podSpec            <br /><sub>`Dynamic` **`Rolling restart`**</sub>      | No       | Structure |         | Configures the Kubernetes pod running Aerospike server. See [Pod Spec](#pod-spec) for details.                                                                                                                                                                                     |
| storage   <br /><sub>`Dynamic`</sub>                                     | No       | Structure |         | Required for persistent namespaces and for Aerospike [work directory](https://docs.aerospike.com/docs/configuration/index.md?show-removed=1#work-directory), unless the validation policy skips validating persistence of the work directory. See [Storage](#storage) for details. |
| aerospikeNetworkPolicy  <br /><sub>`Dynamic` **`Rolling restart`**</sub> | No       | Structure |         | Configures IP and port types used for access. See [Network Policy](#network-policy) for details.                                                                                                                                                                                   |
| aerospikeAccessControl  <br /><sub>`Dynamic`</sub>                       | No       | Structure |         | Required if Aerospike security is enabled. See [Access Control](#aerospike-access-control) for  details                                                                                                                                                                            |
| aerospikeConfig       <br /><sub>`Dynamic` **`Rolling restart`**</sub>   | Yes      | configMap |         | A free form configMap confirming to the configuration schema for the deployed Aerospike server version. See [Aerospike Config](#aerospike-config) for details.                                                                                                                     |
| rackConfig            <br /><sub>`Dynamic`</sub>                         | No       | Structure |         | Configures the operator to deploy rack aware Aerospike cluster. Pods will be deployed in given racks based on given configuration. See [Rack Config](#rack-config) for details.                                                                                                    |
| operatorClientCert  <br /><sub>`Dynamic`</sub>                           | With TLS | Structure |         | Configures the TLS certs used by the operator when connecting to the Aerospike cluster. See [Operator Client Certs](#operator-client-cert) for details.                                                                                                                                      |
| validationPolicy  <br /><sub>`Dynamic`</sub>                             | No       | Structure |         | Configures the custom resource validation. See [Validation Policy](#validation-policy) for details.                                                                                                                                                                                |
| seedsFinderServices  <br /><sub>`Dynamic`</sub>                             | No       | Structure |         | creates additional Kubernetes service that allow clients to discover Aerospike cluster nodes. See [Seeds Finder Services](#seeds-finder-services) for details.|

## Operator Client Cert

The operator needs to connect as an Aerospike client to perform management `asinfo` calls. If the Aerospike service is configured to use TLS for clients, you need to specify the certificates the client uses to make these calls.

| Field                                                                    | Required | Type      | Default | Description                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------ | -------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tlsClientName                                          | No      | String   |         | If specified, this name will be added to tls-authenticate-client list by the operator so that it will always to allowed by the Aerospike servers.|
| secretCertSource                                       | `*`Yes      | Structure   |         | The operator certs should be read from a secret. See [Secret Cert Source](#secret-cert-source) for details.|
| certPathInOperator                                       | `*`Yes      | Structure   |         | The operator certs should be read from files mounted into the operator container. See [Cert Path In Operator Source](#cert-path-in-operator-source) for details.|

 `*` Exactly one for secretCertSource or certPathInOperator must be specified

### Secret Cert Source

Specifies that the certificate should be read from a Kubernetes Secret.

| Field                                                                    | Required | Type      | Default | Description                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------ | -------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secretName                                          | Yes      | String   |         | The name of the secret.|
| secretNamespace                                          | No      | String   | Operator's namespace        | The namespace containing the secret.|
| caCertsFilename                                          | No      | String   |         | The name of the secret key /file containing the CA certificate.|
| clientCertFilename                                         | No      | String   |         | The name of the secret key /file containing the operator's certificate.|
| clientKeyFilename                                          | No      | String   |         | The name of the secret key /file containing the operator's secret key.|

### Cert Path In Operator Source

Specifies that the operator's certificate files are mounted onto the operator's containers.


| Field                                                                    | Required | Type      | Default | Description                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------ | -------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| caCertsPath                                          | No      | String   |         | The path to the file containing the CA certificate.|
| clientCertPath                                          | No      | String   |         | The path to the file containing the operator's certificate.|
| clientKeyPath                                          | No      | String   |         | The path to the file containing the operator's secret key.|


## Pod Spec

Configures the Kubernetes pod running Aerospike server. Sidecar containers for monitoring or running connectors can be added to each Aerospike pod.

| Field    | Required | Type                                                                            | Default | Description                                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| metadata | No       | Structure |         | Kubernetes Annotations and Labels to add to pods. See [metadata](#metadata) for details|
| multiPodPerHost |	No |	Boolean |	False |	Indicates if the operator should run multiple pods per Kubernetes cluster host. |
| affinity| No | Kubernetes Pod [Affinity](https://pkg.go.dev/k8s.io/api/core/v1#Affinity) | | Kubernetes Affinity rules for pod placement. These rules will be merged with affinity rules generated by the operator.|
| tolerations| No | Kubernetes Pod [Tolerations](https://pkg.go.dev/k8s.io/api/core/v1#toleration) | | Kubernetes Toleration for Aerospike pod placement|
| nodeSelector| No | Map from string to string | | [Node selector](https://v1-18.docs.kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) constraints for the Aerospike pods.|
| hostNetwork |	No |	Boolean |	False |	Enables host networking for the pod. To enable hostNetwork, `multiPodPerHost` must be false.|
| dnsPolicy | No       | Kubernetes [DNSPolicy](https://pkg.go.dev/k8s.io/api/core/v1#DNSPolicy) |         | [DnsPolicy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy) to use. If `hostNetwork` is true and policy is not specified, it defaults to ClusterFirstWithHostNet|
| aerospikeContainer | No       | Structure |         | Configures the aerospike-server container created by operator. See [Aerospike Container](#aerospike-container) for details.|
| sidecars | No       | List of [Container](https://pkg.go.dev/k8s.io/api/core/v1#Container) structures |         | List of side containers to run along with the main Aerospike server container. Volume mounts are not supported. See [storage](#storage) for attaching volumes to sidecars. |
| initContainers | No       | List of [Container](https://pkg.go.dev/k8s.io/api/core/v1#Container) structures |         | List of init containers before running Aerospike and the sidecar containers. |

See [Monitoring](Monitoring.md) for details on configuring monitoring sidecars or Aerospike containers.

### Metadata

Kubernetes annotations and labels to add to the pods.

| Field    | Required | Type                                                                            | Default | Description                                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| annotations | No       | Map from annotation name to its value |         | Kubernetes Annotations  |
| labels | No       | Map from label name to its value |         | Kubernetes Labels  |


### Aerospike Container

Configures the `aerospike-server` container created by operator.

| Field    | Required | Type                                                                            | Default | Description                                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| securityContext | No       | Structure [SecurityContext](https://pkg.go.dev/k8s.io/api/core/v1#SecurityContext) |         | Kubernetes security context for the Aerospike container.|
| resources | No       | Structure [ResourceRequirements](https://pkg.go.dev/k8s.io/api/core/v1#ResourceRequirements) |         | Configures resources requirements and limits like CPU or memory for the Aerospike container.|

## Storage

The storage section configures persistent volume devices to provision and attach to the containers.

This section is required by default for persisting the Aerospike work directory. Store the work directory on persistent storage to ensure pod restarts do not reset Aerospike server metadata files.

This section is also required if Aerospike namespaces require persistent storage.

| Field                                                 | Required | Type              | Default | Description                                                                                                                               |
| ----------------------------------------------------- | -------- | ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| filesystemVolumePolicy     <br /><sub>`Dynamic`</sub> | No       | Structure         |         | [Volume policy](#volume-policy) for filesystem volumes                                                   |
| blockVolumePolicy          <br /><sub>`Dynamic`</sub> | No       | Structure         |         | [Volume policy](#volume-policy) for block volumes                                                        |
| Volumes                    <br /><sub>`Dynamic`</sub> | No       | List of [Volumes](#volume) Structures |         | List of [Volumes](#volume) to attach to Aerospike pods. Persistent storage volumes cannot be added or removed dynamically. |

### Volume Policy

Specifies persistent volume policy to determine how new volumes are initialized.

| Field                                    | Required | Type    | Default | Description                                                                                                                                                         |
| ---------------------------------------- | -------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initMethod    <br /><sub>`Dynamic`</sub> | No       | Enum    | none    | Controls how the volumes are initialized when the persistent volume is attached the first time to a pod. Valid values are `none`, `dd`, `blkdiscard`, `deleteFiles` |
| cascadeDelete <br /><sub>`Dynamic`</sub> | No       | Boolean | false   | CascadeDelete determines if the persistent volumes are deleted after the pods these volumes binds to are terminated and removed from the cluster                    |

For filesystem volumes, initMethod can be `none` or `deleteFiles`.
For block volumes, initMethod can be `none`, `dd` or `blkdiscard`.

:::note
`blkdiscard` only works for devices which support [TRIM](https://en.wikipedia.org/wiki/Trim_%28computing%29). For AWS please refer to the [storage volumes guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#instance-store-volumes) to check TRIM support. If TRIM is not supported please use the slower `dd` to initialize your devices. For other devices please verify the support for TRIM command.
:::

### Volume

Describes volumes to be created and attached to the init containers and main Aerospike container, as well as other sidecars.

| Field                                     | Required | Type                                | Default | Description                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------- | -------- | ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                                      | Yes      | String                              |         | A name identifying this volume, which must be unique among all created volumes.|
| source                                    | Yes      | Structure                           |         | Specifies the source for this volume. See [Volume Source](#volume-source) for details |
| aerospike                                 | No      | Structure                              |         | Specifies how this volume is attached to the main Aerospike server container. See [AerospikeServerVolumeAttachment](#aerospike-server-volume-attachment) for details.|
| sidecars                                  | No      | Structure |         | Attaches this volume to other sidecar containers. See [Volume Attachment](#volume-attachment) for details. |
| initContainers                            | No      | Structure |         | Attaches this volume to other init containers. See [Volume Attachment](#volume-attachment) for details. |
| initMethod <br /><sub>`Dynamic`</sub>     | No       | Enum                                | none    | Controls how this volume is initialized when the persistent volume is attached the first time to a pod. Valid values are `none`, `dd`, `blkdiscard`, `deleteFiles`                                                                                                                                                                      |
| cascadeDelete  <br /><sub>`Dynamic`</sub> | No       | Boolean                             | false   | CascadeDelete determines if the persistent volume is deleted after the pod this volume binds to is terminated and removed from the cluster                                                                                                                                                                                              |

For filesystem volumes, initMethod can be `none` or `deleteFiles`.
For block volumes, initMethod can be `none`, `dd` or `blkdiscard`.

:::note
`blkdiscard` will only work for devices that support [TRIM](https://en.wikipedia.org/wiki/Trim_%28computing%29). For AWS please refer to the [storage volumes guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html#instance-store-volumes) to check TRIM support. If TRIM is not supported please use the slower `dd` if your devices need initialization. For other devices please verify the support for TRIM command.
:::

#### Aerospike Server Volume Attachment

Specifies attaching a volume to the main Aerospike server container.

| Field                                     | Required | Type                                | Default | Description                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------- | -------- | ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path                                      | Yes      | String                              |         | The path to attach the volume to the Aerospike Container.|

#### Volume Attachment

Specifies attaching a volume to a sidecar container.

| Field                                     | Required | Type                                | Default | Description                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------- | -------- | ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| containerName                                      | Yes      | String                              |         | The name of the container to attach this volume to.|
| path                                      | Yes      | String                              |         | The path to attach the volume to the Aerospike Container.|


#### Volume Source

A Volume source specifies the source for an attached volume. Volumes are created using a volume source that can be one of the following:

* Persistent volume
* EmptyDir
* Secret
* ConfigMap

#### Persistent Volume

Specifies a persistent volume to claim and attach to Aerospike pods.

| Field                                     | Required | Type                                | Default | Description                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------- | -------- | ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| storageClass                              | Yes      | String                              |         | The name of the storage class to use.                                                                                                                                                                                                                                                                                                   |
| volumeMode                                | Yes      | Enum - Filesystem, Block |         | Specified the mode this volume should be created with. `Filesystem` creates a pre-formatted filesystem. Block mode creates a raw device. |
| size                                      | Yes      | String [Quantity](https://pkg.go.dev/k8s.io/apimachinery/pkg/api/resource#Quantity)                            |         | The device size to be provisioned. E.g. 5Gi |
| accessModes                               | No       | List of [PersistentVolumeAccessMode](https://pkg.go.dev/k8s.io/api/core/v1#PersistentVolumeAccessMode)                              |      | Allowed access modes to the volume. E.g. ReadWriteOnce, ReadOnlyMany, ReadWriteMany |
| selector                               | No          | [LabelSelector](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors)                              |      | Only the volumes whose labels match the selector will be claimed.|
| initMethod <br /><sub>`Dynamic`</sub>     | No       | Enum                                | none    | Controls how this volume is initialized when the persistent volume is attached the first time to a pod. Valid values are `none`, `dd`, `blkdiscard`, `deleteFiles`                                                                                                                                                                      |
| cascadeDelete  <br /><sub>`Dynamic`</sub> | No       | Boolean                             | false   | CascadeDelete determines if the persistent volume is deleted after the pod this volume binds to is terminated and removed from the cluster                                                                                                                                                                                              |


#### EmptyDir

EmptyDir are volumes to be used as temporary working disk space. See [the official documentation](https://pkg.go.dev/k8s.io/api/core/v1#EmptyDirVolumeSource) for options.

```yaml
      - name: tempFiles
        aerospike:
          path: /opt/aerospike/temp
        source:
          emptyDir: {}
```

#### Secret

A Kubernetes Secret can be mounted as a volume. You can use a Secret for mounting the Aerospike license file (features.conf) or sensitive files like TLS certificates and credentials onto the containers.


```yaml
- name: aerospike-config-secret
        source:
          secret:
            secretName: aerospike-secret
        aerospike:
          path: /etc/aerospike/secret
```

#### ConfigMap

A Kubernetes ConfigMap can be mounted as  a volume. ConfigMaps hold non-confidential data like configuration for applications running in your custom init containers or sidecars.

```yaml
- name: app-config
    source:
      configMap:
        # Provide the name of the ConfigMap you want to mount.
        name: app-config
        # An optional array of keys from the ConfigMap to create as files
        items:
        - key: "game.properties"
          path: "game.properties"
        - key: "user-interface.properties"
          path: "user-interface.properties"

```

## Validation Policy

This section configures the policy for validating the cluster CR.

| Field                                              | Required | Type    | Default | Description                                                                                  |
| -------------------------------------------------- | -------- | ------- | ------- | -------------------------------------------------------------------------------------------- |
| skipWorkDirValidate     <br /><sub>`Dynamic`</sub> | No       | Boolean | false   | If true skips validating that the Aerospike work directory is stored on a persistent volume. |
| skipXdrDlogFileValidate <br /><sub>`Dynamic`</sub> | No       | Boolean | false   | If true skips validating that the XDR digest log is stored on a persistent volume.           |

## Network Policy

This section configures IP and port types used for access, alternate access, TLS access, and TLS alternate access endpoints on the Aerospike cluster.

Three types of endpoint configurations are supported.

* **pod** uses the Kubernetes pod IP and Aerospike port that works to connect from other pods in the same Kubernetes cluster.
* **hostInternal** uses the Kubernetes cluster node's host IP and a mapped Aerospike port that works to connect from the VPC or internal network used by the Kubernetes cluster.
* **hostExternal** uses the Kubernetes cluster node's host external/public IP and a mapped Aerospike port that works to connect from the external network.

| Field                                                                   | Required | Type                                   | Default      | Description                                     |
| ----------------------------------------------------------------------- | -------- | -------------------------------------- | ------------ | ----------------------------------------------- |
| access     <br /><sub>`Dynamic` **`Rolling restart`**</sub>             | No       | Enum [pod, hostInternal, hostExternal] | hostInternal | Configures Aerospike access endpoint.           |
| alternateAccess     <br /><sub>`Dynamic` **`Rolling restart`**</sub>    | No       | Enum [pod, hostInternal, hostExternal] | hostExternal | Configures Aerospike alternate access endpoint. |
| tlsAccess     <br /><sub>`Dynamic` **`Rolling restart`**</sub>          | No       | Enum [pod, hostInternal, hostExternal] | hostInternal | Configures Aerospike TLS access endpoint.       |
| tlsAlternateAccess     <br /><sub>`Dynamic` **`Rolling restart`**</sub> | No       | Enum [pod, hostInternal, hostExternal] | hostExternal | Configures Aerospike TLS alternate endpoint.    |


## Aerospike Access Control

Provides Aerospike [access control](https://docs.aerospike.com/docs/configure/security/access-control/index.md) configuration for the Aerospike cluster.

| Field                             | Required | Type               | Default | Description                                                                                                                                           |
| --------------------------------- | -------- | ------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| roles  <br /><sub>`Dynamic`</sub> | No       | List of Structures |         | A list of [Role](#aerospike-role) structures with an entry for each role.                                            |
| users  <br /><sub>`Dynamic`</sub> | No       | List of Structures |         | A list of [User](#aerospike-user) structures with an entry for each user. Required if Aerospike security is enabled. |

If the Aerospike cluster has security enabled an entry for the "admin" user having at least "sys-admin" and "user-admin" roles is mandatory.

### Aerospike Role

Configures roles for the Aerospike cluster.

| Field                                      | Required | Type            | Default | Description                        |
| ------------------------------------------ | -------- | --------------- | ------- | ---------------------------------- |
| name                                       | Yes      | Strings         |         | The name of this role.             |
| privileges      <br /><sub>`Dynamic`</sub> | Yes      | List of Strings |         | The privileges to grant this role. |
| whitelist      <br /><sub>`Dynamic`</sub> | No      | Whitelist of host address allowed for this role.|
| readQuota      <br /><sub>`Dynamic`</sub> | No      | specifies permitted rate of read records for current role (the value is in RPS)|
| writeQuota      <br /><sub>`Dynamic`</sub> | No      | specifies permitted rate of writes for current role (the value is in RPS)|

### Aerospike User

Configures users for the Aerospike cluster.

| Field                                       | Required | Type            | Default | Description                                             |
| ------------------------------------------- | -------- | --------------- | ------- | ------------------------------------------------------- |
| name                                        | Yes      | Strings         |         | The name of this user.                                  |
| secretName       <br /><sub>`Dynamic`</sub> | Yes      | String          |         | The name of the secret containing this user's password. |
| roles            <br /><sub>`Dynamic`</sub> | Yes      | List of Strings |         | The roles to grant to this user.                        |

## Aerospike Config Secret

Configures the name of the secret to use and the mount path to mount the secret files on the container.

| Field                                  | Required | Type   | Default | Description                                                       |
| -------------------------------------- | -------- | ------ | ------- | ----------------------------------------------------------------- |
| secretName  <br /><sub>`Dynamic`</sub> | Yes      | String |         | The name of the secret                                            |
| mountPath  <br /><sub>`Dynamic`</sub>  | Yes      | String |         | The path where the secret files will be mounted in the container. |

## Aerospike Config

The YAML form of Aerospike server configuration. See [Aerospike Configuration](Aerospike-configuration-mapping.md) for details.

## Rack Config

Configures the operator to deploy a rack-aware Aerospike cluster. Pods will be deployed in given racks based on the given configuration.

| Field                                                       | Required | Type               | Default | Description                                                          |
| ----------------------------------------------------------- | -------- | ------------------ | ------- | -------------------------------------------------------------------- |
| namespaces <br /><sub>`Dynamic` **`Rolling restart`**</sub> | No       | List of Strings    |         | List of Aerospike namespaces for which rack feature will be enabled. |
| racks <br /><sub>`Dynamic`</sub>                            | Yes      | List of structures |         | List of [racks](#rack)              |

See [Rack awareness](Rack-Awareness.md) for details.

### Rack

Specifies single rack config

| Field                                                             | Required | Type      | Default | Description                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | -------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                                                | Yes      | Integer   |         | Identifier for the rack.                                                                                                                                                                                                                                                                                                                                  |
| zone                                                              | No       | String    |         | Zone name for setting rack affinity. Rack pods will be deployed to the given Zone.                                                                                                                                                                                                                                                                        |
| region                                                            | No       | String    |         | Region name for setting rack affinity. Rack pods will be deployed to the given Region.                                                                                                                                                                                                                                                                    |
| rackLabel                                                         | No       | String    |         | Rack label for setting rack affinity. Rack pods will be deployed in k8s nodes having rack label `aerospike.com/rack-label: <rack-label>`.                                                                                                                                                                                                                 |
| nodeName                                                          | No       | String    |         | K8s Node name for setting rack affinity. Rack pods will be deployed on the given k8s Node.                                                                                                                                                                                                                                                                |
| aerospikeConfig  <br /><sub>`Dynamic` **`Rolling restart`**</sub> | No       | Structure |         | This local [AerospikeConfig](#aerospike-config) is a patch, which will be merged recursively with common global AerospikeConfig and will be used for this Rack. See [merging AerospikeConfig](Rack-Awareness.md#merging-aerospikeconfig). If this AerospikeConfig is not given then global AerospikeConfig will be used. |
| storage  <br /><sub>`Dynamic`</sub>                               | No       | Structure |         | This local [Storage](#storage) specify persistent storage to use for the pods in this rack. If this Storage is not given then global Storage will be used.                                                                                                                                                               |
| podSpec  <br /><sub>`Dynamic`</sub>                               | No       | Structure |         | Pod overrides for this rack. See [Rack Pod Overrides](#rack-pod-overrides) for details.|

#### Rack Pod Overrides

Provides rack-specific overrides to the Pod spec.

The following overrides are supported.

| Field                                                             | Required | Type      | Default | Description                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | -------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| affinity| No | Kubernetes Pod [Affinity](https://pkg.go.dev/k8s.io/api/core/v1#Affinity) | | Kubernetes Affinity rules for pod placement. These rules will be merged with affinity rules generated by the operator.|
| tolerations| No | Kubernetes Pod [Tolerations](https://pkg.go.dev/k8s.io/api/core/v1#toleration) | | Kubernetes Toleration for Aerospike pod placement|
| nodeSelector| No | Map from string to string | | [Node selector](https://v1-18.docs.kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) constraints for the Aerospike pods.|

## Seeds Finder Services

Creates additional Kubernetes service that allow clients to discover Aerospike cluster nodes.

| Field                                                             | Required | Type      | Default | Description                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | -------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| loadBalancer                                                      | No      | Structure   |         | Creates a load balancer service that allows Aerospike clients to discover Aerospike cluster nodes. See [#load balancer Service](#load-balancer-service) for details.                                                                                                                                                                                                                                                                                                                                  |

### Load Balancer Service

Creates a load balancer service which lets Aerospike clients discover Aerospike cluster nodes.

| Field                                                             | Required | Type      | Default | Description                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | -------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| externalTrafficPolicy                                                      | No      | Enum - Local, Cluster   |         |External Traffic Policy Type string. See [ServiceExternalTrafficPolicyType](https://pkg.go.dev/k8s.io/api/core/v1#ServiceExternalTrafficPolicyType) for details.|
| annotations | No       | Map from annotation name to its value |         | Kubernetes Annotations for the load balancer. |
| port | No       |  |         | Exposed port on load balancer. If not specified targetPort is used. |
