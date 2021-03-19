const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  firstname: {
    type: String,
    minlength: [
      2,
      "The field `{PATH}` must be greater than {MINLENGTH} characters",
    ],
    maxlength: [
      30,
      "The Field `{PATH}` must be less than {MAXLENGTH} characters",
    ],
    required: true,
  },
  lastname: {
    type: String,
    minlength: [
      2,
      "The field `{PATH}` must be greater than {MINLENGTH} characters",
    ],
    maxlength: [
      30,
      "The Field `{PATH}` must be less than {MAXLENGTH} characters",
    ],
    required: true,
  },
  // email: {
  //   type: String,
  //   lowercase: true,
  //   required: [true, "can't be blank"],
  //   match: [/\S+@\S+\.\S+/, "is invalid"],
  // },
  amount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  donate_type: {
    type: String,
  },
  payment_method: {
    type: String,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});
DonationSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("donation", DonationSchema);
