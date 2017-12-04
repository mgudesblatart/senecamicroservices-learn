const seneca = require('seneca')();
const plugin = require('./plugin');

seneca.use(plugin);
seneca.act({
    area:"email",
    action:"send",
    subject:"The Subject",
    to:"test@test.com",
    toName:"Test Testington"
},(err,result)=>{
    console.log(err);
    console.log(result);
})