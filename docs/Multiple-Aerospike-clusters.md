---
title: Multiple Aerospike Clusters
description: Multiple Aerospike Clusters
---

The Aerospike Kubernetes Operator can deploy multiple Aerospike clusters within a single Kubernetes namespace, or in multiple namespaces.

## Multiple Aerospike Clusters in a Single Namespace

You can deploy multiple clusters in a single namespace using the same process as deploying a single cluster. When you deploy another cluster, use a cluster name which is not already registered in that namespace as described by the cluster object metadata name in the CR YAML file.

## RBAC for Other Namespaces

If you deploy and manage Aerospike clusters in the Operator's namespace, no additional RBAC configuration is necessary.

For clusters in namespaces other than the Operator's namespace, create a service account with the name `aerospike-operator-controller-manager` in that namespace.

For example, the kubectl command to create this service account in the namespace ns1 is:

```shell
kubectl -n ns1 create  serviceaccount aerospike-operator-controller-manager
```

Next, add this service account to the Operator's `ClusterRoleBinding`. To do this, use kubectl to find the cluster role binding:

```shell
kubectl get clusterrolebindings.rbac.authorization.k8s.io  | grep aerospike-kubernetes-operator
aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d                 ClusterRole/aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d   41m
```

In this example, the name of the cluster role binding is `aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d`

Use kubectl to edit the role binding and add a new subject entry for the service account:

```shell
# Replace aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d with the name of the cluster role binding found above
kubectl edit clusterrolebindings.rbac.authorization.k8s.io  aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d
```

This command launches an editor. Append the following lines to the `subjects` section:

```yaml
  # A new entry for ns1.
  # Replace ns1 with your namespace
  - kind: ServiceAccount
    name: aerospike-operator-controller-manager
    namespace: ns1
```

Save and ensure that the changes are applied.

Here is a full example of the operator's ClusterRoleBinding targeting the `aerospike` and `ns1` namespaces.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  creationTimestamp: "2021-09-16T10:48:36Z"
  labels:
    olm.owner: aerospike-kubernetes-operator.v2.0.0-rc1
    olm.owner.kind: ClusterServiceVersion
    olm.owner.namespace: test
    operators.coreos.com/aerospike-kubernetes-operator.test: ""
  name: aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d
  resourceVersion: "51841234"
  uid: be546dd5-b21e-4cc3-8a07-e2fe5fe5274c
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: aerospike-kubernetes-operator.v2.0.0-rc1-74b946466d
subjects:
  - kind: ServiceAccount
    name: aerospike-operator-controller-manager
    namespace: aerospike

  # New entry
  - kind: ServiceAccount
    name: aerospike-operator-controller-manager
    namespace: ns1     
```
