# PrivateMsgApp
[![Build Status](https://travis-ci.org/larafoundingteam/Lara.svg?branch=dev)](https://travis-ci.org/larafoundingteam/Lara)

Private messaging app for n-1 messaging. Use case for is "Brother-At-Large" in some robert rules of order denominations.

## Installation

Be sure to run ```npm install``` at the root



### Starting the App


To start the app run the following command: 


```
npm start
```
To lessen the logging level simply delete  ```set DEBUG=*``` from the line "start": "set DEBUG=* & nodemon ./source/bin/www", in the package.json


## Tools
The linter looks recursively through all of the files in the source folder
To run the linter run the following command:

```npm run lint```


## Running with Docker
## Install latest version of docker ce and docker-compose per your OS
To run the docker image run:
```docker-compose up```
