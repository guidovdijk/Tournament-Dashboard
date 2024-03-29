const player = require("../controller/playerController.js");
const playerRoute = require("express").Router();

// Retrieve all player
playerRoute.get("/", player.findAll);

// Retrieve a single player with id
playerRoute.get("/:id", player.findOne);

// Update a player with id
playerRoute.put("/:id", player.update);

// Delete a player with id
playerRoute.delete("/:id", player.delete);

// Create a new player
playerRoute.delete("/", player.deleteAll);

module.exports = playerRoute;