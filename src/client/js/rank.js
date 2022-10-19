const selected = document.querySelector("#rank-select");
const rankContainer = document.querySelector(".rank_container");
const fakeDocument = document.createDocumentFragment();

function paintNotice(rank) {
  rankContainer.innerText = "";
  for (let i = 0; i < rank.length; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const title = document.createElement("a");
    const metaText = document.createElement("small");
    const br = document.createElement("br");
    img.src = `${rank[i].resulturl}`;
    img.style.width = "331px";
    img.style.height = "206px";
    title.href = `/installer/${rank[i]._id}`;
    title.innerText = `
    ${rank[i].title}
    `;
    metaText.innerText = `추천 ${rank[i].meta.like} · 조회 ${rank[i].meta.view}`;
    li.appendChild(img);
    li.appendChild(br);
    li.appendChild(title);
    li.appendChild(metaText);
    fakeDocument.append(li);
  }
  rankContainer.append(fakeDocument);
}

async function handleSelected() {
  const value = selected.options[selected.selectedIndex].value;
  const response = await fetch(`/api/installer/rank/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });
  if (response.status === 301) {
    const rankContainer = await response.json();
    paintNotice(rankContainer.rank);
  } else {
    return;
  }
}

function init() {
  selected.addEventListener("input", handleSelected);
}

init();
