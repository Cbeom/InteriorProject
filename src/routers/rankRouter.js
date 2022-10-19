import express from "express";
import { getRank, getCreate } from "../controllers/rankController";
import { protectedMiddleware } from "../middleware";
const rankRouter = express.Router();

rankRouter.get("/", getRank);
// 생성
rankRouter
  .all(protectedMiddleware)
  .route("/:id([a-z\\d+]{24})/create")
  .get(getCreate);
// 수정
rankRouter.all(protectedMiddleware).route("/:id([a-z\\d+]{24})/edit");
// 삭제

export default rankRouter;
