---
title: Manage TLS Certificates
description: Manage TLS Certificates
---

To set up a TLS-enabled Aerospike cluster, first use kubectl to create a Kubernetes Secret which contains the TLS certificates and key. For example, the command create a Secret from the contents of the `config/samples/secrets` folder is:

```shell
kubectl create secret generic aerospike-secret --from-file=config/samples/secrets -n aerospike
```

See the Aerospike documentation for [more details on Aerospike TLS configuration](https://docs.aerospike.com/docs/operations/configure/network/tls/index.html).

Next, add the TLS-specific configuration to the Aerospike cluster's CR file.

```yaml
  storage:
    filesystemVolumePolicy:
      cascadeDelete: true
      initMethod: deleteFiles
    volumes:
      - name: workdir
        aerospike:
          path: /opt/aerospike
        source:
          persistentVolume:
            storageClass: ssd
            volumeMode: Filesystem
            size: 1Gi
      - name: ns
        aerospike:
          path: /opt/aerospike/data
        source:
          persistentVolume:
            storageClass: ssd
            volumeMode: Filesystem
            size: 3Gi
      - name: aerospike-config-secret
        source:
          secret:
            secretName: aerospike-secret
        aerospike:
          path: /etc/aerospike/secret

  aerospikeConfig:
    service:
      feature-key-file: /etc/aerospike/secret/features.conf
    security:
      enable-security: true
    network:
      service:
        tls-name: aerospike-a-0.test-runner
        tls-authenticate-client: any
        tls-port: 4333
      heartbeat:
        tls-name: aerospike-a-0.test-runner
        tls-port: 3012
      fabric:
        tls-name: aerospike-a-0.test-runner
        tls-port: 3011
      tls:
        - name: aerospike-a-0.test-runner
          cert-file: /etc/aerospike/secret/svc_cluster_chain.pem
          key-file: /etc/aerospike/secret/svc_key.pem
          ca-file: /etc/aerospike/secret/cacert.pem

```

For the full CR file, see the [example TLS cluster CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/master/config/samples/tls_cluster_cr.yaml).

This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).

Save and exit the file, then use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```
