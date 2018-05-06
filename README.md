# AWS ButlerBot

Handles pushing messages out to a Slack channel as ButlerBot

![CatBox Banner](/assets/butlerbot.png)

## Setup

Setup you Slack bot and create a Bot User. within your AWS Lambda function panel add two environment variables

* **slackbot_encrypted_token** : This is the Bot api token that is given to you when you create the Bot user, this token should have been setup in KMS and passed as an encrypted variable.

* **slackbot_name** : This is your Bot User name

* **slackbot_channel** : This is the channel your bot with post to.
