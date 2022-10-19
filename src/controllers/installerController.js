import Installer from "../models/Installer";
import User from "../models/User";
import Comment from "../models/Comment";
import { SubShape, ImgShape, backUpdatePaint } from "../models/PaintClass";
import Paint from "../models/Paint";

const ErrorStatusCode = 404;
const ErrorStatusCode1 = 400;
const CorrectStatusCode = 201;

//search
export const installersearch = async (req, res) => {
  const {
    query: { title },
  } = req;
  let installer = [];
  if (title) {
    installer = await Installer.find({
      title: {
        $regex: new RegExp(`${title}`, "i"),
      },
    });
  }
  return res.render("installer/search", {
    pageTitle: "Search Title",
    installer,
  });
};

export const getInterior = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const exists = await User.findById(_id);
  if (!exists) {
    return res.status(ErrorStatusCode1).redirect("/");
  }
  return res.render("installer/choose", { pageTitle: "Choose option" });
};

export const getSeeInstaller = async (req, res) => {
  const {
    params: { id },
  } = req;
  const installer = await Installer.findById(id)
    .populate("owner")
    .populate("comment");
  if (!installer) {
    return res.status(ErrorStatusCode).redirect("/");
  }
  return res
    .status(CorrectStatusCode)
    .render("installer/see", { pageTitle: `${installer.title}`, installer });
};

export const getInteriorCreate = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id },
  } = req;
  const user = await User.findById(_id).populate("Installer");
  if (!user) {
    return res.status(ErrorStatusCode1).redirect("/");
  }
  if (id) {
    const findInstaller = user.Installer.find(
      (el) => String(el._id) === String(id)
    );
    // 중복확인
    // 새로생성하고 싶을떄는 새로 생성(에러)
    if (!findInstaller) {
      return res.render("installer/create", { pageTitle: "Error message" });
    }
    const exists = await Installer.exists({ _id: findInstaller._id });
    if (exists) {
      const paints = await Installer.findById({
        _id: findInstaller._id,
      }).populate("paint");
      return res.render("installer/create", {
        pageTitle: `${findInstaller.title} Interior`,
        findInstaller,
        paints: paints.paint,
      });
    }
  }
  return res.render("installer/create", { pageTitle: "Create Interior" });
};

export const postCreateInterior = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: {
      title,
      imageUrl,
      arFloor,
      arSquare,
      arStraight,
      arCircle,
      arImg,
      updatePaint,
    },
    params: { id },
  } = req;
  const user = await User.findById(_id).populate("Installer");
  const existsTitle = await Installer.exists({ title });
  if (!user || existsTitle) {
    return res.sendStatus(ErrorStatusCode);
  }
  // 중복확인
  const findInstaller = user.Installer.find(
    (el) => String(el._id) === String(id)
  );
  // 이미 중복되어 있을떄 수정
  if (findInstaller) {
    const updateInstaller = await Installer.findByIdAndUpdate(
      findInstaller._id,
      {
        owner: _id,
        title,
        resulturl: imageUrl,
      },
      { new: true }
    );
    // 기존에 있는 가구 업데이트

    updatePaint.square.forEach(async (el) => {
      const square = new backUpdatePaint(
        el.id,
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        el.color,
        el.border,
        el.name
      );
      await square.updatePaint(updateInstaller._id, square.id, square);
    });
    updatePaint.img.forEach(async (el) => {
      const img = new backUpdatePaint(
        el.id,
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        el.color,
        el.border,
        el.name
      );
      await img.updatePaint(updateInstaller._id, img.id, img);
    });
    updatePaint.circle.forEach(async (el) => {
      const circle = new backUpdatePaint(
        el.id,
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        el.color,
        el.border,
        el.name
      );
      await circle.updatePaint(updateInstaller._id, circle.id, circle);
    });
    updatePaint.straight.forEach(async (el) => {
      const straight = new backUpdatePaint(
        el.id,
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        el.color,
        el.border,
        el.name
      );
      await straight.updatePaint(updateInstaller._id, straight.id, straight);
    });
    updatePaint.floor.forEach(async (el) => {
      const floor = new backUpdatePaint(
        el.id,
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        el.color,
        el.border,
        el.name
      );
      await floor.updatePaint(updateInstaller._id, floor.id, floor);
    });

    // 기존에 업데이트 말고 새로 생기는거

    arCircle.forEach(async (el) => {
      const circle = new SubShape(
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        (el.name = el.property),
        el.border,
        el.color
      );
      const paint = await circle.paintSave(updateInstaller, circle);
      updateInstaller.paint.push(paint);
    });
    await updateInstaller.save();
    arSquare.forEach(async (el) => {
      const square = new SubShape(
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        (el.name = el.property),
        el.border,
        el.color
      );
      const paint = await square.paintSave(updateInstaller, square);
      updateInstaller.paint.push(paint);
    });
    await updateInstaller.save();

    arStraight.forEach(async (el) => {
      const straight = new SubShape(
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        (el.name = el.property),
        el.border,
        el.color
      );
      const paint = await straight.paintSave(updateInstaller, straight);
      updateInstaller.paint.push(paint);
    });
    await updateInstaller.save();

    arFloor.forEach(async (el) => {
      const floor = new SubShape(
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        (el.name = el.property),
        el.border,
        el.color
      );
      const paint = await floor.paintSave(updateInstaller, floor);
      updateInstaller.paint.push(paint);
    });
    await updateInstaller.save();

    arImg.forEach(async (el) => {
      const img = new ImgShape(
        el.sx,
        el.sy,
        el.ex,
        el.ey,
        (el.name = el.property),
        el.img
      );
      const paint = await img.paintSave(updateInstaller, img);
      updateInstaller.paint.push(paint);
    });
    await updateInstaller.save();

    return res.sendStatus(CorrectStatusCode);
  }

  const installer = await Installer.create({
    owner: _id,
    title,
    resulturl: imageUrl,
  });

  arCircle.forEach(async (el) => {
    const circle = new SubShape(
      el.sx,
      el.sy,
      el.ex,
      el.ey,
      (el.name = el.property),
      el.border,
      el.color
    );
    const paint = await circle.paintSave(installer, circle);
    installer.paint.push(paint);
  });
  await installer.save();
  arSquare.forEach(async (el) => {
    const square = new SubShape(
      el.sx,
      el.sy,
      el.ex,
      el.ey,
      (el.name = el.property),
      el.border,
      el.color
    );
    const paint = await square.paintSave(installer, square);
    installer.paint.push(paint);
  });
  await installer.save();

  arStraight.forEach(async (el) => {
    const straight = new SubShape(
      el.sx,
      el.sy,
      el.ex,
      el.ey,
      (el.name = el.property),
      el.border,
      el.color
    );
    const paint = await straight.paintSave(installer, straight);
    installer.paint.push(paint);
  });
  await installer.save();

  arFloor.forEach(async (el) => {
    const floor = new SubShape(
      el.sx,
      el.sy,
      el.ex,
      el.ey,
      (el.name = el.property),
      el.border,
      el.color
    );
    const paint = await floor.paintSave(installer, floor);
    installer.paint.push(paint);
  });
  await installer.save();

  arImg.forEach(async (el) => {
    const img = new ImgShape(
      el.sx,
      el.sy,
      el.ex,
      el.ey,
      (el.name = el.property),
      el.img
    );
    const paint = await img.paintSave(installer, img);
    installer.paint.push(paint);
  });
  await installer.save();

  user.Installer.push(installer);
  await user.save();
  return res.sendStatus(CorrectStatusCode);
};

export const deleteInstaller = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const user = await User.findById(_id).populate("Installer");
  if (!user) {
    return res
      .status(ErrorStatusCode)
      .redirect("/installer/:id([a-z\\d+]{24})");
  }
  const findInstaller = user.Installer.find(
    (el) => String(el.owner._id) === String(_id)
  );
  const installer = await Installer.findById(findInstaller._id).populate(
    "paint"
  );
  installer.paint
    .filter((el) => String(el.owner._id) === String(installer._id))
    .forEach(async (el) => {
      await Paint.findByIdAndDelete(el._id);
    });
  const index = user.Installer.indexOf(findInstaller);
  user.Installer.splice(index, 1);
  await Installer.findByIdAndDelete(findInstaller._id);
  return res.redirect("/");
};

export const patchRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  const installer = await Installer.findById(id);
  if (!installer) {
    return res.sendStatus(ErrorStatusCode);
  }
  installer.meta.view += 1;
  await installer.save();
  return res.sendStatus(CorrectStatusCode);
};

export const postMakeComment = async (req, res) => {
  const {
    params: { id },
    session: { user },
    body: { text },
  } = req;
  const interior = await Installer.findById(id);
  if (!interior || !user) {
    return res.sendStatus(ErrorStatusCode);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    installer: interior._id,
  });
  interior.comment.push(comment);
  await interior.save();
  return res
    .status(CorrectStatusCode)
    .json({ newCommentId: comment._id, text });
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
    session: { user },
  } = req;
  const comment = await Comment.findById(id).populate("installer");
  if (!comment && String(comment.owner._id) !== String(user._id)) {
    return res.sendStatus(ErrorStatusCode);
  }
  const interior = await Installer.findById(comment.installer._id);
  const index = interior.comment.indexOf(comment._id);
  interior.comment.splice(index, 1);
  await interior.save();
  await Comment.findByIdAndDelete(id);
  return res.sendStatus(CorrectStatusCode);
};

export const pathEditComment = async (req, res) => {
  const {
    session: { user },
    params: { id },
    body: { text },
  } = req;
  const comment = await Comment.findById(id).populate("owner");
  if (!comment || String(comment.owner._id) !== String(user._id)) {
    return res.sendStatus(ErrorStatusCode);
  }
  await Comment.findByIdAndUpdate(id, {
    text,
    owner: user._id,
    installer: comment.installer._id,
  });
  return res
    .status(CorrectStatusCode)
    .json({ editCommentId: comment._id, text });
};

export const pathRegisterLike = async (req, res) => {
  const {
    session: { user },
    params: { id },
    body: { userId, clicked },
  } = req;
  const installer = await Installer.findById(id);
  if (String(user._id) !== String(userId) || !installer) {
    return res.sendStatus(ErrorStatusCode);
  }
  if (clicked) {
    installer.meta.like -= 1;
    await installer.save();
    return res.sendStatus(ErrorStatusCode);
  }
  installer.meta.like += 1;
  await installer.save();
  return res.sendStatus(CorrectStatusCode);
};

export const postFilterRank = async (req, res) => {
  const {
    body: { value },
  } = req;
  let rank;
  switch (value) {
    case "view":
      rank = await Installer.find().sort({ "meta.views": "desc" });
      break;
    case "like":
      rank = await Installer.find().sort({ "meta.like": "desc" });
      break;
    case "date":
      rank = await Installer.find().sort({ createAt: "desc" });
      break;
  }
  if (rank) {
    return res.status(301).json({ rank });
  } else {
    return res.sendStatus(404);
  }
};
