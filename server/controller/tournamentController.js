const Tournament = require("../model/tournament");

// Create and Save a new Tournaments
exports.create = (req, res) => {
  let tournament = new Tournament(req.body);
  tournament.save()
    .then(() => {
      res.status(200).json({'Tournament': 'tournament has been successfully added'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
};

// Retrieve all Tournamentss from the database.
exports.findAll = (req, res) => {
  Tournament.find(function(err, tournaments){
    if(err){
      res.json(err);
    }
    else {
      res.json(tournaments);
    }
  });
};

// Find a single Tournaments with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  Tournament.findById(id, function (err, tournament){
      if(err) {
        res.json(err);
      }
      res.json(tournament);
  });
};

// Update a Tournaments by the id in the request
exports.update = (req, res) => {
  Tournament.findById(req.params.id, function(err, tournament) {
    if (!tournament){
      res.status(404).send("tournament is not found");
    }
    else {
        tournament = req.body;

        tournament.save().then(() => {
          res.json('Updated tournament');
      })
      .catch(() => {
            res.status(400).send("unable to update the tournament");
      });
    }
  });
};

// Delete a Tournaments with the specified id in the request
exports.delete = (req, res) => {
  Tournament.findByIdAndRemove({_id: req.params.id}, function(err){
    if(err) {
      res.json(err);
    }
    else {
      res.json('Tournament successfully removed');
    }
  });
};


// Delete all Tournamentss from the database.
exports.deleteAll = (req, res) => {
  res.status(501).send({
    message: "Delete all functionality not implemented"
  });
};