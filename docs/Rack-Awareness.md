---
title: Rack Awareness
description: Rack Awareness
---

In many situations, it's considered a "best practice" to build clusters which span multiple availability zones. Aerospike’s Rack Awareness feature lets you split your database across multiple racks or zones.

For example, if you set a replication factor of 2, the master copy of the partition and its replica are stored on separate hardware failure groups.

Rack Awareness also provides a mechanism which lets database clients read from servers in their nearest rack or zone on a preferential basis. This can provide lower latency, increase stability, and significantly reduce traffic charges by limiting cross-availability-zone traffic.

For more information, [see the documentation on Aerospike Rack Awareness](https://docs.aerospike.com/docs/architecture/rack-aware.html).

## Add Rack Awareness

This example adds Rack Awareness to an existing Aerospike cluster CR file.

```yaml
  rackConfig:
    namespaces:
      - test
    racks:
      - id: 1
        zone: us-central1-b
        aerospikeConfig:
          service:
            proto-fd-max: 18000
        storage:
          filesystemVolumePolicy:
            initMethod: deleteFiles
            cascadeDelete: true
          blockVolumePolicy:
            cascadeDelete: true
          volumes:
            - storageClass: ssd
              path: /opt/aerospike
              volumeMode: filesystem
              sizeInGB: 1
            - path: /opt/aerospike/data
              storageClass: ssd
              volumeMode: filesystem
              sizeInGB: 3
      - id: 2
        zone: us-central1-a
        aerospikeConfig:
          service:
            proto-fd-max: 16000
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
        replication-factor: 1
        storage-engine:
          type: device
          files:
            - /opt/aerospike/data/test.dat
          filesize: 2000000000
          data-in-memory: true
      - name: testMem
        memory-size: 3000000000
        replication-factor: 1
        storage-engine:
          type: memory
```

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```

For the full CR file, see the [example rack-enabled cluster CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/rack_enabled_cluster_cr.yaml).

This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

## Cluster Node Distribution

Cluster nodes are distributed across racks as evenly as possible. The cluster size is divided by the number of racks to determine how many nodes per rack. Any remainder nodes are distributed one-by-one across racks starting from the first rack.

For example, in a setup with 10 nodes spread across 4 racks, the topology is:

* Rack 1: 3 nodes
* Rack 2: 3 nodes
* Rack 3: 2 nodes
* Rack 4: 2 nodes

## Add a New Rack

To add a new rack, add a new section to the CR file under the `rackConfig.racks` section. Use kubectl to apply this update.

```yaml
  rackConfig:
    namespaces:
      - test
    racks:
      .
      .
      .
      - id: 3
        zone: us-central1-c
```

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```

The Aerospike Kubernetes Operator redistributes cluster nodes across racks whenever the cluster size or the number of racks changes. If you add a rack without increasing the cluster size, the nodes will be redistributed. The number of nodes on existing racks will be scaled down, and the number of nodes on the new rack will be scaled up, per the usual topology rules.

## Set Rack-Level Storage and aerospikeConfig

Aerospike's Rack Awareness lets you set local storage and aerospikeConfig options. If you provide local storage for a rack, the rack will use this storage. Otherwise, common global storage will be used.

In the following example, the aerospikeConfig is a patch which will be used for the rack and merged with the common global aerospikeConfig.

```yaml
  rackConfig:
    namespaces:
      - test
    racks:
      - id: 1
        zone: us-central1-b

        aerospikeConfig:
          service:
            proto-fd-max: 18000

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
```

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```

## Merge AerospikeConfig

A rack's local aerospikeConfig patch will be merged with the common global base aerospikeConfig based on the following rules:

* New elements from the patch configMap will be added to the base configMap.
* A base element will be replaced with a new patch element if:
    * The element value type is changed.
    * The element value is a primitive type and updated.
    * The element value is a primitive list type and updated.
    * The element key is `storage-engine` and the storage-engine type has been changed (storage-engine can be of `device`, `file`, or `memory` type).
* If the element is of map type, patch and base elements will be recursively merged.
* If the elements are list of maps, new list elements in the patch list will be appended to the base list and corresponding entries will be merged using the same merge algorithm.
    * The order of elements in the base list will be maintained.
    * Corresponding entries are found by matching the special `name` key in maps.
    * This list of maps is actually a map of maps.
    * Main map keys are added in sub-map with key as `name` to convert a map of maps to a list of maps.

As an example, here is the original rack-local aerospikeConfig and common global aerospikeConfig:

```yaml
  rackConfig:
    racks:
        aerospikeConfig:
          service:
            proto-fd-max: 18000
          namespaces:
            - name: test
              storage-engine:
                type: device
                devices:
                  - /dev/nvme0n2 /dev/sdf2
            - name: bar
              memory-size: 6000000000
              storage-engine:
                type: memory
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
      - name: bar
        memory-size: 3000000000
        replication-factor: 2
        storage-engine:
          type: device
          devices:
            - /dev/nvme0n10 /dev/sdf10
```

After merging the rack-local aerospikeConfig with the common global aerospikeConfig:

```yaml
  aerospikeConfig:
    service:
      proto-fd-max: 18000
      feature-key-file: /etc/aerospike/secret/features.conf
    security:
      enable-security: true
    namespaces:
      - name: test
        memory-size: 3000000000
        replication-factor: 2
        # storage-engine type is not changed hence its merged recursively
        storage-engine:
          type: device
          devices:
            - /dev/nvme0n2 /dev/sdf2
      - name: bar
        memory-size: 6000000000
        replication-factor: 2
        # storage-engine type is changed hence its replaced
        storage-engine:
          type: memory
```

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```

## Remove a Rack

To remove a rack, delete that rack's section from the `rackConfig.racks` section, then use kubectl to apply the new configuration.

The Aerospike Kubernetes Operator will scale down the desired rack to size 0 by removing one node at a time from the rack. After all the nodes have been removed, the rack will also be removed. If you are removing a rack without decreasing cluster size, other racks will be scaled up based on new node redistribution.

## Simultaneously Add and Remove Racks

If the Operator has to scale up some racks and scale down other racks in single call, the Operator always scales up first and scales down second. As a result, for a short time during the procedure, the actual cluster size may be larger than the desired cluster size.
