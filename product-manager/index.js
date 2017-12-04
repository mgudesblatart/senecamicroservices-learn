//const express = require('express');
//const bodyparser = requite('body-parser');
//const plugin = require('./plugin');
//const seneca = require('seneca')();
//seneca.use(plugin);
//seneca.use('mongo-store',{
//    name: "seneca",
//    host: "127.0.0.1",
//    port: "27017"
//});
//
//seneca.ready((err)=>{
//    seneca.act(('role:web',{
//        use:{
//            prefix: '/products',
//            pin: {
//                area: 'product',
//                action: '*'
//            },
//            map:{
//                fetch: {
//                    GET: true
//                },
//                add:{
//                    GET:false,
//                    POST:true
//                },
//                edit: {
//                    GET: false,
//                    POST: true
//                },
//                delete:{
//                    GET:false,
//                    DELETE: true
//                }
//            }
//        }
//    }));
//    let app = express();
//    
//    app.use(bodyparser.json());
//    app.use(seneca.export('web'));
//    app.list(3000);
//});

