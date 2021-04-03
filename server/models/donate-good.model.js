const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoodSchema = new Schema({
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
  type_of_goods: {
    type: String,
  },
  number_of_pieces: {
    type: String,
  },
  address: {
    type: String,
  },
  post_code: {
    type: String,
  },
  instructions_for_the_driver: {
    type: String,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
});
GoodSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("good", GoodSchema);
