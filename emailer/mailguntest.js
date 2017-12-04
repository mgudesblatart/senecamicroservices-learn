var api_key = 'key-b7399b00e8132e90802fc4f89fc0250b';
var domain = 'sandbox1d8cb7f8bf17415d8ae4e6ff90dc2bc0.mailgun.org';
var mailgun = require('mailgun-js')({apiKey:api_key,domain:domain});
var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'msdfgsdfg@sdfsdf.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
};
mailgun.messages().send(data, function (error, body) {
    console.log(body);
});