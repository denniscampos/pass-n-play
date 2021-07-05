const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
});

LikeSchema.index(
  {
    userId: 1,
    postId: 1,
  },
  { unique: true }
);

module.exports = mongoose.model("Likes", LikeSchema);
