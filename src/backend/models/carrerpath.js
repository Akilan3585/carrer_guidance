const mongoose = require("mongoose");

const CareerPathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
});

module.exports = mongoose.model("CareerPath", CareerPathSchema);
