---
title: Install the Operator Using Helm
description: How to install the Aerospike Kubernetes Operator using Helm
id: install-operator-helm
---


A Helm chart for installing the Aerospike Kubernetes Operator. To begin, create a new Kubernetes cluster on the platform of your choice, and configure kubectl to use that cluster. See the [Requirements page](System-Requirements.md) for Kubernetes version and other requirements.

:::tip
If you plan to use Helm charts to deploy Aerospike clusters, you also need to use Helm to install the Operator, as described here.
:::

## Operator Overview

The Aerospike Kubernetes Operator makes it easier for you to use Aerospike Enterprise clusters on Kubernetes. Instead of making changes to the cluster by hand, you specify changes in the Aerospike cluster CR file and use `kubectl apply` to apply these changes. The Operator picks up the changes and does what it needs to do to make them happen.

For example, to add Rack Awareness to your Aerospike cluster, add a rack-aware section to the CR as described in [Rack Awareness](Rack-Awareness.md). Use `kubectl apply -f` to apply the CR, and the Operator deploys Rack Awareness as specified.

## Requirements

Before installing the Operator, you must install cert-manager. The Operator uses admission webhooks, which needs TLS certificates. These are issued by [cert-manager](https://cert-manager.io/docs/).

Follow the [official cert-manager instructions](https://cert-manager.io/docs/installation/kubernetes/) to install cert-manager on your Kubernetes cluster before you install the Operator.

## Get the Helm Charts

To get the Helm charts, clone the `aerospike/aerospike-kubernetes-operator` repository.

```sh
git clone https://github.com/aerospike/aerospike-kubernetes-operator.git
git checkout 2.0.0
```

The charts are in the `aerospike-kubernetes-operator/helm-charts` folder.

```sh
cd aerospike-kubernetes-operator/helm-charts
```

## Deploy the Aerospike Kubernetes Operator

From the `aerospike-kubernetes-operator/helm-charts` folder, use this command to deploy the Operator.

```sh
helm install aerospike-kubernetes-operator ./aerospike-kubernetes-operator --set replicas=3
```

## Configurations

| Name       | Description | Default   |
| ---------- | ----------- | --------- |
| `replicas` | Number of operator replicas. | `2` |
| `operatorImage.repository` | Operator image repository. | `aerospike/aerospike-kubernetes-operator` |
| `operatorImage.tag` | Operator image tag. | `2.0.0` |
| `operatorImage.pullPolicy` | Image pull policy. | `IfNotPresent` |
| `imagePullSecrets` | Secrets containing credentials to pull Operator image from a private registry. | `{}` (nil) |
| `rbac.create` | Set this to `true` to let the Helm chart automatically create RBAC resources necessary for operator. | `true` |
| `rbac.serviceAccountName` | If `rbac.create=false`, provide a service account name to be used with the operator deployment. | `default` |
| `healthPort` | Health port. | `8081` |
| `metricsPort` | Metrics port. | `8080` |
| `webhookServicePort` | Webhook service port. | `9443` |
| `kubeRBACProxyPort` | Kube RBAC proxy listening port. | `8443` |
| `certs.create` | Set this to `true` to let the Helm chart automatically create certificates using `cert-manager`. | `true` |
| `certs.webhookServerCertSecretName` | Kubernetes Secret name which contains webhook server certificates. | `webhook-server-cert`|
| `watchNamespaces` | Namespaces to watch. Operator will watch for `AerospikeCluster` custom resources in these namespaces. Every watchedNamespace must already exist. For every watched namespace, the Operator creates A ServiceAccount, ClusterRole and ClusterRoleBinding in that namespace. | `default` |
| `resources` | Resource requests and limits for the operator pods. | `{}` (nil) |
| `affinity` | Affinity rules for the Operator deployment. | `{}` (nil) |
| `extraEnv` | Extra environment variables which will be passed into the operator pods. | `{}` (nil) |
| `nodeSelector` | Node selectors for scheduling the Operator pods based on node labels. | `{}` (nil) |
| `tolerations` | Tolerations for scheduling the Operator pods based on node taints. | `{}` (nil) |
| `annotations` | Annotations for the Operator deployment. | `{}` (nil) |
| `labels` | Labels for the Operator deployment. | `{}` (nil) |
| `podAnnotations` | Annotations for the Operator pods. | `{}` (nil) |
| `podLabels` | Labels for the Operator pods. | `{}` (nil) |
| `metricsService.labels` | Labels for the Operator's metrics service. | `{}` (nil) |
| `metricsService.annotations` | Annotations for the Operator's metrics service. | `{}` (nil) |
| `metricsService.port` | Operator's metrics service port. | `8443` |
| `metricsService.type` | Operator's metrics service type. | `ClusterIP` |
| `webhookService.labels` | Labels for the Operator's webhook service. | `{}` (nil) |
| `webhookService.annotations` | Annotations for the Operator's webhook service. | `{}` (nil) |
| `webhookService.port` | Operator's webhook service port. | `443` |
| `webhookService.type` | Operator's webhook service type. | `ClusterIP` |
| `podSecurityContext` | Security context for the Operator pods. | `{}` (nil) |
| `securityContext` | Security context for the Operator container. | `{}` (nil) |
| `livenessProbe` | Liveness probe for Operator container. | `initialDelaySeconds: 15`, `periodSeconds: 20`, `timeoutSeconds: 1`, `successThreshold: 1`, `failureThreshold: 3` |
| `readinessProbe` | Readiness probe for the Operator container. | `initialDelaySeconds: 5`, `periodSeconds: 10`, `timeoutSeconds: 1`, `successThreshold: 1`, `failureThreshold: 3` |
| `kubeRBACProxy.image.repository` | Kube RBAC Proxy image repository container. | `gcr.io/kubebuilder/kube-rbac-proxy` |
| `kubeRBACProxy.image.tag` | Kube RBAC Proxy image tag. | `v0.5.0` |
| `kubeRBACProxy.image.pullPolicy` | Kube RBAC Proxy image pull policy. | `IfNotPresent` |
