const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { collection: "posts", timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
