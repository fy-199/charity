const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaypalSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  message: {
    type: String,
  },
  created_at: { type: Date, default: Date.now },
});
PaypalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("paypal", PaypalSchema);
