import mongoose from "mongoose";

const paintSchema = new mongoose.Schema({
  name: { type: String },
  img: { type: String },
  sxPos: { type: Number, default: 0 },
  syPos: { type: Number, default: 0 },
  exPos: { type: Number, default: 0 },
  eyPos: { type: Number, default: 0 },
  color: { type: String },
  border: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Installer",
  },
});

const Paint = mongoose.model("Paint", paintSchema);

export default Paint;
