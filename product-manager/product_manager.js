const plugin = (options)=>{
    var seneca = this;

    /**
     * Fetch the list of all the products.
     */
    seneca.add('role:product,cmd:fetch', function(msg, respond) {
        var products = this.make("products");
        products.list$({}, respond);
    });

    /**
     * Fetch the list of products by category.
     */
    seneca.add({area: "product", action: "fetch", criteria: "byCategory"}, function(msg, respond) {
        var products = this.make("products");
        products.list$({category: args.category}, done);
    });

    /**
     * Fetch a product by id.
     */
    seneca.add({area: "product", action: "fetch", criteria: "byId"}, function(msg, respond) {
        var product = this.make("products");
        product.load$({id:args.id}, done);
    });

    /**
     * Adds a product.
     */
    seneca.add({area: "product", action: "add"}, function(msg, respond) {
        var products = this.make("products");
        products.category = args.category;
        products.name = args.name;
        products.description = args.description;
        products.category = args.category;
        products.price = args.price
        products.save$(function(err, product) {
            done(err, products.data$(false));
        });
    });

    /**
     * Removes a product by id.
     */
    seneca.add({area: "product", action: "remove"}, function(msg, respond) {
        var product = this.make("products");
        product.remove$({id:args.id}, function(err) {
            done(err, null);
        });
    });

    /**
     * Edits a product fetching it by id first.
     */
    seneca.add({area: "product", action: "edit"}, function(msg, respond) {
        seneca.act({area: "product", action: "fetch", criteria: "byId", id: args.id}, function(err, result) {
            result.data$(
                {
                    name: args.name, 
                    category: args.category, 
                    description: args.description,
                    price: args.price                        
                }
            );
            result.save$(function(err, product){
                done(err, product.data$(false));
            });
        });
    });
};
module.exports = plugin;