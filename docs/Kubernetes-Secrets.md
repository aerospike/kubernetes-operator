---
title: Kubernetes Secrets
description: Kubernetes Secrets
---

Kubernetes Secrets let you store sensitive data with less risk of exposing this information. You can create secrets to set up Aerospike authentication, TLS, and features.conf. See [Manage-TLS-Certificates](Manage-TLS-Certificates.md) for more details.

## Create a Secret for a Folder

To create a Kubernetes Secret for connectivity to the Aerospike cluster, use the following command to package the Aerospike `features.conf` in a folder and convert it to a Secret:

```shell
kubectl  -n aerospike create secret generic aerospike-secret --from-file=config/samples/secrets
```

To deploy the change, update the name of the Secret in the aerospikeConfigSecret spec of the cluster's CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```

## Create a Secret for a Password

Use kubectl to create a Secret which contains the password for Aerospike cluster admin user.

```shell
kubectl  -n aerospike create secret generic auth-secret --from-literal=password='admin123'
```

To deploy with the Operator, you must include the names of the Secrets for each user in the cluster's CR file.

For example, suppose that you want to give two people access to the Aerospike cluster. For the admin user, you create a secret named `admin-secret`. For the user, you create a secret named `user-secret`. To enable security for the cluster:

```yaml
spec:
  .
  .
  .
  aerospikeAccessControl:
    users:
      - name: admin
        secretName: admin-secret
        roles:
          - sys-admin
          - user-admin
      - name: user
        secret-name: user-secret
        roles:
          - data-admin
  .
  .
```

Save and exit the CR file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```
