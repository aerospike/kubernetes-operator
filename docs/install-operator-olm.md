---
title: Install the Operator Using OLM
description: How to install the Aerospike Kubernetes Operator using Operator Lifecycle Management (OLM)
id: install-operator-olm
---

To begin, create a new Kubernetes cluster on the platform of your choice, and configure kubectl to use that cluster. See the [Requirements page](System-Requirements.md) for Kubernetes version and other requirements.

:::tip
In some situations it may be desired to install Aerospike clusters via Helm rather than through the operator. In these cases one must [use Helm to install the Operator](install-operator-helm.md), rather than OLM.
:::

## Operator Overview

The Aerospike Kubernetes Operator makes it easier for you to use Aerospike Enterprise clusters on Kubernetes. Instead of making changes to the cluster manually, you specify changes in the Aerospike cluster CR file and use `kubectl apply` to apply the changes. The Operator then executes the changes.

For example, to add Rack Awareness to your Aerospike cluster, add a rack-aware section to the CR as described in [Rack Awareness](Rack-Awareness.md). Use `kubectl apply -f` to apply the CR, and the Operator deploys Rack Awareness as specified.

This documentation includes examples of various Aerospike configuration settings and possibilities you can use with your Aerospike cluster on Kubernetes. If you have questions, suggestions, or other feedback, please let us know.

## Install the Operator Lifecycle Manager (OLM)

We recommend using [Operator Lifecycle Manager (OLM)](https://olm.operatorframework.io/]) to run and manage the Aerospike Kubernetes Operator in production environments. 

:::info
If you are deploying on OpenShift/OKD, you can skip this step. OLM is pre-installed on OpenShift.
:::

Install OLM on your Kubernetes cluster with the command:

```shell
operator-sdk olm install
```
## Use OLM to Install the Aerospike Kubernetes Operator

Create the `aerospike` namespace:

```shell
kubectl create namespace aerospike
```

Next, choose the scope of your Operator installation.

You will always install the Operator on a single namespace. However, the Operator can deploy and manage Aerospike clusters in multiple namespaces using the `MultiNamespace` or `AllNamespaces` install modes.

* A single namespace (default)
* Multiple namespaces (`--install-mode MultiNamespace`)
* All available namespaces (`--install-mode AllNamespaces`)

### Manage a Single Namespace (Default)

To install the Operator on the `aerospike` namespace, and only use it to manage the `aerospike` namespace, run the Operator bundle with the command:

```shell
operator-sdk run bundle docker.io/aerospike/aerospike-kubernetes-operator-bundle:2.0.0 --namespace=aerospike
```

### Manage Multiple Specific Namespaces

Use `--install-mode MultiNamespace=[namespace 1],[namespace 1],[etc]` to manage Aerospike clusters on multiple specific namespaces. Specify the namespaces in a comma-separated list (no spaces).

For example, to install the Operator on the `aerospike` namespace and use it to manage Aerospike clusters on the `ns1` and `ns2` namespaces, the command is:

```shell
operator-sdk run bundle docker.io/aerospike/aerospike-kubernetes-operator-bundle:2.0.0 --namespace=aerospike --install-mode MultiNamespace=ns1,ns2
```

### Manage All Namespaces

Use `--install-mode AllNamespaces` to manage Aerospike clusters on all available namespaces:

```shell
operator-sdk run bundle docker.io/aerospike/aerospike-kubernetes-operator-bundle:2.0.0 --namespace=aerospike --install-mode AllNamespaces
```

## RBAC

For information on working with RBAC on multiple clusters, see [RBAC for other namespace](Multiple-Aerospike-clusters.md).

## Verify the Operator is Running

Use `kubectl get csv -n aerospike` to verify the Operator's CSV is in the `Succeeded` phase.

```shell
$ kubectl get csv -n aerospike

NAME                                       DISPLAY                         VERSION     REPLACES   PHASE
aerospike-kubernetes-operator.v2.0.0   Aerospike Kubernetes operator   2.0.0              Succeeded

```

Next, use `kubectl get pod -n aerospike` to verify the Operator's pod is running.

```shell
$ kubectl get pod -n aerospike

NAME                                                              READY   STATUS      RESTARTS   AGE
5af02cb7676a864fa68cc875fb1bc64df2f1223ab355b4911792e9--1-vlltn   0/1     Completed   0          63s
aerospike-operator-controller-manager-55d45754bf-smzxc            2/2     Running     0          48s
ker-io-aerospike-aerospike-kubernetes-operator-bundle-2-0-0       1/1     Running     0          73s

```

## Check Operator Logs

If you need to view the Operator logs for any reason, use `kubectl -n aerospike logs -f [manager pod name] -c manager` to show the logs on your manager pod. To find the manager pod name, use `kubectl get pod -n aerospike` as shown above.

For example, the name of the manager pod in the previous example is `aerospike-operator-controller-manager-55d45754bf-smzxc`:

```shell

$ kubectl -n aerospike logs -f aerospike-operator-controller-manager-55d45754bf-smzxc -c manager

2021-10-15T19:09:58.058Z	INFO	controller-runtime.metrics	metrics server is starting to listen	{"addr": "127.0.0.1:8080"}
2021-10-15T19:09:58.062Z	INFO	setup	Init aerospike-server config schemas

2021-10-15T19:09:58.071Z	DEBUG	schema-map	Config schema added	{"version": "4.7.0"}
2021-10-15T19:09:58.072Z	INFO	aerospikecluster-resource	Registering mutating webhook to the webhook server
2021-10-15T19:09:58.073Z	INFO	controller-runtime.webhook	registering webhook	{"path": "/mutate-asdb-aerospike-com-v1beta1-aerospikecluster"}
2021-10-15T19:09:58.073Z	INFO	controller-runtime.builder	skip registering a mutating webhook, admission.Defaulter interface is not implemented	{"GVK": "asdb.aerospike.com/v1beta1, Kind=AerospikeCluster"}
2021-10-15T19:09:58.073Z	INFO	controller-runtime.builder	Registering a validating webhook	{"GVK": "asdb.aerospike.com/v1beta1, Kind=AerospikeCluster", "path": "/validate-asdb-aerospike-com-v1beta1-aerospikecluster"}
2021-10-15T19:09:58.073Z	INFO	controller-runtime.webhook	registering webhook	{"path": "/validate-asdb-aerospike-com-v1beta1-aerospikecluster"}
2021-10-15T19:09:58.074Z	INFO	setup	Starting manager
I1015 19:09:58.074722       1 leaderelection.go:243] attempting to acquire leader lease aerospike/96242fdf.aerospike.com...


```
