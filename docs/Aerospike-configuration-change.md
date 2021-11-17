---
title: Modify Aerospike cluster
description: Modify Aerospike cluster
---

The Aerospike Kubernetes Operator makes it easier for you to use Aerospike Enterprise clusters on Kubernetes. Instead of making changes to the cluster by hand, you specify changes in the Aerospike cluster CR file, then use `kubectl apply` to apply these changes. The Operator picks up on the changes and does what it needs to do in order to make them happen.

For this example assume that the cluster was deployed using a file named `aerospike-cluster.yaml`.

## Example Configuration Change

Change the `spec.aerospikeConfig.service.proto-fd-max` field in the aerocluster CR to `20000`

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike
spec:
  size: 2
  image: aerospike/aerospike-server-enterprise:4.9.0.33
  aerospikeConfig:
    service:
      proto-fd-max: 15000
  .
  .
```

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```

## Check the Pods

Pods will undergo a rolling restart.

```sh
$ kubectl get pods -n aerospike
NAME          READY   STATUS              RESTARTS   AGE
aerocluster-0-0     1/1     Running         0          3m6s
aerocluster-0-1     1/1     Running         0          3m6s
aerocluster-0-2     1/1     Running         0          30s
aerocluster-0-3     1/1     Terminating     0          30s
```
After all the pods have restarted, use `kubectl describe` to get status of the cluster.

Check `spec.aerospikeConfig.service.proto-fd-max` in status.

```sh
$ kubectl -n aerospike describe aerospikecluster aerocluster
Name:         aerocluster
Namespace:    aerospike
Kind:         AerospikeCluster
.
.
Status:
  Aerospike Config:
    Service:
      Proto - Fd - Max:   20000
  .
  .
```
