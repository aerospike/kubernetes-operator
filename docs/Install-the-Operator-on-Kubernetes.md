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

 
## Install the Operator

There are two methods installing the Aerospike Kubernetes Operator itself. The primary, and recommended method, is to use the Operator Lifecycle Manager (OLM). The second method is to use Helm charts themselves to install the operator (which will then in turn manage the Aerospike clusters).

If you are unsure which method to use, we recommend using the OLM
### Method 1: Install the Operator Lifecycle Manager (OLM)

We recommend using [Operator Lifecycle Manager (OLM)](https://olm.operatorframework.io/]) to run and manage the Aerospike Kubernetes Operator in production environments. OLM is the preferred way to manage Kubernetes operators in production.

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
