const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscribersSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  created_at: { type: Date, default: Date.now },
});
SubscribersSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("subscriber", SubscribersSchema);
