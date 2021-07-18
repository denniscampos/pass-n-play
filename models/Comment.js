const mongoose = require("mongoose");
const date = new Date();

const CommentSchema = new mongoose.Schema(
  {
    parent: { refPath: "model", type: mongoose.Types.ObjectId, required: true },
    user: { ref: "user", type: mongoose.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    model: { type: String, required: true, enum: ["comment", "post"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
