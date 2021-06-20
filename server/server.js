const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/db.config");
const passport = require('passport');
const tournamentRoute = require("./routes/tournamentRoutes.js");
const teamRoute = require("./routes/teamRoutes.js");
const playerRoute = require("./routes/playerRoutes.js");
const userRoute = require("./routes/userRoutes.js");

const app = express();
const PORT = 8090;

mongoose.Promise = global.Promise;

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require('./config/passport')(passport);

mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use('/tournaments', tournamentRoute);
app.use('/tournaments/teams', teamRoute);
app.use('/players', playerRoute);
app.use('/user', userRoute);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
