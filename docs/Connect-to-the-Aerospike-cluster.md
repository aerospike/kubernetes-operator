---
title: Connect To The Aerospike Cluster
description: Connect To The Aerospike Cluster
---

You can connect to an Aerospike cluster deployed by Aerospike Kubernetes Operator through [Aerospike Admin (asadm)](https://docs.aerospike.com/docs/tools/asadm/) or through applications which use Aerospike client libraries.

## Port Access

When the Aerospike cluster is deployed in a **single** pod per Kubernetes host mode([`multiPodPerHost` set to default of 'false'](Cluster-configuration-settings.md)), ports `3000 (service port)` and `4333 (TLS port)` on all Kubernetes hosts should be accessible to all clients and tools.

When the Aerospike cluster is configured to have **multiple** pods per Kubernetes host mode([`multiPodPerHost` set to  'true'](Cluster-configuration-settings.md)), port range `(30000–32767)` on all Kubernetes hosts should be accessible to all clients and tools.

Configure the firewall rules for the Kubernetes cluster accordingly.

See the [Cluster Configuration Settings](Cluster-configuration-settings.md) section for more information on using the `multiPodPerHost` setting.

## Aerospike Node Endpoints

Use `kubectl describe` to get the IP addresses and port numbers:

```shell
 kubectl -n [namespace] describe aerospikecluster [Aerospike_cluster name]
```

For example, to get the IP addresses and port numbers for the cluster `aerocluster` in the `aerospike` namespace:

```shell
kubectl -n aerospike describe aerospikecluster aerocluster
```

The **Status > Pods** section provides pod-wise access, alternate access, TLS access, and TLS alternate access endpoints as well as TLS name (if TLS is configured) to be used to access the cluster.

```shell
$ kubectl -n aerospike describe aerospikecluster aerocluster
Name:         aerocluster
Namespace:    aerospike
Labels:       <none>
Annotations:  API Version:  aerospike.com/v1alpha1
API Version:  aerospike.com/v1alpha1
Kind:         AerospikeCluster
.
.
.
Status:
  Aerospike Access Control:
    Users:
      Name:  admin
      Roles:
        sys-admin
        user-admin
      Secret Name:  auth-secret
  Aerospike Config:
    Logging:
      Any:         info
      Clustering:  debug
      Name:        /var/log/aerospike/aerospike.log
      Any:         info
      Name:        console
    Namespaces:
      Memory - Size:         3000000000
      Name:                  test
      Replication - Factor:  2
      Storage - Engine:      memory
.
.
.
  Pods:
    aerocluster-0-0:
      Aerospike:
        Access Endpoints:
          10.128.15.225:31312
        Alternate Access Endpoints:
          34.70.193.192:31312
        Cluster Name:  aerocluster
        Node ID:       0a0
        Tls Access Endpoints:
        Tls Alternate Access Endpoints:
        Tls Name:
      Host External IP:  34.70.193.192
      Host Internal IP:  10.128.15.225
      Image:             aerospike/aerospike-server-enterprise:5.2.0.7
      Initialized Volume Paths:
        /opt/aerospike
      Pod IP:        10.0.4.6
      Pod Port:      3000
      Service Port:  31312
    aerocluster-0-1:
      Aerospike:
        Access Endpoints:
          10.128.15.226:30196
        Alternate Access Endpoints:
          35.192.88.52:30196
        Cluster Name:  aerocluster
        Node ID:       0a1
        Tls Access Endpoints:
        Tls Alternate Access Endpoints:
        Tls Name:
      Host External IP:  35.192.88.52
      Host Internal IP:  10.128.15.226
      Image:             aerospike/aerospike-server-enterprise:5.2.0.7
      Initialized Volume Paths:
        /opt/aerospike
      Pod IP:        10.0.5.8
      Pod Port:      3000
      Service Port:  30196

```

## Connect to the Cluster

When connecting from outside the Kubernetes cluster network, you need to use the host external IPs. By default, the Operator configures access endpoints to use Kubernetes host internal IPs and alternate access endpoints to use host external IPs.

Please refer to [network policy](Cluster-configuration-settings.md#network-policy) configuration for details.

From the example status output, for pod aerocluster-0-0, the alternate access endpoint is 34.70.193.192:31312

### With a Client

To use a client from outside the Kubernetes network using external IPs set the following for the client policy using appropriate client API.

```yaml
host: 34.70.193.192
port: :31312
username: admin
password: admin123 # based on the configured secret
use-services-alternate: true
```

To use asadm from within the Kubernetes network run:

```yaml
host: 10.128.15.225
port: :31312
username: admin
password: admin123 # based on the configured secret
use-services-alternate: false
```

### With asadm

With kubectl

```shell
kubectl run -it --rm --restart=Never aerospike-tool -n aerospike --image=aerospike/aerospike-tools:latest -- asadm -h [cluster name] -U [username] -P [password]
```

To use asadm from outside the Kubernetes network:

```shell
asadm -h 34.70.193.192:31312 -U [username] -P [password] --services-alternate
```

To use asadm from within the Kubernetes network:

```shell
asadm -h 10.128.15.225:31312 -U [username] -P [password]
```
