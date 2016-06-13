"use strict";

const HttpMethod = require("./http-method");
const Endpoint = require("./endpoint");

/**
 * Concrete types must inherit this type to provide <code>Restify</code>
 * endpoints which will be mapped to <code>ES6</code> class methods.
 */
class AbstractAPI {

    /**
     * Constructs empty collection for the <code>endpoints</code>.  Concrete
     * types must still configure them accordingly.
     *
     */
    constructor() {
        this.endpoints = [];
    }

    /**
     * Sets up the <code>Restify</code> server routes that have been configured.
     *
     * @param {Server} server - The <code>Restify</code> server instance.
     */
    setupRoutes(server) {

        this._getHttpMethodsMappedToServerFunctions().forEach(httpMethod => {
            const endpointsForHttpMethod = this._getEndpoinsFor(httpMethod.name);
            if (endpointsForHttpMethod != null && endpointsForHttpMethod.length > 0) {
                endpointsForHttpMethod.forEach(endpoint => {
                    httpMethod.serverFunction(server, endpoint);
                });
            }
        });

    }

    /**
     * Adds <code>HTTP GET</code> URL, mapped to a function (type/instance
     * method) providing the implementation.
     *
     * @param {string} name - The name/description of the endpoint.
     * @param {string} url - The URL of an <code>HTTP GET</code> endpoint.
     * @param {function} impl - The function implementing the execution of the endpoint.
     */
    addGet(name, url, impl) {
        this._addEndpoint(HttpMethod.GET, new Endpoint(name, url, impl));
    }

    /**
     * Adds <code>HTTP PUT</code> URL, mapped to a function (type/instance
     * method) providing the implementation.
     *
     * @param {string} name - The name/description of the endpoint.
     * @param {string} url - The URL of an <code>HTTP PUT</code> endpoint.
     * @param {function} impl - The function implementing the execution of the endpoint.
     */
    addPut(name, url, impl) {
        this._addEndpoint(HttpMethod.PUT, new Endpoint(name, url, impl));
    }

    /**
     * Adds <code>HTTP DELETE</code> URL, mapped to a function (type/instance
     * method) providing the implementation.
     *
     * @param {string} name - The name/description of the endpoint.
     * @param {string} url - The URL of an <code>HTTP DELETE</code> endpoint.
     * @param {function} impl - The function implementing the execution of the endpoint.
     */
    addDelete(name, url, impl) {
        this._addEndpoint(HttpMethod.DELETE, new Endpoint(name, url, impl));
    }

    /**
     * Adds <code>HTTP POST</code> URL, mapped to a function (type/instance
     * method) providing the implementation.
     *
     * @param {string} name - The name/description of the endpoint.
     * @param {string} url - The URL of an <code>HTTP POST</code> endpoint.
     * @param {function} impl - The type/instance implementing the execution of the endpoint.
     */
    addPost(name, url, impl) {
        this._addEndpoint(HttpMethod.POST, new Endpoint(name, url, impl));
    }

    /**
     * This "private" method adds an Endpoint, mapped to the type of its
     * <code>HTTP</code> method.
     *
     * @param {string} httpMethod - The HTTP method to map the Endpoint to.
     * @param {Endpoint} endpoint - The endpoint to use.
     */
    /* private */ _addEndpoint(httpMethod, endpoint) {

        if (this.endpoints[httpMethod] == null) {
            this.endpoints[httpMethod] = [];
        }

        this.endpoints[httpMethod].push(endpoint);

    }

    /**
     * This "private" method maps <code>HttpMethod</code>s to their equivalent
     * function that must be executed on the <code>Restify</code> server
     * instance.
     *
     * @returns {array} Objects with <code>name</code> and
     *          <code>serverFunction</code> properties.
     */
    /* private */ _getHttpMethodsMappedToServerFunctions() {

        return [
            { name: HttpMethod.GET,
                serverFunction: (server, endpoint) => {
                    server.get(endpoint.getUrl(), endpoint.getImpl());
                }
            },
            { name: HttpMethod.PUT,
                serverFunction: (server, endpoint) => {
                    server.put(endpoint.getUrl(), endpoint.getImpl());
                }
            },
            { name: HttpMethod.DELETE,
                serverFunction: (server, endpoint) => {
                    server.del(endpoint.getUrl(), endpoint.getImpl());
                }
            },
            { name: HttpMethod.POST,
                serverFunction: (server, endpoint) => {
                    server.post(endpoint.getUrl(), endpoint.getImpl());
                }
            }
        ];

    }

    /**
     * This "private" method check if any <code>Endpoint</code>s are configured
     * for a certain <code>HTTP METHOD</code>.
     *
     * @param {string} httpMethod - The <code>HTTP METHOD</code>.
     *
     * @returns {boolean} <code>true</code> if <code>Endpoint</code>s exist for
     *          the given <code>HTTP METHOD</code>; <code>false</code> otherwise.
     */
    /* private */ _hasEndPointsFor(httpMethod) {
        return (this.endpoints[httpMethod] != null && this.endpoints[httpMethod].length > 0);
    }

    /**
     * This "private" method returns all the <code>Endpoint</code>s configured
     * for a certain <code>HTTP METHOD</code>.
     *
     * @param {string} httpMethod - The <code>HTTP METHOD</code>.
     *
     * @returns {array} All the <code>Endpoint</code>s for the given'
     *          <code>HTTP METHOD</code>.
     */
    /* private */ _getEndpoinsFor(httpMethod) {
        return this.endpoints[httpMethod];
    }

}

module.exports = AbstractAPI;
