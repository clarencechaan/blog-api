const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  body: { type: String },
  published: { type: Boolean },
  publish_date: { type: Date },
});

//Export model
module.exports = mongoose.model("Post", PostSchema);
