---
title: Install the Operator
description: How to install the Aerospike Kubernetes Operator 
id: install-operator
---

To begin, create a new Kubernetes cluster on the platform of your choice, and configure kubectl to use that cluster. See the [Requirements page](System-Requirements.md) for Kubernetes version and other requirements.


## Operator Overview

The Aerospike Kubernetes Operator makes it easier for you to use Aerospike Enterprise clusters on Kubernetes. Instead of making changes to the cluster by hand, you specify changes in the Aerospike cluster CR file and use `kubectl apply` to apply these changes. The Operator picks up on the changes and does what it needs to do in order to make them happen.

For example, to add Rack Awareness to your Aerospike cluster, add a rack-aware section to the CR as described in [Rack Awareness](Rack-Awareness.md). Use `kubectl apply -f` to apply the CR, and the Operator deploys Rack Awareness as specified.

This documentation includes examples of various Aerospike configuration settings and possibilities you can use with your Aerospike cluster on Kubernetes. If you have questions, suggestions, or other feedback, please let us know.

<<<<<<< HEAD
 
## Install the Operator

There are two methods installing the Aerospike Kubernetes Operator itself. The primary, and recommended method, is to use the Operator Lifecycle Manager (OLM). The second method is to use Helm charts themselves to install the operator (which will then in turn manage the Aerospike clusters).
=======
## Install the Operator Lifecycle Manager (OLM)

We recommend using [Operator Lifecycle Manager (OLM)](https://olm.operatorframework.io/]) to run and manage the Aerospike Kubernetes Operator in production environments. OLM is the preferred way to manage Kubernetes operators in production.

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
>>>>>>> 652ffdd (2.0.0 release documentation updates (#154))

If you are unsure which method to use, we recommend using the OLM
### Method 1: Install the Operator Lifecycle Manager (OLM)

<<<<<<< HEAD
We recommend using [Operator Lifecycle Manager (OLM)](https://olm.operatorframework.io/]) to run and manage the Aerospike Kubernetes Operator in production environments. OLM is the preferred way to manage Kubernetes operators in production.
=======
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
>>>>>>> 652ffdd (2.0.0 release documentation updates (#154))

:::tip
If you plan to use Helm charts to deploy Aerospike clusters, you will also need to [use Helm to install the Operator](install-operator-helm.md), instead.
:::

Follow the steps [here to install the Aerospike Kubernetes Operator using OLM](install-operator-olm)

### Method 2: Install the Operator using Helm Charts

In some cases, particularly if you are planning on using helm charts to deploy Aerospike clusters directly (rather than relying on the operator), you may need to use the helm chart to also install the operator. 

:::tip
There are some mandatory, manual, steps if installing this way. Please ensure you need this behavior and follow the instructions closely.
:::

Follow the steps [here to install the Aerospike Kubernetes Operator using Helm charts.](install-operator-helm)
