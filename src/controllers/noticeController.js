import Notice from "../models/Notice";

// notice home
export const notice = async (req, res) => {
  const notice = await Notice.find().sort({ "meta.views": "desc" });
  return res.render("notice/notice", { pageTitle: "Notice", notice }); //home.pug에 응답, notice를 보낸다.
};

//검색기능
export const search = async (req, res) => {
  const {
    query: { title },
  } = req;
  let notice = [];
  if (title) {
    notice = await Notice.find({
      title: {
        $regex: new RegExp(`${title}`, "i"),
      },
    });
  }
  return res.render("notice/search", { pageTitle: "Search Title", notice });
};

//Notice Router
export const getUpload = async (req, res) => {
  return res.render("notice/upload", { pageTitle: "Upload Notice" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, content },
    file,
  } = req;
  //이미지 파일을 업로드 할 경우
  if (file) {
    await Notice.create({
      title,
      description: content,
      image: file.path,
    });
  }
  //이미지 파일을 업로드 안할경우
  else {
    await Notice.create({
      title,
      description: content,
    });
  }
  return res.redirect("/notice");
};

export const see = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const notice = await Notice.findById(id);
    await Notice.findByIdAndUpdate(id, {
      meta: {
        views: notice.meta.views + 1,
      },
    });
    return res.render("notice/see", { pageTitle: `${notice.title}`, notice });
  } catch (error) {
    console.log(error);
  }
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const notice = await Notice.findById(id);
  return res.render("notice/edit", {
    pageTitle: `Edit : ${notice.title}`,
    notice,
  });
};

export const postEdit = async (req, res) => {
  const {
    body: { title, content },
    params: { id },
    file,
  } = req;
  const exists = await Notice.exists({ _id: id });
  if (!exists) {
    return res.redirect("/notice");
  }
  if (file) {
    await Notice.findByIdAndUpdate(
      id,
      {
        title,
        description: content,
        image: file.path,
      },
      { new: true }
    );
  } else {
    await Notice.findByIdAndUpdate(id, {
      title,
      description: content,
    });
  }
  return res.redirect("/notice");
};

export const deleteNotice = async (req, res) => {
  const {
    params: { id },
  } = req;
  await Notice.findByIdAndDelete(id);
  return res.redirect("/notice");
};

export const getReport = async (req, res) => {
  const {
    params: { id },
  } = req;
  const notice = await Notice.findById(id);
  return res.render("notice/report", { pageTitle: `Report Notice`, notice });
};

//신고기능 보완 필요
export const postReport = async (req, res) => {
  const {
    params: { id },
    body: { rtitle, rcontent },
  } = req;
  const notice = await Notice.findById(id);
  await Notice.findByIdAndUpdate(
    id,
    {
      rtitle,
      rcontent,
      report: {
        rcount: notice.report.rcount + 1,
      },
    },
    { new: true }
  );
  if (notice.report.rcount > 0) {
    await Notice.findByIdAndDelete(id);
    return res.redirect("/notice");
  }
  return res.redirect("/notice");
};

//댓글기능
export const getComment = async (req, res) => {
  const {
    params: { id },
  } = req;
  const notice = await Notice.findById(id);
  return res.render("notice/see", { pageTitle: `see Notice`, notice });
};

export const postComment = async (req, res) => {
  const {
    params: { id },
    body: { childid, childcomment, parentid, parentcomment },
  } = req;
  const notice = await Notice.findById(id);
  await Notice.findByIdAndUpdate(
    id,
    {
      parentid,
      parentcomment,
      childid,
      childcomment,
    },
    { new: true }
  );
  console.log(parentid, childid);
  return res.render("notice/see", { pageTitle: `see Notice`, notice });
};

//페이징 기법
export const postNoticeTotal = async (req, res) => {
  const {
    body: { baseCount },
  } = req;
  const notice = await Notice.find({});
  const count = notice.length / baseCount;
  if (!count) {
    return res.sendStatus(404);
  }
  return res.status(301).json(count);
};

export const postPageNotice = async (req, res) => {
  const {
    body: { target, baseCount },
  } = req;
  const notice = await Notice.find({}).sort({ "meta.views": "desc" });
  const firstScope = Number(target) - 1;
  const endScope = Number(target) + 1;
  let targetNotice;
  switch (target) {
    case "1":
      targetNotice = notice.splice(firstScope, firstScope + baseCount);
      break;
    default:
      targetNotice = notice.splice(endScope, endScope + baseCount);
      break;
  }
  if (!targetNotice) {
    targetNotice = null;
    return res.sendStatus(404);
  }
  return res.status(301).json({ targetNotice });
};
