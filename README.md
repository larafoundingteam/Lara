# Lara Messaging
[![Build Status](https://travis-ci.org/larafoundingteam/Lara.svg?branch=dev)](https://travis-ci.org/larafoundingteam/Lara)

Private messaging app for n-1 messaging. Use case for is "Brother-At-Large" in some robert rules of order denominations.
# Table of Contents

1. [Installation](#Installation)
2. [Testing](#Testing)
3. [Development Tools](#Development-Tools)

## Installation
At the root of the project run:
```
npm install
```

##### Starting the App
To start the app run the following command: 
```
npm start
```

The application is in debug mode if   ```set DEBUG=*``` is found in package.json on the line:

```"start": "set DEBUG=* & nodemon ./source/bin/www"```

##### Starting the App with Docker
To start the app in a docker container
Install latest version of [docker] and [docker-compose]

To run the docker image:
```
docker-compose up
```

## Testing

To run tests, linter, and prettier:
```
npm run test
```

To only run test suite:
```
npm run test-only
```

#### Testing Tools
- [Mocha] (Test Runner Framework)
- [Supertest] (HTTP Integration Testing)
- [Sinon] (Mock and Stub Library)
- [Chai] (Assertion Library)
- [Istanbul-NYC] (Code Coverage Tool)

## Development Tools

##### EsLint
[EsLint] works recursively through all of the files in the source folder enforcing Airbnb linting rules

To lint:
```
npm run lint
```
To let EsLint try to autofix errors:
```
npm run lint -- --fix
```

##### Prettier
[Prettier] enforces code formatting 

To run Prettier:
```
npm run prettier
```

##### Nodemon
[Nodemon] is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. Nodemon automatically launches with the start of the app

##### Ngrok
[Ngrok] is a tool you should download. Ngrok exposes localhost ports to an internet domain. Ngrok is useful for integrating/testing local applications with cloud applications. For example to expose localhost port 4000 to the internet run the command:
```
ngrok http 4000
```

## Architecture

#### Frontend

React Application that when loaded uses Socket.io to create a socket connection with the backend API to recieve events from the API. The React Application will be hosted on a seperate EC2 instance. 

#### API

The backend Api do little computation but mainly acts as a carrier between the frontend and storage.

#### Storage

Dynamo DB Tables:

Dynamo Db table can only be queried on their primary key and is ordered by their sort key. So an example query from the messages table could be get all items matching AccountHolderId-AnonymousUserId = 1234-4 and CreatedAt > 23434543 epoch seconds.

Active Users table:

| User Id | Active | Number of Anonymous Users | ... |
An active sessions table will keep track of each user and whether or not they are active. In the case of the account holder their will be an additional attribute stating the number of anonymous users. For all users in the active sessions table any additional needed attributes such as destination ipaddress or port numbers can go here. The AnonymousUserID is the number of anonymous user that has messaged the Account Holder, if the anonymous user is the 4th person to send a message then the AnonymousUserId will be 4. 

Messages Table:

| AccountHolderId-AnonymousUserId | CreatedAt | Message | PostedBy | ToBeDeletedAt | 
A messages table will keep track of all of the messages. The messages table is partitioned by a primary key consisting of the AccountHolder Id concatenated with the anonymous user id. This concatenation creates a channel-Id. The messages table will have a sort key on time created and a time to delete attribute for automatic deletion of messages after a certain period. A PostedBy attribute will be set to AccountHolder or Anonymous user to show who sent the message.


Room Codes Table 

| Room Code | AccountHolderId |
A RoomCode table will map room codes to AccountHolders.


#### Possible events effects on storage:

Account Sign up:
An Account Holder signs up and is assigned a room code. The api generates a room code and adds it with the Acount Holder Id in the RoomCode table. The AccountHolder is added to the active users table the number of anonymous users is set to 0.

Anonymous message:
An anonymous user enters the room code and sends a message. The api recieves the message with the room code. Looks in the RoomCode table to get the AccountHolderId. Next the api checks the activeSessions table and increment the number anonymous users for the account holder and adds a row of the AnonymousUsers' Id and marks it as active. Then adds the message to the messages table with the primary key being the AccountHolderID-AnonymousUserID. Then the message is delivered to the AccountHolder if the AccountHolder is online. The frontend recieves the AccountHolderID-AnonymousUserID

Account Holder reply:
When the Account Holder replies as long as the anonymous user is active the message just needs to be added to the messages table with the key AccountHolderID-AnonymousUserID and sent to the anonymous user.

AnonymousUser reply:
When the anonymous user responds , the anonymous user now uses the AccountUserId-AnonymousUserId in header, the message is added to the messages table with the key AccountHolderID-AnonymousUserID and if the Account Holder is online the message is sent to the Account Holder. 

AnonymousUser exits:
When the anonymous user exits the active users table is changed to mark the user inactive and a user has left the chat message is added to the messages table and is sent to the AccountHolder.

Account Holder exits:
When the Account Holder signs out or exits. The Account Holder is marked inacctive in the active sessions table. 

Account Holder signs in:
When an account Holder signs in the active sessions table is checked to get all of the AccountUserID-AnonymousUserID pairs and marks the AccountHolder active. Then the messages table is read for each AccountUserID-AnonymousUserID and the message history is retrieved to be displayed. 

#### Storage Issues TBD:
- What to use for AccountHolderId
- When to delete users fromt the active users table
- No issues of security are adddressed and should be addressed in a future issue.







[//]: #

[docker]:  <https://docs.docker.com/install/>
[docker-compose]: <https://docs.docker.com/compose/install/>
[EsLint]: <https://eslint.org/>
[Prettier]: <https://prettier.io/>
[Mocha]: <https://mochajs.org/>
[Supertest]: <https://www.npmjs.com/package/supertest>
[Sinon]: <https://www.npmjs.com/package/sinon>
[Chai]: <https://www.npmjs.com/package/chai>
[Nodemon]: <https://www.npmjs.com/package/nodemon>
[Istanbul-NYC]: <https://www.npmjs.com/package/nyc>
[ngrok]: <https://ngrok.com/download>

    
    
