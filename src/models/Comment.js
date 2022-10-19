import mongoose from "mongoose";

// installer,comment 둘중에 하나 구분 필요

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  createAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  installer: { type: mongoose.Schema.Types.ObjectId, ref: "Installer" },
  notice: { type: mongoose.Schema.Types.ObjectId, ref: "Notice" },
  meta: {
    like: { type: Number, default: 0 },
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
