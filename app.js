const express = require('express');
const twilio = require('twilio');
const app = express()

const accountSid = 'ACcd101ec2b9d96b87502d0de75424ca3d';
const authToken = 'c4fb6ce5fae5b1b26400c4a2450a39e3';
const client = require('twilio')(accountSid, authToken);

async function sendSMS () {
    
    client.messages
        .create({
            body: `This is a message`,
            from: '+13342768244',
            to: '+918285589412'
        })
        .then(message => console.log(message.sid))
        .catch(err => console.error(err));
}

sendSMS();

// async function sendSMS(){
//     const client = new twilio('ACcd101ec2b9d96b87502d0de75424ca3d', 'c4fb6ce5fae5b1b26400c4a2450a39e3')

//     return client.messages
//     .create({
//        body: 'This is the message body',
//        to: '+918285589412'
//      })
//     .then(message => console.log(message.sid))
//     .catch(err => console.error(err));
  
// }

// sendSMS()

app.listen(5000, () => console.log('Listening at port 5000'))