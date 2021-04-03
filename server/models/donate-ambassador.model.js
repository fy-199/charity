const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AmbassadorSchema = new Schema({
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
  reason_to_join: {
    type: String,
  },
  interest_area: {
    type: String,
  },
  comments: {
    type: String,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
});
AmbassadorSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("ambassador", AmbassadorSchema);
