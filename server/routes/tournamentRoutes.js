module.exports = server => {
  const tournament = require("../controllers/tournamentController.js");

  const router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tournament.create);

  // Retrieve all tournament
  router.get("/", tournament.findAll);

  // Retrieve all published tournament
  router.get("/published", tournament.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tournament.findOne);

  // Update a Tutorial with id
  router.put("/:id", tournament.update);

  // Delete a Tutorial with id
  router.delete("/:id", tournament.delete);

  // Create a new Tutorial
  router.delete("/", tournament.deleteAll);

  server.use('/server/tournaments', router);
};