---
title: Data On SSD
description: Data On SSD
---

The following storage configuration sets up the Aerospike cluster to store namespace data on a provisioned SSD storage device.

For more information on storing namespace data on SSD and other storage configurations, [see the Aerospike documentation for namespace storage configuration](https://docs.aerospike.com/docs/operations/configure/namespace/storage/index.html).

To set this up, add the following storage-specific configuration to the Aerospike cluster's CR file.

```yaml
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
        memory-size: 3000000000
        replication-factor: 2
        storage-engine:
          type: device
          devices:
            - /test/dev/xvdf
```

For the full CR file, see the [example SSD storage cluster CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/ssd_storage_cluster_cr.yaml).

This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```
