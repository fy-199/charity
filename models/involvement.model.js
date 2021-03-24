const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvolvementSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  is_delete: {
    type: Boolean,
  },
  is_active: {
    type: String,
  },
  type: {
    type: String,
  },
  media_id: { type: Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
});
InvolvementSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("involvement", InvolvementSchema);