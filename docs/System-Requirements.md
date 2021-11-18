---
title: System Requirements
description: System Requirements
---

The Aerospike Kubernetes Operator deploys and manages Aerospike Database Enterprise Edition, versions 4.9.0 to 5.6.0.13.  

:::note
Although the Aerospike Kubernetes Operator can be used to deploy Aerospike Community Edition, most of the Operator's features are only compatible with Aerospike Enterprise Edition.
:::

The Operator is supported on:

* Kubernetes 1.16, 1.17, 1.18, 1.19, 1.20, 1.21, and 1.22
* Openshift 4.6, 4.7, and 4.8

On the following platforms:

* Amazon Elastic Kubernetes Service
* Google Kubernetes Engine
* Microsoft Azure Kubernetes Service
* Locally via Minikube or Minik8s

## Local Computer

Your local computer (the computer where you will be running kubectl commands) needs:

* kubectl v1.11.3+
* A copy of the files in the Aerospike Kubernetes Operator GitHub repo
* Operator SDK CLI version 1.10.1

### Install the Operator SDK CLI

Install operator-sdk version 1.10.1 using the installation [guide](https://v1-10-x.sdk.operatorframework.io/docs/installation/)
