const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    team_name: { type: String, unique: true },
    placement: Number,
    players: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    }],
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament"
    }
  }
);

module.exports = mongoose.model("Team", teamSchema);