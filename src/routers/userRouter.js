import express from "express";
import {
  GithubStartLogin,
  GithubFinishLogin,
  KakaoStartLogin,
  KakaoFinishLogin,
  see,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userControllers";
import {
  avatarUpload,
  protectedMiddleware,
  publicMiddleware,
} from "../middleware";
const userRouter = express.Router();

// social login
userRouter.get("/github/start", publicMiddleware, GithubStartLogin);
userRouter.get("/github/finish", GithubFinishLogin);
userRouter.get("/kakao/start", publicMiddleware, KakaoStartLogin);
userRouter.get("/kakao/finish", KakaoFinishLogin);
// see profile
userRouter.get("/:id([a-z\\d+]{24})", see);
// edit page
userRouter
  .route("/edit")
  .all(protectedMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectedMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
