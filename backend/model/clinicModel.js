const { Schema, model } = require("mongoose");

const clinicSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum : ['clinic A','clinic B','clinic C']
  },
  location: {
    type: String,
    required: true,
  },
  receptionist: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = model("Clinic", clinicSchema);
