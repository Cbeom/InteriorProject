const installerContainer = document.querySelector(".installer");
const likeBtn = document.querySelector(".installer__like");
const CLICKED_CLASS = "clicked";
let clicked = false;

const handleLikeBtnClick = async () => {
  const id = installerContainer.dataset.installerId;
  const userId = likeBtn.dataset.userId;
  const responsive = await fetch(`/api/installer/${id}/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, clicked }),
  });
  if (!clicked) {
    if (responsive.status === 201) {
      likeBtn.classList.add(CLICKED_CLASS);
      clicked = true;
    }
  } else {
    if (responsive.status === 404) {
      likeBtn.classList.remove(CLICKED_CLASS);
      clicked = false;
    }
  }
};

function init() {
  if (installerContainer) {
    const id = installerContainer.dataset.installerId;
    fetch(`/api/installer/${id}/view`, { method: "PATCH" });
  }
  if (likeBtn) {
    likeBtn.addEventListener("click", handleLikeBtnClick);
  }
}
init();
