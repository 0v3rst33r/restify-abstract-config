"use strict";

// Public
module.exports = class Endpoint {

    constructor(name, url, impl) {

        this.name = name;
        this.url = url;
        this.impl = impl;

    }

    getName() {
        return this.name;
    }

    getUrl() {
        return this.url;
    }

    getImpl() {
            return this.impl;
    }

}
