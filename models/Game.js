const mongoose = require("mongoose");
const date = new Date();
const _ = require("lodash");

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

// GameSchema.index(
//   { user: 1, "gameList.game": 1 },
//   { unique: true, sparse: true }
// );

// GameSchema.index(
//   {
//     "gameList.game": 1,
//   },
//   {
//     sparse: true,
//   }
// );

// GameSchema.pre("save", (next) => {
//   console.log(`@#@#@#@#@#@#`, this);
//   this.gameList = _.uniq(this.gameList);
//   next();
// });

module.exports = mongoose.model("Game", GameSchema);
