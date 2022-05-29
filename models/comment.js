const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  timestamp: { type: Date, require: true },
});

//Export model
module.exports = mongoose.model("Comment", CommentSchema);
