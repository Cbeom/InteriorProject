import mongoose from "mongoose";

const rankSchema = new mongoose.Schema({
  installer: { type: mongoose.Schema.Types.ObjectId, ref: "Installer" },
  rank: { type: Number, default: 0 },
  imgUrl: { type: String, trim: true },
  description: { type: String, trim: true },
  createAt: { type: String, trim: true },
});

const Rank = mongoose.model("Rank", rankSchema);

export default Rank;
