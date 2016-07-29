# restify-abstract-config

[![NPM](https://img.shields.io/npm/v/restify-abstract-config.svg)](https://www.npmjs.com/package/restify-abstract-config)

## Install

    $ npm install restify-abstract-config

## Usage

Use the `AbstractAPI` class to fast track configuring Restify HTTP methods to your
own concrete type's instance methods.

For example:

```javascript
// $PROJECT_ROOT/app/routes/some-custom-api.js
"use strict";

const AbstractAPI = require("restify-abstract-config").AbstractAPI;

class SomeCustomAPI extends AbstractAPI {
    constructor() {

        super();

        this.addGet("get", "/api/custom/:id", this.get);
        this.addGet("getAll", "/api/custom", this.getAll);

        this.addPut("update", "/api/custom/:id", this.update);

        this.addDelete("delete", "/api/custom/:id", this.delete);

        this.addPost("create", "/api/custom", this.create);

    }

    get(req, res, next) {
        res.send('get');
        next();
    }

    getAll(req, res, next) {
        res.send('getAll');
        next();
    }

    update(req, res, next) {
        res.send('update');
        next();
    }

    delete(req, res, next) {
        res.send('delete');
        next();
    }

    create(req, res, next) {
        res.send('create');
        next();
    }

}

module.exports = new SomeCustomAPI();
```

What is important here is that the `server` in following code snippet is the
instance you get after executing `createServer()` on the `restify` module (This
is showcased in another code snippet below).

Execute the setup of your routes above as follows (of course you can invoke this
as you see fit in your own code base):

```javascript
// $PROJECT_ROOT/app/routes/index.js
"use strict";

const someCustomAPI = require("./some-custom-api");

module.exports = {

    setup: function(server) {

        someCustomAPI.setupRoutes(server);

        //Print this API's endpoints
        someCustomAPI.endpointsInfo();

        //Print all the Restify-configured routes
        someCustomAPI.allRoutesInfo(server);

    }

}
```

Ensure that the above `setup` function is called again eg:

```javascript
// $PROJECT_ROOT/server.js
"use strict";

let restify = require('restify');
let routes = require("./app/routes");

let server = restify.createServer();
routes.setup(server);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
```

## License

[MIT](LICENSE)

## Bugs

See <https://github.com/0v3rst33r/restify-abstract-config/issues>.
