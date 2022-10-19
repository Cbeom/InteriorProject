import bcrypt from "bcrypt";
import fetch from "node-fetch";
import User from "../models/User";
import Installer from "../models/Installer";

const ErrorStatusCode = 400;
const ErrorStatusCode2 = 404;
const ConfirmStatusCode = 201;

export const home = async (req, res) => {
  const installer = await Installer.find().populate("owner");
  return res.render("home", { pageTitle: "Home", installer });
};

export const getJoin = (req, res) => {
  return res.render("user/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { id, password, password1, email, username },
  } = req;
  const pageTitle = "Join";
  const joinPath = "user/join";
  //   password 확인
  if (password !== password1) {
    return res
      .status(ErrorStatusCode)
      .render(joinPath, { pageTitle, errorMessage: "Disaccord your password" });
  }
  // 중복확인
  const exists = await User.exists({ $or: [{ id }, { email }] });
  if (exists) {
    return res.status(ErrorStatusCode).render(joinPath, {
      pageTitle,
      errorMessage: "id or email already account",
    });
  }
  try {
    //   user 생성
    await User.create({
      id,
      password,
      email,
      username,
    });
    return res.status(ConfirmStatusCode).redirect("/login");
  } catch (error) {
    // 에러메세지 표현
    return res
      .status(ErrorStatusCode2)
      .render("404", { pageTitle: `${error._message}` });
  }
};

export const getLogin = (req, res) => {
  return res.render("user/login", { pageTitle: "login" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "login";
  const loginPath = "user/login";
  const {
    body: { id, password },
  } = req;
  try {
    //db에 user가 있는지 확인
    const user = await User.findOne({ $and: [{ id }, { socialOnly: false }] });
    if (!user) {
      return res
        .status(ErrorStatusCode)
        .render(loginPath, { pageTitle, errorMessage: alert('"Confirm id"') });
    }
    //암호화된 비밀번호 확인
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res
        .status(ErrorStatusCode)
        .render(loginPath, { pageTitle, errorMessage: alert('Confirm password') });
    }
    // session에 추가
    req.session.loggedIn = true;
    req.session.user = user;
    return res.status(ConfirmStatusCode).redirect("/");
  } catch (error) {
    return res
      .status(ErrorStatusCode2)
      .render("404", {  pageTitle: `${error._message}` });
  }
};

export const GithubStartLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_PUBLIC,
    scope: "read:user user:email",
    allow_signup: false,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const GithubFinishLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_PUBLIC,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const json = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in json) {
    const { access_token } = json;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.status(ErrorStatusCode).render("user/login", {
        pageTitle: "Login",
        errorMessage: "email not found",
      });
    }
    let user = await User.findOne({
      $or: [{ email: emailObj.email }, { id: userData.login }],
    });
    if (!user) {
      user = await User.create({
        id: userData.login,
        email: emailObj.email,
        username: userData.name === null ? "undefined" : userData.name,
        password: "",
        socialOnly: true,
        avatarUrl: userData.avatar_url,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    // 메세지 추가
    return res.status(ErrorStatusCode).render("user/login", {
      pageTitle: "Login",
      errorMessage: "Fail Access Github",
    });
  }
};

export const KakaoStartLogin = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.KAKAO_KEY,
    redirect_uri: process.env.REDIRECT_URL,
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const KakaoFinishLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_KEY,
    redirect_uri: process.env.REDIRECT_URL,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const json = await (
    await fetch(finalUrl, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();
  if ("access_token" in json) {
    const { access_token } = json;
    const apiUrl = "https://kapi.kakao.com/v2/user/me";
    const userData = await (
      await fetch(apiUrl, {
        headers: {
          Authorization: ` Bearer ${access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
    ).json();
    if (!("properties" in userData && "kakao_account" in userData)) {
      return res.redirect("/login");
    }
    const {
      kakao_account: {
        profile: { nickname, thumbnail_image_url },
        email,
      },
    } = userData;
    let user = await User.findOne({ $or: [{ username: nickname }, { email }] });
    if (!user) {
      user = await User.create({
        // kakao는 아이디 형식이 이메일(require빼고 삽입가능)
        id: email,
        password: "",
        socialOnly: true,
        username: nickname,
        email,
        avatarUrl: thumbnail_image_url,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    // errorMessage
    return res.status(ErrorStatusCode).render("user/login", {
      pageTitle: "Login",
      errorMessage: "Fail Access Kakao",
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const see = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("Installer");
    if (!user) {
      return res.redirect("/");
    }
    console.log(user);
    return res.render("user/see", { pageTitle: `${user.username}`, user });
  } catch (error) {
    return res
      .status(ErrorStatusCode)
      .render("404", { pageTitle: `${error._message}` });
  }
};

export const getEdit = (req, res) => {
  const {
    session: { user },
  } = req;
  return res.render("user/edit", { pageTitle: `${user.username} Edit Page` });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl, id: beforeId, username: beforeUsername },
    },
    body: { id, email, username },
    file,
  } = req;
  const pagePath = "user/edit";
  const pageTitle = `${beforeUsername} Edit Page`;
  // 중복확인
  if (beforeId === id || beforeUsername === username) {
    return res
      .status(ErrorStatusCode)
      .render(pagePath, { pageTitle, errorMessage: `Already account` });
  }
  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists) {
    return res
      .status(ErrorStatusCode)
      .render(pagePath, { pageTitle, errorMessage: `Already account` });
  }
  const updateUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      id,
      email,
      username,
    },
    { new: true }
  );
  req.session.user = updateUser;
  return res.redirect("/user/edit");
};

export const getChangePassword = async (req, res) => {
  const {
    session: { user },
  } = req;
  if (!user.socialOnly) {
    return res.render("user/change-password", { pageTitle: `Change Password` });
  }
  return res.redirect("/");
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, confirmPassword },
  } = req;
  const user = await User.findById(_id);
  const pagePath = "user/change-password";
  const pageTitle = `${user.username} Change Password`;
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res
      .status(ErrorStatusCode)
      .render(pagePath, { pageTitle, errorMessage: "Not Account" });
  }
  if (newPassword !== confirmPassword) {
    return res
      .status(ErrorStatusCode)
      .render(pagePath, { pageTitle, errorMessage: "Confirm New Password" });
  }
  user.password = newPassword;
  await user.save();
  return res.status(ConfirmStatusCode).redirect("/user/edit");
};
