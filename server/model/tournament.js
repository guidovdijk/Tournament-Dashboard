const mongoose = require("mongoose");

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
    }
  }, {
    collection: 'tournaments'
  }
);

tournamentSchema.virtual('teams', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'tournament'
});

tournamentSchema.set('toObject', { virtuals: true });
tournamentSchema.set('toJSON', { virtuals: true });

tournamentSchema.pre('remove', function(callback) {
  // Remove all the docs that refers
  this.model('Team').remove({ tournament: this._id }, callback);
});

module.exports = mongoose.model("Tournament", tournamentSchema);