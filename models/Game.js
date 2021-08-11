const mongoose = require("mongoose");
const date = new Date();

const GameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    gameList: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
