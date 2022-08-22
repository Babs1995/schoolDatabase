"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
// got code from Connecting to a database Instructions on https://sequelize.org/docs/v6/getting-started/
const Sequelize = require("sequelize");
const user = require("./routes/users")
const course = require("./routes/courses")


// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();
app.use(express.json())

// adding routes 
app.use("/api", course)
app.use("/api", user)

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sjstd-restapi.db",
});

// Immediately Invoked Expression Using Async
(async () => {
  await sequelize.sync();
  try {
    await sequelize.authenticate();
    console.log("Yay!!!!!! Connexxxxion to db is finally working!");
  } catch (error) {
    console.log('Whoops!!!! Something went terribly wrong! Are you okay???', error);
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
})();

// necessary for morgan for http request logging
app.use(morgan("dev"));

// human readable message for root routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my very own SQL DB!",
  });
});

// generates error messages and will default to a 404 error if nothing else
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// generates a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// code to instruct the browser which port I will be using 
app.set("port", process.env.PORT || 5000);

// express server port address
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
