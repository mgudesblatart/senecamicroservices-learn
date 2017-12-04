const plugin = (options)=>{
    var seneca = this;
    
    //get all products
    seneca.add({area:"ui",action:"products"},(args,done)=>{
        seneca_product_manager.act({area:"product",action:'fetch'},done);
    });
    //get product by id
    seneca.add({area:'ui',action:'products', action: 'productbyid'},(args,done)=>{
        seneca_product_manager.act({area:'product',action:'fetch',criteria:'byId', id:args.id},done);
    });
    seneca.add({area:'ui',action:'createorder'},(args,done)=>{
        seneca_product_manager.act({area:'product',action:'fetch',criteria:'byId',id:args.id},(err,product)=>{
            if(err) done(err,null);
            seneca_order_manager.act({area:'orders',action:'create',products:[product],email:args.email,name:args.name},done);
        })
    });
    this.add('init:api',(msg,respond)=>{
        seneca.act('role:web',{
            use:{
                prefix:'/api',
                pin: {
                    area: 'ui',
                    action:'*'
                },
                map:{
                    products:{
                        GET:true
                    },
                    productbyid:{
                        GET:true, suffix:'/:id'
                    },
                    createorder:{
                        POST:true
                    }
                }
            }
        }, respond);
    });
};
module.exports = plugin;