import express from "express";
import {
  home,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userControllers";
import { notice } from "../controllers/noticeController";
import { publicMiddleware } from "../middleware";
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/notice", notice);
rootRouter.route("/join").all(publicMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/logout", logout);

export default rootRouter;
