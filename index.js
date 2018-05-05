"use strict";
const Slackbot = require('slackbots');
const AWS = require('aws-sdk');

const slack_token = process.env['slack_token'];
const slackbot_name = process.env['slackbot_name'];

var channel = 'general';

exports.handler = (event, context, callback) => {
    if (slack_token && slackbot_name) {
        processEvent(event, context, callback);
    }
};

function processEvent(event, context, callback) {
    var butlerbot = new Slackbot({
        token: slack_token,
        name: slackbot_name
    });
    console.log('Received event:', event);

    butlerbot.postMessageToChannel(channel, "", {
        as_user: 'true',
        attachments: [{
            title: "Incoming Message!",
            fallback: "Message Receieved",
            text: event,
            color: "#000000"
        }]
    }).then(function(data) {
        context.done(null, data);
    });
}
