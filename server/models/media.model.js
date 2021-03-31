const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  media_url: {
    type: String,
  },
  title: {
    type: String,
  },
  is_deleted: {
    type: Boolean,
  },
  media_type: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
});
MediaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("media", MediaSchema);
