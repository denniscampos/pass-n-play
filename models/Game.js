const mongoose = require("mongoose");
const date = new Date();

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
          unique: true,
        },
        title: {
          type: String,
          unique: true,
        },
        image: {
          type: String,
          unique: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", GameSchema);
