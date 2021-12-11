---
title: Create an Aerospike Cluster
description: How to create an Aerospike cluster using kubectl
id: create-cluster-kubectl
---

To use the Operator to deploy an Aerospike cluster, create an Aerospike custom resource (CR) file which describes the cluster (including its number of nodes, the Aerospike configuration, system resources, etc.). Then use `kubectl` to apply that configuration file to your Kubernetes cluster(s).

## Requirements

Before deploying your Aerospike cluster, you must install the Aerospike Kubernetes Operator on your Kubernetes cluster(s) using either:

* [OLM](Install-the-Operator-on-Kubernetes.md)
* [Helm](install-operator-helm.md)

## Prepare the Aerospike Cluster Configuration

The Aerospike Kubernetes Operator GitHub repo contains example YAML configuration files for the cluster deployment. These files are located in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

The use case for your cluster will help you determine which configuration parameters you need to set in the custom resource (CR) file.

## Configure Persistent Storage

The Aerospike Operator is designed to work with dynamically-provisioned storage classes. Aerospike Server pods may have different storage volumes associated with each service.

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

## Create Aerospike Cluster Custom Resource (CR)

Refer to the [cluster configuration settings](Cluster-configuration-settings.md) for details on the Aerospike cluster custom resource (CR) file. Sample Aerospike cluster CR files for different configurations can be found in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

You can edit the CR file at any time to make changes and manage the Aerospike cluster.


## Deploy the Aerospike Cluster

Use the custom resource YAML file you created to deploy an Aerospike cluster. If you don't have a custom resource file, you can choose one of the sample files in the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

For example, to use the [dim_nostorage_cluster_cr.yaml](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/dim_nostorage_cluster_cr.yaml) file, download it and apply it to your cluster with:

```shell
kubectl apply -f dim_nostorage_cluster_cr.yaml
```

## Verify Cluster Status

Use `kubectl get statefulset` to ensure the aerospike-kubernetes-operator creates the StatefulSets for the custom resource.

```shell
$ kubectl get statefulset -n aerospike
NAME      READY   AGE
aerocluster-0   2/2     24s
```

Use `kubectl get pods` to check the pods to confirm the status. This step may take time as the pods provision resources, initialize, and are ready. Please wait for the pods to switch to the Running state before you continue.

```shell
$ kubectl get pods -n aerospike
NAME          READY   STATUS      RESTARTS   AGE
aerocluster-0-0     1/1     Running     0          48s
aerocluster-0-1     1/1     Running     0          48s
```

If the Aerospike cluster pods do not switch to Running status in a few minutes, please refer to the [Troubleshooting Guide](Troubleshooting.md).
