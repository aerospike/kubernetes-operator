---
title: XDR
description: XDR
---

To deploy a cluster as a cross-datacenter replication (XDR) source, configure `dc-security-config-file` and `dc-node-address-port`  in the `aerospikeConfig.xdr.datacenter` section of the CR file. After updating these configurations in the CR file, apply the CR file to deploy the cluster.

For more information, see [the documentation on cross-datacenter replication (XDR)](https://docs.aerospike.com/docs/architecture/xdr.html).  

## Enable XDR and Create a Remote DC

This example is the XDR-specific config section for the Aerospike cluster CR file.

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
    - name: xdr
      aerospike:
        path: /opt/aerospike/xdr
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
    logging:
      - name: /var/log/aerospike/aerospike.log
        any: info

    service:
      feature-key-file: /etc/aerospike/secret/features.conf

    security: {}

    network:
      service:
        port: 3000
      fabric:
        port: 3001
      heartbeat:
        port: 3002

    xdr:
      dcs:
        - name: dc1
          node-address-ports:
            - aeroclusterdst-0-0 3000

          auth-user: admin
          auth-password-file: /etc/aerospike/secret/password_DC1.txt
          namespaces:
            - name: test

    namespaces:
      - name: test
        memory-size: 3000000000
        replication-factor: 2
        storage-engine:
          type: device
          files:
            - /opt/aerospike/data/test.dat
          filesize: 2000000000
          data-in-memory: true

```

For the full CR file, see the [example XDR CR](https://github.com/aerospike/aerospike-kubernetes-operator/blob/2.0.0/config/samples/xdr_src_cluster_cr.yaml).

This and other example CRs are stored in [the main Aerospike Kubernetes Operator repository](https://github.com/aerospike/aerospike-kubernetes-operator/tree/master/config/samples).


## Remote DC Credentials

If the destination cluster has security enabled then `aerospike-secret` created in this section should also have a `security_credentials_DC1.txt` file for the destination DC.

```sh
$ cat security_credentials_DC1.txt
credentials
{
   username xdr_user
   password xdr_pass
}
```
