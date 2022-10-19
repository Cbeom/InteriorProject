import mongoose from "mongoose";

const installerSchema = new mongoose.Schema({
  paint: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paint" }], //그림
  resulturl: { type: String, trim: true, required: true }, //완성 url
  title: { type: String, required: true }, // 인테리어 이름
  meta: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 누가 작성했는지
  createAt: { type: Date, default: Date.now },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  // furniture: [{ type: mongoose.Schema.Types.ObjectId, ref: "Furniture" }], //가구
  // fplan: { type: Boolean, default: false }, //도면
});

const Installer = mongoose.model("Installer", installerSchema);

export default Installer;
