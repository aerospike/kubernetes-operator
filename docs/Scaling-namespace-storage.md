---
title: Scaling Namespace Storage
description: Scaling Namespace Storage
---

Scaling namespace storage (vertical scaling) can be a complex topic. The Operator uses Kubernetes StatefulSet for deploying Aerospike clusters. StatefulSet uses PersistentVolumeClaim for providing storage. Currently a PersistentVolumeClaim cannot be updated under these circumstances, which prevents the Operator from providing a simple solution for vertical scaling.

We recommend using the Aerospike Rack Awareness feature to perform vertical scaling.

For this example, we assume that cluster is deployed with the CR file `aerospike-cluster.yaml`.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  size: 2
  image: aerospike/aerospike-server-enterprise:4.9.0.33

  rackConfig:
    namespaces:
      - test
    racks:
      - id: 1
        zone: us-central1-b
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
            - name: ns
              aerospike:
                path: /dev/sdf
              source:
                persistentVolume:
                  storageClass: ssd
                  volumeMode: Block
                  size: 3Gi
            - name: aerospike-config-secret
              source:
                secret:
                  secretName: aerospike-secret
              aerospike:
                path: /etc/aerospike/secret

  aerospikeConfig:
    service:
      feature-key-file: /etc/aerospike/secret/features.conf
    security: {}
    namespaces:
      - name: test
        memory-size: 6000000000
        replication-factor: 2
        storage-engine:
          type: device
          devices:
            - /dev/sdf
.
.
.
```

## Create a New Rack

To resize `/dev/sdf` for namespace `test`,  create a new `rack` inside `rackConfig` with updated `storage` config, and remove the old rack.

You can create the new rack in the same physical rack if there is enough space. Use the existing `zone/region` to hold the new storage and old storage together.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  size: 2
  image: aerospike/aerospike-server-enterprise:4.9.0.33

  rackConfig:
    namespaces:
      - test
    racks:
      # Added new rack with id: 2. Old rack with id: 1 is removed
      - id: 2
        zone: us-central1-b
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
            - name: ns
              aerospike:
                path: /dev/sdf
              source:
                persistentVolume:
                  storageClass: ssd
                  volumeMode: Block
                  size: 8Gi
            - name: aerospike-config-secret
              source:
                secret:
                  secretName: aerospike-secret
              aerospike:
                path: /etc/aerospike/secret

  aerospikeConfig:
    service:
      feature-key-file: /etc/aerospike/secret/features.conf
    security: {}
    namespaces:
      - name: test
        memory-size: 10000000000
        replication-factor: 2
        storage-engine:
          type: device
          devices:
            - /dev/sdf
.
.
.
```

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```

This creates a new rack with `id: 2` and updated `storage` config. The old data is migrated to new rack. The old rack is removed gracefully.

Check the pods.

```sh
$ kubectl get pods -n aerospike
NAME                READY   STATUS          RESTARTS   AGE
aerocluster-2-0     1/1     Running         0          3m6s
aerocluster-2-1     1/1     Running         0          3m6s
aerocluster-1-1     1/1     Terminating     0          30s
```
