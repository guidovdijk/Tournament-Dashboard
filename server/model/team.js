const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    team_name: { type: String, required: true, unique: true },
    placement: { type: Number, default: 0 },
    players: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    }],
  }, {
    collection: 'teams'
  }
);

module.exports = mongoose.model("Team", teamSchema);
module.exports = teamSchema;