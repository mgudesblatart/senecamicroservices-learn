const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const seneca_emailer = require('seneca')().client({
    host: "192.168.0.2",
    port:8080
});
const seneca_product_manager = require('seneca')().client({
    host:"192.168.0.3",
    port:8080
});
const seneca_order_manager = require('seneca')().client({
    host:"192.168.0.4",
    port:8080
});

const plugin = require('./plugin');
const seneca = require('seneca')();
seneca.use(plugin);

app.use(bodyparser.json());
app.use(seneca.export("web"));
app.listen(3000);