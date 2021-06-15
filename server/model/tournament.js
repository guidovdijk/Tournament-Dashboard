const mongoose = require("mongoose");

const tournamentSchema = mongoose.Schema(
  {
    datetime: { type: Date },
    players_per_team: Number,
    price: String,
    teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }],
    game_type: {
      type: String,
      enum: [
        'aram_draft',
        'aram_blind',
        'summonersrift_draft',
        'summonersrift_blind',
      ]
    },
    status: {
      type: String,
      enum: [
        'started',
        'upcoming',
        'ended',
      ]
    }
  }
);

module.exports = mongoose.model("Tournament", tournamentSchema);