const mongoose = require("mongoose");

const playerSchema = mongoose.Schema(
  {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    wins: Number,
    losses: Number,
    points: Number,
    profile_picture: String,
    teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    }]
  }
);

module.exports = mongoose.model("Player", playerSchema);