const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  published: { type: Boolean, required: true },
  publish_date: { type: Date },
  img_url: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Post", PostSchema);
