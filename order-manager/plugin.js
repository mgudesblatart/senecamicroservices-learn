var senecaEmailer = require("seneca")().client({host: "182.168.0.2", port: 8080});
const plugin = (options)=>{
    var seneca = this;

    /**
     * Fetch the order by id.
     */
    seneca.add({area: "orders", action: "fetch"}, function(args, done) {
        var orders = this.make("orders");
        orders.list$({id:args.id}, done);
    });

    /**
     * Adds a order.
     */
    seneca.add({area: "orders", action: "create"}, function(args, done) {
        var products = args.products;
        var total = 0.0;
        products.forEach(function(product){
            total += product.price;
        });
        var orders = this.make("orders");
        orders.total = total;
        orders.customer_email = args.email;
        orders.customer_name = args.name;
        orders.save$(function(err, orders) {
            var pattern = {
                area: "email", 
                action: "send", 
                template: "new_order", 
                to: args.email,
                toName: args.name,
                vars: {
                    // ... vars for rendering the template ...
                }
            }
            senecaEmailer.act(pattern, done);
        });
    });

    /**
     * Removes a order by id.
     */
    seneca.add({area: "order", action: "delete"}, function(args, done) {
        var order = this.make("orders");
        order.remove$({id:args.id}, function(err) {
            done(err, null);
        });
    });
};
module.exports = plugin;