const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    team_name: { type: String, required: true },
    placement: { type: Number, default: 0 },
    players: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    }],
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament"
    }
  }, {
    collection: 'teams'
  }
);

teamSchema.index({ team_name: 1, tournament: 1 }, { unique: true })

module.exports = mongoose.model("Team", teamSchema);