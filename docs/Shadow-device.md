---
title: Shadow Device
description: Shadow Device
---

In cloud environments, the namespace storage engine can be configured to use extremely high-performance cloud instance-attached local SSDs. Under this setup, writes will be duplicated to another network-attached shadow device for persistence in case the cloud instance terminates.

To set this up, follow the instructions in our [storage provisioning guide](Storage-provisioning.md) to create a local volume provisioner and appropriate storage class.

For more information on using a shadow device and other storage configurations, [see the Aerospike documentation for namespace storage configuration](https://docs.aerospike.com/docs/operations/configure/namespace/storage/index.html).

Next, add the following storage-specific configuration to the Aerospike cluster's CR file.

```yaml
  storage:
    filesystemVolumePolicy:
      cascadeDelete: true
      initMethod: deleteFiles
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
      - name: nsvol1
        aerospike:
          path: /dev/nvme0n1
        source:
          persistentVolume:
            storageClass: local-ssd
            volumeMode: Block
            size: 5Gi
      - name: nsvol2
        aerospike:
          path: /dev/sdf
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
            - /dev/nvme0n1 /dev/sdf
```

For the full CR file, see the [example shadow device cluster CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/shadow_device_cluster_cr.yaml).

This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```
