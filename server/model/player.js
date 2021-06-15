const mongoose = require("mongoose");

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

module.exports = mongoose.model("Player", playerSchema);