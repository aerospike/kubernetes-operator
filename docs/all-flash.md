---
title: All-Flash
description: Example config file for a setup where Aerospike data and index both use flash storage.
---

This example creates a cluster where Aerospike data and index both use flash storage. For more information on all-flash and other storage configurations, [see the Aerospike documentation for namespace storage configuration](https://docs.aerospike.com/docs/operations/configure/namespace/storage/index.html).

:::caution
This requires the Aerospike pod to be run in elevated privileged mode. In privileged mode when using index on flash, Aerospike Server tweaks the Kubernetes worker node's sysctls for Virtual Memory.
:::

To set this up, add the following to the Aerospike cluster's CR file.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  size: 2
  image: aerospike/aerospike-server-enterprise:5.7.0.8

  storage:
    filesystemVolumePolicy:
      initMethod: deleteFiles
      cascadeDelete: true
    blockVolumePolicy:
      cascadeDelete: true
    volumes:
      - name: workdir
        aerospike:
          path: /opt/aerospike
        source:
          persistentVolume:
            storageClass: ssd
            volumeMode: Filesystem
            size: 1Gi
      - name: ns
        aerospike:
          path: /test/dev/xvdf
        source:
          persistentVolume:
            storageClass: ssd
            volumeMode: Block
            size: 5Gi
      - name: ns-index
        aerospike:
          path: /test/dev/xvdf-index
        source:
          persistentVolume:
            storageClass: ssd
            volumeMode: Filesystem
            size: 5Gi
      - name: aerospike-config-secret
        source:
          secret:
            secretName: aerospike-secret
        aerospike:
          path: /etc/aerospike/secret

  podSpec:
    multiPodPerHost: true
    aerospikeContainer:
      securityContext:
        privileged: true

  aerospikeAccessControl:
    users:
      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
          - data-admin
          - read
          - write

  aerospikeConfig:
    service:
      feature-key-file: /etc/aerospike/secret/features.conf
    security: {}
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
        index-type:
          type: flash
          mounts:
            - /test/dev/xvdf-index
          mounts-size-limit: 4294967296
        storage-engine:
          type: device
          devices:
            - /test/dev/xvdf
```

For the full CR file, see the [example all-flash cluster CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/2.0.0/config/samples/all_flash_cluster_cr.yaml).

This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```
