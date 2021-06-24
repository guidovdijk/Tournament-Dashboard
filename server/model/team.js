const mongoose = require("mongoose");

// TODO: Make team_name unique in document, but ignore others in the collection with the same name
const teamSchema = mongoose.Schema(
  {
    team_name: { type: String, required: true },
    placement: { type: Number, default: 0 },
    players: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    }],
  }
);

module.exports = mongoose.model("Team", teamSchema);
module.exports = teamSchema;