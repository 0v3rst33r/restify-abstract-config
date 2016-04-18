"use strict";

const HttpMethod = require("./http-method");

module.exports = class AbstractAPI {

    constructor() {
        this.endpoints = [];
    }

    addGet(endpoint) {
        this.addEndpoint(HttpMethod.GET, endpoint);
    }

    addPut(endpoint) {
        this.addEndpoint(HttpMethod.PUT, endpoint);
    }

    addDelete(endpoint) {
        this.addEndpoint(HttpMethod.DELETE, endpoint);
    }

    addPost(endpoint) {
        this.addEndpoint(HttpMethod.POST, endpoint);
    }

    addEndpoint(endpointType, endpoint) {

        if (this.endpoints[endpointType] == null) {
            this.endpoints[endpointType] = [];
        }

        this.endpoints[endpointType].push(endpoint);

    }

    setupRoutes(server) {

        if (this.hasEndPointsFor(HttpMethod.GET)) {

            this.getEndpoinsFor(HttpMethod.GET).forEach(function (endpoint) {
                server.get(endpoint.getUrl(), endpoint.getImpl());
            });

        }

        if (this.hasEndPointsFor(HttpMethod.PUT)) {

            this.getEndpoinsFor(HttpMethod.PUT).forEach(function (endpoint) {
                server.put(endpoint.getUrl(), endpoint.getImpl());
            });

        }

        if (this.hasEndPointsFor(HttpMethod.DELETE)) {

            this.getEndpoinsFor(HttpMethod.DELETE).forEach(function (endpoint) {
                server.del(endpoint.getUrl(), endpoint.getImpl());
            });

        }

        if (this.hasEndPointsFor(HttpMethod.POST)) {

            this.getEndpoinsFor(HttpMethod.POST).forEach(function (endpoint) {
                server.post(endpoint.getUrl(), endpoint.getImpl());
            });

        }

    }

    hasEndPointsFor(endpointType) {
        return (this.endpoints[endpointType] != null && this.endpoints[endpointType].length > 0);
    }

    getEndpoinsFor(endpointType) {
        return this.endpoints[endpointType];
    }

}
