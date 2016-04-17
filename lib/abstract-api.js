"use strict";

const _api = require("./abstract-api-constants");

module.exports = class AbstractAPI {

    constructor() {
        this.endpoints = [];
    }

    addEndpoint(endpointType, endpoint) {

        if (this.endpoints[endpointType] == null) {
            this.endpoints[endpointType] = [];
        }

        this.endpoints[endpointType].push(endpoint);

    }

    setupRoutes(server) {

        if (this.hasEndPointsFor(_api.GET)) {

            this.getEndpoinsFor(_api.GET).forEach(function (endpoint) {
                server.get(endpoint.getUrl(), endpoint.getImpl());
            });

        }

        if (this.hasEndPointsFor(_api.PUT)) {

            this.getEndpoinsFor(_api.PUT).forEach(function (endpoint) {
                server.put(endpoint.getUrl(), endpoint.getImpl());
            });

        }

        if (this.hasEndPointsFor(_api.DELETE)) {

            this.getEndpoinsFor(_api.DELETE).forEach(function (endpoint) {
                server.del(endpoint.getUrl(), endpoint.getImpl());
            });

        }

        if (this.hasEndPointsFor(_api.POST)) {

            this.getEndpoinsFor(_api.POST).forEach(function (endpoint) {
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
