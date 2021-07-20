const mongoose = require("mongoose");
const date = new Date();

const GameSchema = new mongoose.Schema(
  {
    gameTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
