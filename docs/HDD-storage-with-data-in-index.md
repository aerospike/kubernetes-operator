---
title: HDD Storage With Data In Index
description: HDD Storage With Data In Index
---

This example sets up a specialized namespace where records have a single-bin and fit in 8 bytes. For more information on setting up HDD storage with data-in-index and other storage configurations, [see the Aerospike documentation for namespace storage configuration](https://docs.aerospike.com/docs/operations/configure/namespace/storage/index.html).

To set this up, add the following storage-specific configuration to the Aerospike cluster's CR file.

```yaml
  storage:
    filesystemVolumePolicy:
      cascadeDelete: true
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
      - name: nstest
        aerospike:
          path: /opt/aerospike/data/test
        source:
          persistentVolume:
            storageClass: ssd
            volumeMode: Filesystem
            size: 3Gi
      - name: nsbar
        aerospike:
          path: /opt/aerospike/data/bar
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
    namespaces:
      - name: test
        memory-size: 2000000000
        single-bin: true
        data-in-index: true
        replication-factor: 1
        storage-engine:
          type: device
          files:
            - /opt/aerospike/data/test/test.dat
          filesize: 2000000000
          data-in-memory: true
      - name: bar
        memory-size: 3000000000
        single-bin: true
        data-in-index: true
        replication-factor: 1
        storage-engine:
          type: device
          files:
            - /opt/aerospike/data/bar/bar.dat
          filesize: 2000000000
          data-in-memory: true
```

For the full CR file, see the [example HDD storage with data-in-index cluster CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/hdd_dii_storage_cluster_cr.yaml).

This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```
