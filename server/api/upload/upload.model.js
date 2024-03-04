const mongoose = require("mongoose");
const { Schema } = mongoose;

const uploadSchema = new Schema({
  name: { type: String },
  parentName: { type: String },
  childrenNames: [String],
});

module.exports = mongoose.model("nodes", uploadSchema);
