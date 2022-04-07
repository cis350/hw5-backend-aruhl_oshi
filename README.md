# HW5: Guess the Celebrity (backend) MERN App

## Overview:

This is the last step in implementing our app.
In this assignment, you will:

- **Implement an Express.js server running on NodeJS for the backend**
- **Use MongoDB  as your database to store data**
- **Test your backend code**

Since we are using MongoDB as our database, we are building a MERN (Mongo + Express + React + Node) application. 

Make sure you follow the setup instructions carefully so that you will avoid headaches down the line.

## Setup:

### Setting up the backend

- In the root of your repository, run `npm install` to get all the base server dependencies installed
- Now run the command `npm start`.
  - You should get a message saying "Server running on port: 5000"
- Navigate to http://localhost:5000 (in your browser), where you should see a blank page containing ` {"message":"Welcome to HW5 Backend"}`
- Congrats! You have the initial backend set up, now you need to connect to the database and define your routes (marked as _TODO_ in the `server.js` file)
- You can stop your server with Ctrl-C
- It is strongly recommended to create one or more modules with database and other necessary functions to make it easier to unit test.

### Connecting to a database

- Sign up for an account [here](https://account.mongodb.com/account/register).
- A guide to setting up a free database with Atlas can be found [here](https://intercom.help/mongodb-atlas/en/articles/3013643-creating-databases-and-collections-for-atlas-clusters)
- We recommend installing the [mongodb driver](https://www.npmjs.com/package/mongodb) to connect and send queries to your database.

### Setting up the frontend

- You will be using your HW3 and/or HW4 frontend for this assignment. We will retire storage.js and use api.js to communicate with the backend.
- Update the value of the `rootURL` variable inside api.js to the URL of your backend server (the default value is http://localhost:5000)




## REST API:

The express server implements the API documentation available on Swagger, that you created while working on HW1. 

Take some time to go over the documentation as your app must follow its specifications:

- Your database should capture all the information described in the models section of the API
- Your modules (frontend and backend) must implement the operations listed under each path (endpoints) use the same names. In this homework we are only focusing on the backend (no need to rework your frontend). For example If you have an addPlayer function in your API documentation, addPlayer in the frontend will collect all the information from the react/react-native view and send the HTTP (POST) request to the backend, while the addPlayer on the backend will receive all the information from express and store it in the database.
- You must return the status code and data listed in the API

## Running and interacting with the backend:

- To start the backend, run `npm start` in the terminal.
- The express server will listen on port 5000. You can
  change the port in server.js (variable `port`).
- You can use your browser to manually test your **GET** endpoints and curl to test all your endpoints.

## Testing & CI:

- Make sure you create a GitHub actions workflow to test and build your backend. Take a look at the documentation [here](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs-or-python).
- You must perform **unit and integrations tests** on the backend
- Your backend tests should achieve the highest code coverage possible (>= 70%)

## Validation:

- Your JavaScript must be clean, readable, and **_ESLint warning-free_** (Airbnb style)

## Github:

- You should continue to follow branching and merging guidelines similar to the previous homework assignments.

## Submission:

- Only submit your backend code
- Do not forget to commit your work to GitHub regularly.
- Only the last push before the due date will be graded.
- Do not forget to submit on Gradescope (25% penalty for TA manual submissions).
