import express from "express";
import {
  installersearch,
  getInterior,
  getInteriorCreate,
  getSeeInstaller,
  deleteInstaller,
} from "../controllers/installerController";
import { protectedMiddleware } from "../middleware";

const installerRouter = express.Router();

installerRouter.get("/search", installersearch);

installerRouter.get("/", protectedMiddleware, getInterior);

installerRouter
  .route("/create")
  .all(protectedMiddleware)
  .get(getInteriorCreate);

installerRouter
  .route("/:id([a-z\\d+]{24})/edit")
  .all(protectedMiddleware)
  .get(getInteriorCreate);

installerRouter.get("/:id([a-z\\d+]{24})", getSeeInstaller);
installerRouter.get("/delete-installer", protectedMiddleware, deleteInstaller);

export default installerRouter;
