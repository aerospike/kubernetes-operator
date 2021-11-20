---
title: Aerospike Access Control
description: Aerospike Access Control
---

Aerospike Access Control includes user, role, and privilege creation and maintenance.

To manage your access controls from the operator, configure the `aerospikeAccessControl` section in the Aerospike cluster's Custom Resource (CR) file.

Here are a few examples for common access control tasks:

:::note
For these examples, assume that cluster is deployed using a file named `aerospike-cluster.yaml`.
:::

## Create a Role

Add a role in the `roles` list under `aerospikeAccessControl`.

`sys-admin` and `user-admin` are standard predefined roles. Here we are adding a new custom role called "profiler" which is given `read` privileges.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  .
  .
  aerospikeAccessControl:
    roles:
      - name: profiler
        privileges:
          - read
    users:
      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```

## Add Privileges to a Role

Add the `read` and `read-write` privileges to the `profiler` role in the `roles` list under `aerospikeAccessControl`.

```yaml

apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  .
  .
  aerospikeAccessControl:
    roles:
      - name: profiler
        privileges:
          - read
          - read-write
    users:
      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```

## Remove Privileges from a Role

Remove privileges from the desired role in the `roles` list under `aerospikeAccessControl`.

Remove `read-write` `privilege`.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  .
  .
  aerospikeAccessControl:
    roles:
      - name: profiler
        privileges:
          - read
    users:
      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```

## Create a User

Create the secret for the user and add the user in the `users` list under `aerospikeAccessControl`.

Create a secret `profile-user-secret` containing the password for the user `profiler` by passing the password from the command line:

```sh
kubectl  -n aerospike create secret generic profile-user-secret --from-literal=password='userpass'
```

Add `profileUser` user with the `profiler` role.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  .
  .
  aerospikeAccessControl:
    roles:
      - name: profiler
        privileges:
          - read
    users:
      - name: profileUser
        secretName: profile-user-secret
        roles:
          - profiler

      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```

## Add a New Role to a User

Add roles in the desired user's `roles` list.

Add `user-admin` and `sys-admin` to the `profileUser` roles list.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  .
  .
  aerospikeAccessControl:
    roles:
      - name: profiler
        privileges:
          - read
    users:
      - name: profileUser
        secretName: profile-user-secret
        roles:
          - profiler
          - user-admin
          - sys-admin

      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```

## Remove a Role from a User

Remove roles from the desired user's `roles` list.

Remove `sys-admin` from the `profileUser's` roles list.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  .
  .
  aerospikeAccessControl:
    roles:
      - name: profiler
        privileges:
          - read
    users:
      - name: profileUser
        secretName: profile-user-secret
        roles:
          - profiler
          - user-admin

      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```

## Change a User's Password

Create a new secret `new-profile-user-secret` containing the password for Aerospike cluster user `profileUser` by passing the password from the command line:

```sh
kubectl  -n aerospike create secret generic new-profile-user-secret --from-literal=password='newuserpass'
```

Update the `secretName` for `profileUser` to the new secret name `new-profile-user-secret`.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  .
  .
  aerospikeAccessControl:
    roles:
      - name: profiler
        privileges:
          - read
    users:
      - name: profileUser
        secretName: new-profile-user-secret
        roles:
          - profiler
          - user-admin

      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```

## Remove a Role

Remove the desired role from the `roles` list under `aerospikeAccessControl`. Also remove this role from the `roles` list of all the users.

Remove the `profiler` role.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
  .
  .
  aerospikeAccessControl:
    users:
      - name: profileUser
        secretName: new-profile-user-secret
        roles:
          - sys-admin

      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```

## Remove a user

Remove the desired user from the `users` list under `aerospikeAccessControl`.

Remove `profileUser` user.

```yaml
apiVersion: asdb.aerospike.com/v1beta1
kind: AerospikeCluster
metadata:
  name: aerocluster
  namespace: aerospike

spec:
.
.
  aerospikeAccessControl:
    users:
      - name: admin
        secretName: auth-secret
        roles:
          - sys-admin
          - user-admin
```

Save and exit the CR file, then use kubectl to apply the change.

```sh
kubectl apply -f aerospike-cluster.yaml
```
