const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  // title: {
  //   type: String,
  //   required: true,
  // },
  postMessage: {
    type: String,
    required: true,
  },
  // likes: {
  //   type: Number,
  //   required: true,
  // },
  user: {
    // changed userName back to user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
