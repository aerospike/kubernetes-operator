---
title: Storage Provisioning
description: Storage Provisioning
---

In order to use persistent storage external to the pods, you need to set up storage classes. Storage classes are used to dynamically provision the persistent storage required by users in the Aerospike CR configuration.

The specific storage configuration depends on the environment in which you deploy your Kubernetes cluster. Each cloud provider has their own way to set up storage provisioners which dynamically create and attach storage devices to the containers.

To deploy an Aerospike cluster with persistent storage, create a **storage-class.yaml** file. Add the storage class configurations to this file, then use kubectl to apply these changes to the cluster.


## Google Cloud

The following **storage-class.yaml** file uses the GCE provisioner to create a storage class called **ssd**.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ssd
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
```

## Local volume

This example uses a local SSD (identified as `/dev/nvme0n1`). Attach this SSD to each Kubernetes worker node which will be used for getting the primary storage device for the Aerospike cluster deployment.

### Create a Discovery Directory

Before deploying local volume provisioner, create a discovery directory on each worker node and link the block devices to be used in the discovery directory. The provisioner will discover local block volumes from this directory.

```shell
$ lsblk
NAME    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
nvme0n1       8:16   0  375G  0 disk
nvme0n2       8:32   0  375G  0 disk
```

```shell
mkdir /mnt/disks
sudo ln -s /dev/nvme0n1 /mnt/disks/
sudo ln -s /dev/nvme0n2 /mnt/disks/
```

:::note
You can use also your own discovery directory, but make sure that the provisioner is also configured to point to the same directory.
:::

### Deploy the Local Volume Provisioner

To automate the local volume provisioning, we will create and run a provisioner based on [kubernetes-sigs/sig-storage-local-static-provisioner](https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner).

The provisioner will run as a DaemonSet which will manage the local SSDs on each node based on a discovery directory, create/delete the PersistentVolumes, and clean up the storage when it is released.

The local volume static provisioner for this example is defined in [aerospike_local_volume_provisioner.yaml](https://github.com/aerospike/aerospike-kubernetes-operator/tree/2.0.0-rc1/config/samples/storage/aerospike_local_volume_provisioner.yaml).

The storage class is defined in [local_storage_class.yaml](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/storage/local_storage_class.yaml). This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

Create local storage class, then deploy the provisioner.

```shell
kubectl create -f local_storage_class.yaml

kubectl create -f aerospike_local_volume_provisioner.yaml
```

Verify the persistent volumes have been created.

```shell
$ kubectl get pv

NAME                CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS     REASON   AGE
local-pv-342b45ed   375Gi      RWO            Delete           Available           "local-ssd"            3s
local-pv-3587dbec   375Gi      RWO            Delete           Available           "local-ssd"            3s
```

:::note
The `storageclass` configured here is `"local-ssd"`. We will provide this in the Aerospike cluster CR config. This storageclass will be used to talk to the provisioner and request PV resources for the cluster.
:::
