const mongoose = require("mongoose");

const { Schema } = mongoose;
const commentSchema = new Schema({
  commentId: {
    type: Number,
    required: true,
    unique: true,
  },
  postId: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },

  // date: {
  //   type: String,
  //   required: true
  // }
});

module.exports = mongoose.model("comment", commentSchema);