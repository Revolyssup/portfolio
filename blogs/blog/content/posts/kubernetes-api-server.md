---
title: "Exploring Kubernetes with OpenAPI"
date:  2023-04-04T17:24:55+05:30
description: "We explore REST API provided by Kubernetes API server while using the response of /openapi/v2 as an index."
tags: ["kubernetes"]
type: post
draft: true
weight: 25
showTableOfContents: true
---

If you were to GET Kubernetes API server on `/openapi/v2`, it will return with a big JSON file that describes the current state of its API. 

JsonSchemas, Swagger and OpenAPI

jsonschema is a declarative way of validating JSON documents. There are multiple drafts of jsonschema present all defined [here](https://json-schema.org/).  You can optionally pass a `$schema` field in your json describing exact draft version of jsonschema to use in order to validate the given JSON. As JSON natively does not have rich data type support like `int32` `int64` `byte` etc, `format` field can be used alongside `type` to have better primitive data types. This is useful specially in statically typed languages. 

Swagger is a specification that defines a document describing the overall state of a REST API containing all it’s endpoints (in `paths`). It uses different drafts of Jsonschema to describe the structure of it’s responses(in `definitions`). Swagger was called swagger up until 2.0. Swagger 3.0 is also known as OpenAPI. Therefore OpenAPIV2 is used sometimes for Swagger 2.0. The document returned by `/openapi/v2` has `swagger: 2.0` as a top level field.

Kubernetes uses OpenAPI with few extensions described [here](https://github.com/kubernetes/kubernetes/blob/master/api/openapi-spec/README.md).

One use of this endpoint inside kubectl is for client side schema validation. The helper function which intialises the verifier is present in cli-runtime [here](https://github.com/kubernetes/cli-runtime/blob/88d2de9dd3fd0b70d8483d5b5b386bd76d8dbab6/pkg/resource/query_param_verifier.go#L30). The returned struct internally uses OpenAPISchema() method which returns the OpenAPI doc. This method is defined on OpenAPISchemaInterface which is defined in [client-go/discovery_client](https://github.com/kubernetes/client-go/blob/04ef61f72b7bc5ae6efef4e4dc0001746637fdb3/discovery/discovery_client.go#L146) and DiscoveryClient also provides an implementation of this interface [here](https://github.com/kubernetes/client-go/blob/04ef61f72b7bc5ae6efef4e4dc0001746637fdb3/discovery/discovery_client.go#L611)  which requests `/openapi/v2.`

The complete OpenAPI specification for v2 can be found [here](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathsObject). Mainly we are going to focus of `definitions` Object. `paths` Objects contains the description of any given REST endpoint and the schema of its response. Usually given the fact that the objects in Response have large schemas, these schemas are kept separately with a unique key under `defintions` object and are referenced with `$ref` in `definitions`

We are going to look at some of the keys in this `definition` object and navigate to code from where these definitions come from. The OpenAPI schema is usually laid out so that code generation is possible for any client given the schema. Therefore just looking at the schema gives a great deal of insights to where the Code is present which generated the schema. 

It is recommended that you read Iximiuz blog exploring different kubernetes components like api, api-machinery, client-go, etc and their significance. I will not repeat something that has already been said by Ivancho in the most pedagogical way possible.

Before going further, I’d like to discuss GVR and GVK. Skip this if you have already read Iximiuz.

GVR: It is a tupple of Group Version ResourceName used to uniquely identify a resource(or even subresource) in kubernetes API server. Any resource that is accessed by kubernetes has a corresponding GVR. You can play around with `kubectl` with `-v6` flag (verbose mode) to see all the API calls it makes. Any endpoint that it makes a call to has a corresponding GVR. Even when you do `kubectl exec` , you are accessing `exec` subresource defined under another resource (mostly `pod`). `[kubectl exec` sends over a POST request to this subresource](https://github.com/kubernetes/kubectl/blob/65639830b2b0e5f6b254d05b911b7676eb7757d2/pkg/cmd/exec/exec.go#L359). You can confirm this also by performing exec with verbose flag. Below is the screenshot:

![Screenshot 2023-04-04 at 4.01.35 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/efa43bb0-1e2c-470f-8b18-04f4da0c5116/Screenshot_2023-04-04_at_4.01.35_PM.png)

The last 101 indicates setting up of a bidirectional stream from kubectl. In the below screenshot you can see the definition for the POST on this subresource defines the query params:

![Screenshot 2023-04-04 at 4.23.46 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/57cc7c6d-813b-4eeb-9dd4-be06fe906b2d/Screenshot_2023-04-04_at_4.23.46_PM.png)

In Meshery, we have a component Meshsync which also establishes a bidirectional stream with kube api server using the same mechanism. [Check it out here.](https://github.com/meshery/meshsync/blob/70f611673b902c314bae8888ee976147de7b0d24/meshsync/exec.go#L120) Here the only difference is that the request and responses are a little more asynchronous and go through a message bus which in our case is NATS. Both MeshSync and Kubectl use this package to handle setting up [bidirectional streaming on POST](https://github.com/kubernetes/client-go/blob/master/tools/remotecommand/remotecommand.go) 

GVK:  Restmapper present in [apimachinery](https://github.com/kubernetes/apimachinery/blob/master/pkg/api/meta/restmapper.go) makes a mapping from Resource→Kind 

From Iximiuz: 

> Turns out, in Kubernetes, a ***kind***
 is the name of an ***object schema***
. Like the one you'd typically describe using a [JSON schema](https://json-schema.org/)
 vocabulary. In other words, a *kind*
 refers to a particular data structure, i.e. a certain composition of attributes and properties.
> 

## What are the keys in definitions?

- In kubernetes, we provide. `apiVersion` as `<group>/<version>` where group is DNS formatted name eg: [meshery.layer5.io](http://meshery.layer5.io/)
- In the key, group is formatted in reverse-DNS order such that clients can do prefix based matching therefore the GVR format results in `<reverse group>.<version>.<resourcename>` . For eg: `io.layer5.meshery.v1alpha1.Broker`
- For Resources defined as structs across kubernetes repo, the reverse DNS name is `io.k8s.<path to the group in repo>`
- For instance, for pod the key is:

![Screenshot 2023-04-04 at 4.43.00 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84d4d7be-d5fb-4d6e-93d7-686b1a444e01/Screenshot_2023-04-04_at_4.43.00_PM.png)

It means the Pod struct is inside api repo in core(groupname)/v1(version) directory. [Here](https://github.com/kubernetes/api/tree/master/core/v1). 

So is the case with all other definitions like:

![Screenshot 2023-04-04 at 4.45.57 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7690da01-0f79-414b-b276-5fd41247cd9a/Screenshot_2023-04-04_at_4.45.57_PM.png)

This struct is in apimachinery pkg/api/resources.

You might think that to see and follow how kubectl gets the list of all resources it has, you can perform `kubectl api-resources -v6` but it calls `/apis` which only returns the list of known Kubernetes Object. Kubernetes Object have to have more than just `kind` like `apiVersion` and `[metadata.name](http://metadata.name)` or `metadata.namespace.`

//AI wrote the below stuff

This JSON file contains information about the Kubernetes API endpoints, their methods, parameters, and responses. It can be used by API clients to generate client-side code and automate interactions with the Kubernetes API server. This file is also used by Kubernetes tools, like `kubectl`, to validate CLI commands and provide auto-completion for API resources.