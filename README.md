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
To run tests:
```
npm run tests
```

#### Testing Tools
- [Mocha] (Test Runner Framework)
- [Supertest] (HTTP Integration Testing)
- [Sinon] (Mock and Stub Library)
- [Chai] (Assertion Library)
- [Istanbul NYC] (Code Coverage Tool)

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
[Istanbul NYC]: <https://www.npmjs.com/package/nyc>
[ngrok]: <https://ngrok.com/download>

    
    
