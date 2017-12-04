var api_key = 'key-b7399b00e8132e90802fc4f89fc0250b';
var domain = 'sandbox1d8cb7f8bf17415d8ae4e6ff90dc2bc0.mailgun.org';
var mailgun = require('mailgun-js')({apiKey:api_key,domain:domain});
//var data = {
//    from: 'Excited User <me@samples.mailgun.org>',
//    to: 'mgudesblat@fmooffice.com',
//    subject: 'Hello',
//    text: 'Testing some Mailgun awesomness!'
//};
//mailgun.messages().send(data, function (error, body) {
//    console.log(body);
//});
const plugin = (options)=>{
    var seneca = this;
    //sends email including content
    seneca.add({
        area:"email",
        action:"send"       
    },(args,done)=>{
        let message = {
            "html":args.content,
            "subject":args.subject,
            "to":`${args.toName} <${args.to}>`,
            "from":`Micromerce <info@micromerce.com>`
        };
        mailgun.messages().send(message,(err,body)=>{
            if(err){
                done({message:err.message}, null)
            }else{
                done(null,{status:body.message});
            }
           
        });
    });
    //sends email including content and cc
    seneca.add({
        area:"email",
        action:"send",
        cc:'*'
    },(args,done)=>{
        let message = {
            "html":args.content,
            "subject":args.subject,
            "to":`${args.toName} <${args.to}>`,
            "cc":`${args.ccName} <${args.cc}>`,
            "from":`Micromerce <info@micromerce.com>`
        };
        mailgun.messages().send(message,(err,body)=>{
            if(err){
                done({message:err.message}, null)
            }else{
                done(null,{status:body.message});
            }

        });
    });
    ///sends email including template
    seneca.add({
        area:'email',
        action:"send",
        template:"*"
    },(args,done)=>{
        let message = {
            "html":args.content,
            "subject":args.subject,
            "to":args.to,
            "from":`Micromerce <info@micromerce.com>`,
            "text":args.template,
            "recipient-variables":args.vars
        };
        mailgun.messages().send(message,(err,body)=>{
            if(err){
                done({message:err.message}, null)
            }else{
                done(null,{status:body.message, id:body.id});
            }

        });
    })
};
module.exports = plugin;