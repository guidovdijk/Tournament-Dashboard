const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const playerSchema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    profile_picture: String,
    role: {
      type: String,
      default: "user",
      enum: [
        "user",
        "admin"
      ]
    },
    teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    }]
  }, {
    collection: 'players'
  }
);

playerSchema.pre('save', function(next) {
  var player = this;

  // only hash the password if it has been modified (or is new)
  if (!player.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(player.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          player.password = hash;
          next();
      });
  });
});

playerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
   
module.exports = mongoose.model("player", playerSchema);