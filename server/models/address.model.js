const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  address_name: {
    type: String,
  },
  address_title: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  post_code: {
    type: String,
  },
  address_1: {
    type: String,
  },
  address_2: {
    type: String,
  },
  updated_at: { type: Date, default: Date.now },
  user_id: { type: Schema.Types.ObjectId },
});
AddressSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("address", AddressSchema);
