const fakeDocument = document.createDocumentFragment();
const pageContainer = document.querySelector(".page__cotainer");
const noticeContainer = document.querySelector(".notice_container");

const baseCount = 10;

function paintNotice(notice) {
  noticeContainer.innerText = "";
  for (let i = 0; i < notice.length; i++) {
    const div = document.createElement("div");
    const id= document.createElement("div");
    const title = document.createElement("div");
    const titlea = document.createElement("a");
    const view = document.createElement("div");
    const date = document.createElement("div");
    div.className = 'item';
    id.classList.add("id");
    id.innerText = i;
    title.classList.add("title");
    titlea.href = `/notice/${notice[i]._id}`;
    titlea.innerText = `${notice[i].title}`;
    view.classList.add("view");
    view.innerText = `${notice[i].meta.views}`;
    date.classList.add("date");
    date.innerText = `${notice[i].createAt}`;
    div.appendChild(id);
    div.appendChild(title);
    title.appendChild(titlea);
    div.appendChild(view);
    div.appendChild(date);
    fakeDocument.append(div);
  }
  noticeContainer.appendChild(fakeDocument);
}

async function handlePageContainerClick(e) {
  const target = e.target.innerText.slice(0, 1);
  const response = await (
    await fetch(`/api/notice/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target, baseCount }),
    })
  ).json();
  paintNotice(response.targetNotice);
}

function paintCount(totalCount) {
  for (let i = 1; i <= totalCount; i++) {
    const a = document.createElement("a");
    a.style.cursor = "pointer";
    a.innerText = `${i >= totalCount ? `${i}` : `${i}|`}`;
    fakeDocument.appendChild(a);
  }
  pageContainer.appendChild(fakeDocument);
}
async function getNotice() {
  const response = await (
    await fetch(`/api/notice/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target: "1", baseCount }),
    })
  ).json();
  paintNotice(response.targetNotice);
}

async function getTotalCount() {
  const response = await (
    await fetch("/api/notice/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ baseCount }),
    })
  ).json();
  if (response) {
    const totalCount = Math.ceil(response);
    paintCount(totalCount);
  } else {
    return;
  }
}

function init() {
  getTotalCount();
  getNotice();
  pageContainer.addEventListener("click", handlePageContainerClick);
}
init();
