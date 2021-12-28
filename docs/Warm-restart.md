---
title: Warm restart
description: Warm restart Aerospike Server on Aerospike configuration change 
---

Aerospike operator 2.0.0 allows for warm restart of Aerospike pods on changes to the Aerospike server configuration in the [Aerospike Config Section](Cluster-configuration-settings.md#aerospike-config) of your custom resource.
This feature requires Aerospike server container images that use [tini](https://github.com/aerospike/tini) as the `init` process. 

## Aerospike Server 5.7.0.9 and later
Container images for Aerospike enterprise server 5.7.0.9 and later use tini init by default and will warm restart on Aerospike configuration changes.  

## Aerospike Server 5.7.0.8 and prior
For Aerospike enterprise server 5.7.0.8 and prior, container images that use tini have been tagged with the prefix 'tinistaticbackport'.

E.g.

```yaml
aerospike/aerospike-server-enterprise:tinistaticbackport-5.7.0.8
```
