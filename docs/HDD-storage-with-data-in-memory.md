---
title: HDD Storage With Data In Memory
description: HDD Storage With Data In Memory
---

This example lets you store namespace data both in memory and on the persistent device. For more information on setting up HDD storage with data-in-memory and other storage configurations, [see the Aerospike documentation for namespace storage configuration](https://docs.aerospike.com/docs/operations/configure/namespace/storage/index.html).

To set this up, add the following storage-specific configuration to the Aerospike cluster's CR file.

```yaml
  storage:
    filesystemVolumePolicy:
      cascadeDelete: false
      initMethod: deleteFiles
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
          path: /opt/aerospike/data
        source:
          persistentVolume:
            storageClass: ssd
            volumeMode: Filesystem
            size: 3Gi
      - name: aerospike-config-secret
        source:
          secret:
            secretName: aerospike-secret
        aerospike:
          path: /etc/aerospike/secret
  .
  .
  .
  aerospikeConfig:
    service:
      feature-key-file: /etc/aerospike/secret/features.conf
    security:
      enable-security: true
    namespace:
      - name: test
        memory-size: 3000000000
        replication-factor: 2
        storage-engine:
          type: device
          file:
            - /opt/aerospike/data/test.dat
          filesize: 2000000000
          data-in-memory: true
```

For the full CR file, see the [example HDD storage with data-in-memory cluster CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/hdd_dim_storage_cluster_cr.yaml).

This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```
