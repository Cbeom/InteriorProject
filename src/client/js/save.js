import { arFloor, arSquare, arStraight, arCircle, arImg } from "./installer";
import { square, img, circle, straight, floor } from "./paint.js";
const main = document.querySelector("main");
const canvas = document.querySelector("#canvas");
const saveForm = document.querySelector(".save__container");
const saveBtn = document.querySelector(".save_btn");
const installerContainer = document.querySelector(".section1");

const ACTIVE_CLASS = "active";
let id, imageUrl;

function errorMessage() {
  installerContainer.innerText = `interior error`;
}

function redirectHome() {
  const home = document.querySelector(".base_home button");
  home.click();
}

async function handleSubmit() {
  const title = document.querySelector(".save__container input").value;
  const imgObj = {
    title,
    imageUrl,
    arFloor,
    arSquare,
    arStraight,
    arCircle,
    arImg,
    updatePaint: { square, img, circle, straight, floor } || null,
  };
  console.log(imgObj.updatePaint);
  const res = await fetch(`/api/installer/${id}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imgObj),
  });
  if (res.status === 201) {
    redirectHome();
  }
  if (res.status === 401) {
    errorMessage();
    return;
  }
}

function paintSaveForm() {
  saveForm.classList.add(ACTIVE_CLASS);
  main.classList.add(ACTIVE_CLASS);
}

function handleSaveBtn() {
  id = installerContainer.dataset.userId;
  imageUrl = canvas.toDataURL("image/png");
  paintSaveForm();
  const titleBtn = document.querySelector(".save__container button");
  titleBtn.addEventListener("click", handleSubmit);
}

function init() {
  saveBtn.addEventListener("click", handleSaveBtn);
}

init();
