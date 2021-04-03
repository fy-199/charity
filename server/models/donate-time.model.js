const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  based_in: {
    type: String,
  },
  interested_in: {
    type: String,
  },
  comments: {
    type: String,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
});
TimeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("time", TimeSchema);
