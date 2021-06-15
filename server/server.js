const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const tournamentRoute = require("./routes/tournamentRoutes.js");
const config = require("./config/db.config");

const app = express();
const PORT = 8090;

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome." });
// });


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

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
