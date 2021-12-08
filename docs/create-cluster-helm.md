---
title: Create Aerospike Cluster Using Helm
description: How to create an Aerospike cluster using Helm
id: create-cluster-helm
---

Follow these instructions to use the Operator to deploy the Aerospike cluster using Helm.

## Requirements

Before deploying your Aerospike cluster using Helm, you must [use Helm to install the Aerospike Kubernetes Operator](install-operator-helm.md) on your cluster.

## Configure Persistent Storage

The Aerospike Operator works with dynamically-provisioned storage classes. Aerospike Server pods may have different storage volumes associated with each service.

Persistent storage on the pods uses these storage class provisioners.

Apply a sample storage class based on your Kubernetes environment:

* EKS: `kubectl apply -f eks_ssd_storage_class.yaml`
* GCE: `kubectl apply -f gce_ssd_storage_class.yaml`
* Microk8s: `kubectl apply -f microk8s_filesystem_storage_class.yaml`

See [Storage Provisioning](Storage-provisioning.md) for more details on configuring persistent storage.

## Create Secrets

Next, create Secrets to set up features like the license file (`features.conf`), Aerospike authentication, TLS, and the cluster admin password. See the [Manage TLS Certificates](Manage-TLS-Certificates.md) section for more details.

The [example secrets directory](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples/secrets) includes a collection of example TLS certificates, security credentials, and more. Download these files into a local folder called `secrets`, then apply them as a Kubernetes Secret:

```shell
kubectl  -n aerospike create secret generic aerospike-secret --from-file=secrets
```

Create a Secret containing the password for the Aerospike cluster admin:

```shell
kubectl  -n aerospike create secret generic auth-secret --from-literal=password='admin123'
```


## Get the Helm Charts

To get the Helm charts, clone the `aerospike/aerospike-kubernetes-operator` repository.

```sh
git clone https://github.com/aerospike/aerospike-kubernetes-operator.git
```

The charts are in the `aerospike-kubernetes-operator/helm-charts` folder.

```sh
cd aerospike-kubernetes-operator/helm-charts
```


## Deploy the Cluster

Create a Secret containing the Aerospike feature key file `features.conf`.

```sh
kubectl create secret generic aerospike-license --from-file=[path to your features.conf file]
```

Install the chart.

```sh
helm install aerospike ./aerospike-cluster \
    --set devMode=true
```

:::tip
This command assumes few defaults, and deploys an Aerospike cluster in "dev" mode with no data persistence. We recommend you create a custom YAML file with your required configurations, and apply it with `helm install`.
:::

```sh
helm install aerospike ./aerospike-cluster/ \
    -f [custom YAML file]
```

## Configurations

For more details on these configurations, see the [AerospikeCluster Customer Resource Spec](https://aerospike.github.io/kubernetes-operator/next/Cluster-configuration-settings/#spec).

| Name       | Description | Default   |
| ---------- | ----------- | --------- |
| `replicas` | Aerospike cluster size. | `3` |
| `image.repository` | Aerospike Server container image repository. | `aerospike/aerospike-server-enterprise` |
| `image.tag` | Aerospike Server container image tag. | `5.5.0.9` |
| `imagePullSecrets` | Secrets containing credentials to pull Aerospike container image from a private registry. | `{}` (nil) |
| `aerospikeAccessControl` | Aerospike access control configuration. Define users and roles to be created on the cluster. | `{}` (nil) |
| `aerospikeConfig` | Aerospike configuration. | `{}` (nil) |
| `aerospikeNetworkPolicy` | Network policy (client access configuration). | `{}` (nil) |
| `commonName` | Base string for naming pods, services, stateful sets, etc.  | Release name truncated to 63 characters (without hyphens) |
| `podSpec` | Aerospike pod spec configuration. | `{}` (nil) |
| `rackConfig` | Aerospike rack configuration. | `{}` (nil) |
| `storage` | Aerospike pod storage configuration. | `{}` (nil) |
| `validationPolicy` | Validation policy. | `{}` (nil) |
| `operatorClientCert` | Client certificates to connect to Aerospike. | `{}` (nil) |
| `seedsFinderServices` | Service (e.g. loadbalancer) for Aerospike cluster discovery. | `{}` (nil) |
| `devMode` | Deploy Aerospike cluster in dev mode. | `false` |

## Default Values in "dev" Mode

These values are set as defaults when the cluster is deployed in "dev" mode (`devMode=true`).

```yaml
aerospikeConfig:
  service:
    feature-key-file: /etc/aerospike/secrets/features.conf

  security:
    enable-security: false

  network:
    service:
      port: 3000
    fabric:
      port: 3001
    heartbeat:
      port: 3002

  namespaces:
    - name: test
      memory-size: 1073741824 # 1GiB
      replication-factor: 2
      storage-engine:
        type: memory

podSpec:
  multiPodPerHost: true

storage:
  volumes:
  - name: aerospike-config-secret
    source:
      secret:
        secretName: aerospike-license
    aerospike:
      path: /etc/aerospike/secrets

validationPolicy:
  skipWorkDirValidate: true
  skipXdrDlogFileValidate: true
```
