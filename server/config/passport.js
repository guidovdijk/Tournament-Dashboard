const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Player = require('../model/player');
require("dotenv").config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Player.findById(jwt_payload._id).then(player => {
        if (player) return done(null, player);
        return done(null, false);
      }).catch(err => console.log("test: " + err));
    })
  );
};