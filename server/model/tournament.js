const mongoose = require("mongoose");

const tournamentSchema = mongoose.Schema(
  {
    datetime: { type: Date, required: true },
    players_per_team: { type: Number, required: true },
    price: { type: String, required: true },
    teams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }],
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
      required: true,
      enum: [
        'started',
        'upcoming',
        'ended',
      ]
    }
  }, {
    collection: 'tournaments'
  }
);

module.exports = mongoose.model("Tournament", tournamentSchema);