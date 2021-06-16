const Player = require("../model/player");

// Create and Save a new players
exports.create = (req, res) => {
  let player = new Player(req.body);

  player.save(function(err){
    if(err){
      if (err.name === 'MongoError' && err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        res.status(400).send({ field, message: `${field} is already in use` });
      } else {
        res.status(400).send("Unable to save to database");
      }
    } else {
      res.status(200).json({'player': 'player has been successfully added'});
    }
  })

};

// Retrieve all players from the database.
exports.findAll = (req, res) => {
  Player.find(function(err, players){
    if(err){
      res.json(err);
    }
    else {
      res.json(players);
    }
  });
};

// Find a single players with an id
exports.findOne = (req, res) => {
  let id = req.params.id;
  Player.findById(id, function (err, player){
      if(err) {
        res.json(err);
      }
      res.json(player);
  });
};

// Find a single players with an id
exports.login = (req, res) => {
  let id = req.params.id;
  Player.findById(id, function (err, player){
      if(err) {
        res.json(err);
      }
      res.json(player);
  });
};

// Update a players by the id in the request
exports.update = (req, res) => {
  Player.findById(req.params.id, function(err, player) {
    if (!player){
      res.status(404).send("player is not found");
    }
    else {
        player = req.body;

        player.save().then(() => {
          res.json('Updated player');
      })
      .catch(() => {
            res.status(400).send("unable to update the player");
      });
    }
  });
};

// Delete a players with the specified id in the request
exports.delete = (req, res) => {
  Player.findByIdAndRemove({_id: req.params.id}, function(err){
    if(err) {
      res.json(err);
    }
    else {
      res.json('player successfully removed');
    }
  });
};


// Delete all playerss from the database.
exports.deleteAll = (req, res) => {
  res.status(501).send({
    message: "Delete all functionality not implemented"
  });
};