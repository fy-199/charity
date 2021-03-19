const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  company: {
    type: String,
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  password: {
    type: String /* require regex */,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },
  phone: {
    type: Number,
  },
  address: { type: Schema.Types.ObjectId },
  last_login: { type: Date, default: Date.now },
  last_ip: { type: String },
  is_active: { type: Boolean },
  role: { type: String, default: "User", ref: "RoleSchema" },
});
UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("user", UserSchema);
