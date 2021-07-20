const mongoose = require("mongoose");
const date = new Date();

const CommentSchema = new mongoose.Schema(
  {
    game: { type: String, required: true },
    user: { ref: "user", type: mongoose.Types.ObjectId, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
