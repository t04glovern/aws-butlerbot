"use strict";
const Slackbot = require('slackbots');
const AWS = require('aws-sdk');

const slackbot_name = process.env['slackbot_name'];
const slackbot_encrypted_token = process.env['slackbot_token'];
const slackbot_channel = process.env['slackbot_channel'];
let slackbot_decrypted_token;

exports.handler = (event, context, callback) => {
    if (slackbot_decrypted_token && slackbot_name) {
        processEvent(event, context, callback);
    } else {
        const kms = new AWS.KMS();
        kms.decrypt({ CiphertextBlob: new Buffer(slackbot_encrypted_token, 'base64') }, (err, data) => {
            if (err) {
                console.log('Decrypt error:', err);
                return callback(err);
            }
            slackbot_decrypted_token = data.Plaintext.toString('ascii');
            processEvent(event, context, callback);
        });
    }
};

function processEvent(event, context, callback) {
    var butlerbot = new Slackbot({
        token: slackbot_decrypted_token,
        name: slackbot_name
    });
    console.log('Received event:', event);
    const payload = JSON.stringify(event);

    butlerbot.postMessageToChannel(slackbot_channel, "", {
        as_user: 'true',
        attachments: [{
            title: "Incoming Message!",
            fallback: "Message Receieved",
            text: payload,
            color: "#000000"
        }]
    }).then(function(data) {
        context.done(null, data);
    });
}
