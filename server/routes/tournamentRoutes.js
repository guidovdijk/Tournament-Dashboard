const tournament = require("../controller/tournamentController.js");
const tournamentRoute = require("express").Router();

// Create a new tournament
tournamentRoute.post("/", tournament.create);

// Retrieve all tournament
tournamentRoute.get("/", tournament.findAll);

// Retrieve a single tournament with id
tournamentRoute.get("/:id", tournament.findOne);

// Update a tournament with id
tournamentRoute.put("/:id", tournament.update);

// Delete a tournament with id
tournamentRoute.delete("/:id", tournament.delete);

// Create a new tournament
tournamentRoute.delete("/", tournament.deleteAll);

module.exports = tournamentRoute;