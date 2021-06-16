const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const tournamentRoute = require("./routes/tournamentRoutes.js");
const teamRoute = require("./routes/teamRoutes.js");
const playerRoute = require("./routes/playerRoutes.js");
const config = require("./config/db.config");

const app = express();
const PORT = 8090;

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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
app.use('/player', playerRoute);

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
