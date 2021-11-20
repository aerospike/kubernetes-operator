---
title: Monitoring
description: Monitoring
---

The [Aerospike Monitoring Stack](https://docs.aerospike.com/docs/tools/monitorstack/index.html) is a useful way to enable monitoring and alerts for Aerospike clusters deployed by the Aerospike Kubernetes Operator.

## Add Aerospike Prometheus Exporter Sidecar

Add the exporter as a sidecar to each Aerospike server pod using the [PodSpec configuration](Cluster-configuration-settings.md#pod-spec).

```yaml
spec:
 .
 .
 .

  podSpec:
    sidecars:
     - name: aerospike-prometheus-exporter
       image: aerospike/aerospike-prometheus-exporter:1.3.0
       ports:
         - containerPort: 9145
           name: aerospike-prometheus-exporter

 .
 .
 .
```

Create or update your clusters after you add the Prometheus exporter sidecar.

## Prometheus Configuration

Configure Prometheus to add exporter endpoints as scrape targets.

If Prometheus is also running on Kubernetes, you can configure it to extract exporter targets from the Kubernetes API.

In the following example, Prometheus discovers and adds exporter targets in the `default` namespace which has endpoint port name of `aerospike-prometheus-exporter`.

```yaml
scrape_configs:
  - job_name: 'aerospike'

    kubernetes_sd_configs:
    - role: endpoints
      namespaces:
        names:
        - default
    relabel_configs:
    - source_labels: [__meta_kubernetes_endpoint_port_name]
      separator: ;
      regex: aerospike-prometheus-exporter
      replacement: $1
      action: keep
```

See [Aerospike Monitoring Stack documentation] (https://docs.aerospike.com/docs/tools/monitorstack/index.html) for more information on installing and configuring the Aerospike Monitoring Stack.

## Dashboards

To view the metrics, we recommend you import our pre-made Grafana dashboards from the [Aerospike Monitoring GitHub Repo](https://github.com/aerospike/aerospike-monitoring/tree/master/config/grafana/dashboards).

## Example

This example demonstrates how to use the Aerospike Monitoring Stack to monitor Aerospike clusters deployed by the Aerospike Kubernetes Operator.

Deploy the Aerospike Kubernetes Operator using OLM [as described in the Getting Started section](Create-Aerospike-cluster.md).

Create a Kubernetes Secret `aerospike-license` to store the Aerospike license feature key file.

```shell
kubectl create secret generic aerospike-license --from-file=[path to the features.conf-file]
```

To deploy an Aerospike cluster with an Aerospike Prometheus Exporter sidecar, add the following to the podSpec section of the cluster's CR file:

```yaml
podSpec:
  multiPodPerHost: true
  sidecars:
   - name: aerospike-prometheus-exporter
     image: aerospike/aerospike-prometheus-exporter:1.3.0
     ports:
       - containerPort: 9145
         name: aerospike-prometheus-exporter

```

Use kubectl to apply the change.

```shell
kubectl apply -f aerospike-cluster.yaml
```

Deploy Prometheus-Grafana Stack using [aerospike-monitoring-stack.yaml](https://docs.aerospike.com/docs/cloud/assets/aerospike-monitoring-stack.yaml).

```shell
kubectl apply -f aerospike-monitoring-stack.yaml
```

Connect to the Grafana dashboard.

```shell
kubectl port-forward service/aerospike-monitoring-stack-grafana 3000:80
```

Open a browser window and go to `localhost:3000`. Log into Grafana with username `admin` and password `admin`.

To view the metrics, we recommend you import dashboards from the [Aerospike Monitoring GitHub Repo](https://github.com/aerospike/aerospike-monitoring/tree/master/config/grafana/dashboards).
