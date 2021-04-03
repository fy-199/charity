const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GiftcardSchema = new Schema({
  type_of_card: {
    type: String,
  },
  card_number: {
    type: String,
  },
  security_code: {
    type: String,
  },
  amount: {
    type: String,
  },
  expriration_date: {
    type: String,
  },
  post_code: {
    type: String,
  },
  add_info: {
    type: String,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
});
GiftcardSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("giftcard", GiftcardSchema);
