const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  reviewId: {
    type: mongoose.Types.ObjectId,
    ref: "Comments",
  },
});

LikeSchema.index(
  {
    user: 1,
    reviewId: 1,
  },
  { unique: true }
);

module.exports = mongoose.model("Likes", LikeSchema);
