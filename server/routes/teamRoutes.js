const team = require("../controller/teamController.js");
const teamRoute = require("express").Router();

// Create a new team
teamRoute.post("/", team.createMany);

// Retrieve all team
teamRoute.get("/", team.findAll);

// Retrieve a single team with id
teamRoute.get("/:id", team.findOne);

// Update a team with id
teamRoute.put("/:id", team.update);

// Delete a team with id
teamRoute.delete("/:id", team.delete);

// Create a new team
teamRoute.delete("/", team.deleteAll);

module.exports = teamRoute;