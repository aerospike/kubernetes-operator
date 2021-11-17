---
title: Delete Aerospike Cluster
description: Delete Aerospike Cluster
---

You can delete a cluster either by using the cluster's CR file, or by deleting the cluster directly as you usually would.

If you use a service like GKE or AKS, you can delete the cluster through your provider's control plane. If you are using a local solution like Minikube, you can delete the cluster with `minikube delete` or `kubectl delete`.

:::note
Be cautious when deleting clusters. Deleting a cluster will cause a complete shutdown which may not be recoverable. In particular, make sure the cluster doesn't have any stored data that will be lost.
:::

Use `kubectl delete` to delete the cluster using its CR file. Specify the path to the cluster's CR file. For example:

```shell
kubectl delete -f aerospike-cluster.yaml
```
