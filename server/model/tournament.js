const mongoose = require("mongoose");
const teamSchema = require("./team.js");

const tournamentSchema = mongoose.Schema(
  {
    datetime: { type: Date, required: true },
    players_per_team: { type: Number, required: true },
    min_teams: { type: Number, required: true },
    max_teams: { type: Number, required: true },
    price: { type: String, required: true },
    ended: { type: Boolean, default: false },
    game_type: {
      type: String,
      required: true,
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
      ],
    },
    teams: [teamSchema],
  }, {
    collection: 'tournaments'
  }
);

module.exports = mongoose.model("Tournament", tournamentSchema);