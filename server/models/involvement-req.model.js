const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvolvementReqSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId },
  involvement_id: { type: mongoose.Schema.Types.ObjectId },
  is_active: {
    type: String,
  },
  is_delete: {
    type: Boolean,
  },
  updated_at: { type: Date, default: Date.now },
  updated_user_id: { type: mongoose.Schema.Types.ObjectId }, //admin
});
InvolvementReqSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("involvementReq", InvolvementReqSchema);
