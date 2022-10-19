import express from "express";

import {
    kmap,
} from "../controllers/mapController";

const mapRouter = express.Router();

mapRouter.route("/map").get(kmap);

export default mapRouter;