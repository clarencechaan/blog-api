const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: { type: String },
  text: { type: String },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

//Export model
module.exports = mongoose.model("Comment", CommentSchema);
