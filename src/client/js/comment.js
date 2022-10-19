const commentContainer = document.querySelector(".comment__container ul");
const comment = document.querySelector(".comment");
const textarea = document.querySelector(".comment__text");
const delBtn = document.querySelectorAll(".comment__list__delBtn");
const editBtn = document.querySelectorAll(".comment__list__editBtn");

const paintComment = (id, text) => {
  const fakeDouemnt = document.createDocumentFragment();
  const li = document.createElement("li");
  li.className = "comment__list";
  li.dataset.commentId = id;
  const i = document.createElement("i");
  i.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  span.className = "comment__list__txt";
  const delBtn = document.createElement("button");
  delBtn.innerHTML = `❌`;
  delBtn.className = "comment__list__delBtn";
  delBtn.addEventListener("click", handleDelBtnClick);
  const editBtn = document.createElement("button");
  editBtn.innerHTML = `✅`;
  editBtn.className = "comment__list__editBtn";
  editBtn.addEventListener("click", handleEditBtnClick);
  li.appendChild(i);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(editBtn);
  fakeDouemnt.appendChild(li);
  commentContainer.prepend(fakeDouemnt);
};

const removeEditTextarea = (target) => {
  target.children[4].classList.add("remove");
  return;
};

const paintEditComment = (id, text, target) => {
  target.dataset.commentId = id;
  target.children[1].innerText = ` ${text}`;
  removeEditTextarea(target);
  return;
};

const getInstallerId = () => {
  const installerContainer = document.querySelector(".installer");
  const id = installerContainer.dataset.installerId;
  return id;
};

const getEditTextarea = () => {
  const edit = document.querySelector(".comment__edit__text");
  const value = edit.value;
  return value;
};

const getTextValue = () => {
  const value = textarea.value;
  return value;
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  // textarea값 갖기(get)
  const text = getEditTextarea();
  const curCommentParent = e.target.parentNode;
  const id = curCommentParent.dataset.commentId;
  // fetch를 통해서 보내기(put or path)
  const responsive = await fetch(`/api/installer/${id}/comment`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (responsive.status === 201) {
    const json = await responsive.json();
    paintEditComment(json.editCommentId, json.text, curCommentParent);
  }
};

const paintTextarea = (target) => {
  // 태그를 미리 설정해서 class이름만 추가시키는걸로 코드 변환
  const fakeDouemnt = document.createDocumentFragment();
  const form = document.createElement("form");
  form.className = "comment";
  form.addEventListener("submit", handleEditSubmit);
  const textarea = document.createElement("textarea");
  textarea.className = "comment__text comment__edit__text";
  textarea.placeholder = "Write your edit comment...";
  textarea.cols = "20";
  textarea.rows = "10";
  const subBtn = document.createElement("button");
  subBtn.innerText = "Edit Submit";
  form.appendChild(textarea);
  form.appendChild(subBtn);
  fakeDouemnt.appendChild(form);
  target.after(fakeDouemnt);
};

const handleEditBtnClick = (e) => {
  // 밑에 textarea생성(paint)
  paintTextarea(e.target);
};

const handleDelBtnClick = async (e) => {
  const curCommentParent = e.target.parentNode;
  const id = curCommentParent.dataset.commentId;
  const responsive = await fetch(`/api/installer/${id}/comment`, {
    method: "DELETE",
  });
  if (responsive.status === 201) {
    commentContainer.removeChild(curCommentParent);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const text = getTextValue();
  const id = getInstallerId();
  if (text === "" || text === " ") {
    return;
  }
  const responsive = await fetch(`/api/installer/${id}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (responsive.status === 201) {
    const json = await responsive.json();
    paintComment(json.newCommentId, json.text);
  }
  if (responsive.status === 404) {
    // errorMessage();
  }
  textarea.value = "";
};

function init() {
  if (comment) {
    comment.addEventListener("submit", handleSubmit);
    if (delBtn) {
      delBtn.forEach((el) => el.addEventListener("click", handleDelBtnClick));
    }
    if (editBtn) {
      editBtn.forEach((el) => el.addEventListener("click", handleEditBtnClick));
    }
  }
}

init();
