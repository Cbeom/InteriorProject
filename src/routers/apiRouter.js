import express from "express";
import {
  postCreateInterior,
  patchRegisterView,
  postMakeComment,
  deleteComment,
  pathEditComment,
  pathRegisterLike,
  postFilterRank,
} from "../controllers/installerController";

import {
  postNoticeTotal,
  postPageNotice,
} from "../controllers/noticeController";
const apiRouter = express.Router();

apiRouter.post("/installer/:id([a-z\\d+]{24})/save", postCreateInterior);
apiRouter.patch("/installer/:id([a-z\\d+]{24})/view", patchRegisterView);
apiRouter.patch("/installer/:id([a-z\\d+]{24})/like", pathRegisterLike);
apiRouter.patch("/installer/:id([a-z\\d+]{24})/comment", pathEditComment);
apiRouter.post("/installer/:id([a-z\\d+]{24})/comment", postMakeComment);
apiRouter.delete("/installer/:id([a-z\\d+]{24})/comment", deleteComment);

apiRouter.post("/notice/count", postNoticeTotal);
apiRouter.post("/notice/page", postPageNotice);

apiRouter.post("/installer/rank/filter", postFilterRank);

export default apiRouter;
