const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const User = new Schema({
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
  last_login: { type: Date, default: Date.now },
  last_ip: { type: String },
  is_active: { type: Boolean },
  is_deleted: { type: Boolean },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});
User.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model("user", User);
