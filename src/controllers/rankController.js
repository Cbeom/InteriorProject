import User from "../models/User";

export const getRank = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const rankUser = await User.findById(_id).populate("Installer");
  if (!rankUser) {
    return res.render("rank/rank", { pageTitle: "Ranking" });
  }
  return res.render("rank/rank", {
    pageTitle: "Ranking",
    userInstaller: rankUser.Installer,
  });
};

// rank 생성
export const getCreate = async (req, res) => {};
