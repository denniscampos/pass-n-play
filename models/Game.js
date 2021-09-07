const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    gameList: [
      {
        game: {
          type: String,
        },
        title: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
