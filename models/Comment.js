const mongoose = require("mongoose");
const date = new Date();

const CommentSchema = new mongoose.Schema(
  {
    game: { type: String, required: true },
    game_title: { type: String, required: true },
    userName: { type: String, required: true },
    user: { ref: "User", type: mongoose.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
