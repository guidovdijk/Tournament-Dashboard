const Player = require("../model/player");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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
  Player.findOne({email: req.body.email})
    .then(player => {
      if (!player) {
        return res.status(404).json({
            msg: "Player not found.",
            success: false
        });
      }

       // If there is user we are now going to compare the password
       bcrypt.compare(req.body.password, player.password).then(isMatch => {
        if (isMatch) {
            // player's password is correct and we need to send the JSON Token for that player
            const payload = {
                _id: player._id,
                name: player.name,
                email: player.email
            }
            jwt.sign(payload, 'secretcurrykey', {
                expiresIn: 604800
            }, (err, token) => {
                res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    player: player,
                    msg: "You are now logged in."
                });
            })
        } else {
            return res.status(404).json({
                msg: "Incorrect password.",
                success: false
            });
        }
    })
    })
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