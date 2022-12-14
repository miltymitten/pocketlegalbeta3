// a package that hides our environment variables and puts them in gitignore
require('dotenv').config()
// require express
const express = require('express');
// require mongoose
const mongoose = require('mongoose')
// access the routes inside metrics.js
const metricRoutes = require('./routes/metrics')
// require path
const path = require('path');

// creates an express app
const app = express();

// global middleware: gets run everytime a request comes in
// checks if the request has data to it, if it does, it will parse it and put it in req
app.use(express.json())
app.use((req, res, next) => {
    // console.log(req.path, req.method)
    next()
})

//// routes: need app to react  to requests using routes
// grabs all the routes from metrics.js and uses them when a request is made to /api/workouts endpoint
app.use('/api/metrics', metricRoutes)

// not entirely sure what this line does or whether its absolutely necessary for deployment. will need to check again later
app.use(express.static(path.join(__dirname, "frontend", "build")))

// NOTE: This block of code needs to be placed after all routes are defined i.e. after the app.use('/api/metrics', metricRoutes) line
// Otherwise, the app will crash upon deployment to Heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,  "frontend", "build", "index.html"));
    });
  }

// connect to the database: returns a promise because its an async operation
// process.env.MONGO_URI is the connection string to the database stored in the .env file
mongoose.connect(process.env.MONGO_URI)
    // fire off a function when the promise is resolved
    .then(() => {
        // listen for requests at port defined in .env file only after connection to db is made
        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
        // console.log(`connected to db and listening on port: ${PORT}`)
})
    })
    // catch any errors
    .catch((error) => {
        // console.log(error)
    })

