# Application that tracks jogging times of users
+ User must be able to create an account and log in.
+ When logged in, a user can see, edit and delete his times he entered.
+ Implement at least three roles with different permission levels: a regular user would only be able to CRUD on their owned records, a user manager would be able to CRUD users, and an admin would be able to CRUD all records and users.
+ Each time entry when entered has a date, distance, and time.
+ When displayed, each time entry has average speed.
+ Filter by dates from-to.
+ Report on average speed & distance per week.
+ REST API. Make it possible to perform all user actions via the API, including authentication
+ All actions need to be done client side using AJAX, refreshing the page is not acceptable.

# Structure
Two independent folders to separate the back-end and front-end logic .<br/>
+ Back-end: RESTfull Web service in NodeJS
+ Front-end: VueJS tool

To know more, each one of them has their own README.md

# Installation
## Prerequisites
+ Node
+ Github
+ Mongodb ( https://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-6/ )

## Clone repositorie
```git clone git@git.toptal.com:Vicente-Jose-Hernandez-Garcia/vicente-jose-hernandez-garcia.git```

## Install dependencies in back folder
```
cd vicente-jose-hernandez-garcia/back
npm install
```

## Install dependencies in front folder
```
cd ../front
```
Install vue-cli ( https://github.com/vuejs/vue-cli )
```
npm install -g vue-cli

```
Install package.json dependencies

```
npm install

```

## Create a webpack template
vue init webpack 

```
  Generate project in current directory? (Y/n) Y
  Project name: intro
  Project description: intro
  Author: intro
  Install vue-router? (Y/n)Y
  Use ESLint to lint your code? (Y/n)Y  
    Standard
  Set up unit tests (Y/n)n
  Setup e2e tests with Nightwatch? (Y/n)n

```
```
npm install
npm run dev
```


# Credentials ( In my local )
### Admin
``` 
email: admin@gmail.com 
password: admin
 ```
 ### Manager
``` 
email: manager1@gmail.com 
password: manager
 ```
 ``` 
email: manager2@gmail.com 
password: manager
 ```
 ### Normal
``` 
email: normal1@gmail.com 
password: normal
 ```
 ``` 
email: normal2@gmail.com 
password: normal
 ```
 ``` 
email: normal3@gmail.com 
password: normal
 ```
  
