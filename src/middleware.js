import multer from "multer";

export const localsMiddlware = (req, res, next) => {
  res.locals.siteName = "Installer";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};

export const protectedMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const publicMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatar",
  limits: { fileSize: 30000000 },
});

export const noticeUpload = multer({
  dest: "uploads/notice",
});
