---
title: Data In Memory
description: Data In Memory
---

A data in memory (DIM) configuration is useful in many situations. This is also an easy way to test an Aerospike cluster without having to configure separate storage. For more information on data-in-memory and other storage configurations, [see the Aerospike documentation for namespace storage configuration](https://docs.aerospike.com/docs/operations/configure/namespace/storage/index.html).

To set this up, add the following storage-specific configuration to the Aerospike cluster's CR file.

```yaml
  aerospikeConfig:
    namespaces:
      - name: test
        memory-size: 3000000000
        replication-factor: 2
        storage-engine:
          type: memory
```

We have several examples of DIM cluster CR files in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```
