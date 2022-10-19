import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import { localsMiddlware } from "./middleware";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import installerRouter from "./routers/installerRouter";
import noticeRouter from "./routers/noticeRouter";
import apiRouter from "./routers/apiRouter";
import rankRouter from "./routers/rankRouter";
import mapRouter from "./routers/mapRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.use(
  session({
    secret: process.env.SESSION_TXT,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("asset"));
app.use(localsMiddlware);
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/notice", noticeRouter);
app.use("/installer", installerRouter);
app.use("/api", apiRouter);
app.use("/rank", rankRouter);
app.use("/map", mapRouter);

export default app;
