const Player = require("../model/player");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
            jwt.sign(payload, process.env.SECRET, {
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
