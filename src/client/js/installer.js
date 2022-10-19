//css
//제이쿼리
$(document).ready(function () {
  $("ul.tabs li").click(function () {
    let tab_id = $(this).attr("data-tab");
    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");
    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });
});
//회전 버튼
function imagemenu1() {
  let image10 = document.querySelector(".image10");
  image10.classList.toggle("active");
}
function imagemenu2() {
  let image20 = document.querySelector(".image20");
  image20.classList.toggle("active");
}
function imagemenu3() {
  let image30 = document.querySelector(".image30");
  image30.classList.toggle("active");
}

//캔버스
const ctx = document.getElementById("canvas").getContext("2d");
const ctx1 = document.getElementById("bg").getContext("2d");
const ctx2 = document.getElementById("txt").getContext("2d");
const ctx3 = document.getElementById("floor1").getContext("2d");
const ctx4 = document.getElementById("floor2").getContext("2d");
const ctx5 = document.getElementById("img1").getContext("2d");

//버튼
const colors = document.getElementById("selcolors");
const flmode = document.getElementById("jsFloor");
const sqmode = document.getElementById("jsSquare");
const scmode = document.getElementById("jsCircle");
const stmode = document.getElementById("jsStraight");
const txmode = document.getElementById("jsText");
const immode = document.getElementById("jsImg");
const mvmode = document.getElementById("move");

//지우개
const flEraser = document.getElementById("floorEraser");
const sqEraser = document.getElementById("squareEraser");
const scEraser = document.getElementById("circleEraser");
const stEraser = document.getElementById("straightEraser");
const txEraser = document.getElementById("textEraser");
const imEraser = document.getElementById("imgEraser");

//가구
const list11 = document.getElementById("image11");
const list12 = document.getElementById("image12");
const list13 = document.getElementById("image13");
const list14 = document.getElementById("image14");
const list21 = document.getElementById("image21");
const list22 = document.getElementById("image22");
const list23 = document.getElementById("image23");
const list24 = document.getElementById("image24");
const list31 = document.getElementById("image31");
const list32 = document.getElementById("image32");
const list33 = document.getElementById("image33");
const list34 = document.getElementById("image34");

//사각형 가로,세로
const sqWidth = document.getElementById("squareWidth");
const sqheight = document.getElementById("squareheight");
const squareX = document.getElementById("squareX");
const squareY = document.getElementById("squareY");
//원
const ccWidth = document.getElementById("circleWidth");
const circleX = document.getElementById("circleX");
const circleY = document.getElementById("circleY");
//지우개
const reset = document.getElementById("eraser");
//테두리 넓이
const lineWidth = document.getElementById("line-widht");
lineWidth.addEventListener("change", onLineWidthChange);
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

export let arFloor = new Array(); //바닥 배열
export let arSquare = new Array(); //사각형 배열
export let arStraight = new Array(); // 직선 배열
export let arCircle = new Array(); // 원 배열
export let arText = new Array(); // 텍스트 배열
export let arImg = new Array(); // 이미지 배열

let sx, sy; // 드래그 시작점
let ex, ey; // 드래그 끝점
let floor; // 현재 바닥
let color; // 현재 색상
let moving = -1; // 이동중인 도형 첨자
let border; //테두리
let listv; //가구
let property;

let floordrawing; // 그리고 있는 중인가
let squaredrawing;
let circledrawing;
let straightdrawing;
let movedoing;
let textdrawing = false;
let imgdrawing;

let fl = false; //바닥
let sq = false; //사각형
let st = false; //직선
let sc = false; //원
let tx = false; //텍스트
let er = false; //지우개
let im = false; //이미지
let mv = false; //옮기기
let move = 0;

//바닥 생성자
function Floor(sx, sy, ex, ey, color, border, property) {
  this.sx = Math.round(sx.toFixed(0) / 10) * 10;
  this.sy = Math.round(sy.toFixed(0) / 10) * 10;
  this.ex = Math.round(ex.toFixed(0) / 10) * 10;
  this.ey = Math.round(ey.toFixed(0) / 10) * 10;
  this.color = floor;
  this.border = border;
  this.property = property;
}
//사각형 생성자
function Square(sx, sy, ex, ey, color, border, property) {
  this.sx = Math.round(sx.toFixed(0) / 10) * 10;
  this.sy = Math.round(sy.toFixed(0) / 10) * 10;
  this.ex = Math.round(ex.toFixed(0) / 10) * 10;
  this.ey = Math.round(ey.toFixed(0) / 10) * 10;
  this.color = color;
  this.border = border;
  this.property = property;
}
//원 생성자
function Circle(sx, sy, ex, ey, color, border, property) {
  this.sx = Math.round(sx.toFixed(0) / 10) * 10;
  this.sy = Math.round(sy.toFixed(0) / 10) * 10;
  this.ex = Math.round(ex.toFixed(0) / 10) * 10;
  this.ey = ey;
  this.color = color;
  this.border = border;
  this.property = property;
}
//직선 생성자
function Straight(sx, sy, ex, ey, color, border, property) {
  this.sx = Math.round(sx.toFixed(0) / 10) * 10;
  this.sy = Math.round(sy.toFixed(0) / 10) * 10;
  this.ex = Math.round(ex.toFixed(0) / 10) * 10;
  this.ey = Math.round(ey.toFixed(0) / 10) * 10;
  this.color = color;
  this.border = border;
  this.property = property;
}
//텍스트 생성자
function Text(txt, x, y, property) {
  this.txt = txt;
  this.x = x;
  this.y = y;
  this.property = property;
}
//이미지 생성자
function Img(img, sx, sy, ex, ey, list, property) {
  this.img = img;
  this.sx = sx;
  this.sy = sy;
  this.ex = ex;
  this.ey = ey;
  this.list = list;
  this.property = property;
}

//세팅
ctx.strokeStyle = "black";
ctx.lineWidth = lineWidth.value;
color = "rgb(255, 255, 255)";
ctx.fillStyle = color;

ctx3.strokeStyle = "black";
ctx4.strokeStyle = "black";
ctx3.lineWidth = lineWidth.value;
ctx4.lineWidth = lineWidth.value;
floor = "rgb(255, 255, 255)";
ctx3.fillStyle = floor;
ctx4.fillStyle = floor;

let font = "14px sans-serif";

//버튼
function flModeClick() {
  if (fl === true) {
    fl = false;
    flmode.innerText = "바닥";
  } else {
    fl = true;
    sq = false;
    st = false;
    sc = false;
    tx = false;
    er = false;
    im = false;
    mv = false;
    movedoing = false;
    flmode.innerText = "바닥중";
    sqmode.innerText = "사각형";
    stmode.innerText = "직선";
    scmode.innerText = "원";
    txmode.innerText = "텍스트";
    reset.innerText = "지우개";
    immode.innerText = "이미지";
    mvmode.innerText = "옮기기";
  }
}
function sqModeClick() {
  if (sq === true) {
    sq = false;
    sqmode.innerText = "사각형";
  } else {
    fl = false;
    sq = true;
    st = false;
    sc = false;
    tx = false;
    er = false;
    im = false;
    mv = false;
    movedoing = false;
    sqmode.innerText = "사각형중";
    flmode.innerText = "바닥";
    stmode.innerText = "직선";
    scmode.innerText = "원";
    txmode.innerText = "텍스트";
    reset.innerText = "지우개";
    immode.innerText = "이미지";
    mvmode.innerText = "옮기기";
  }
}
function scModeClick() {
  if (sc === true) {
    sc = false;
    scmode.innerText = "원";
  } else {
    fl = false;
    sc = true;
    st = false;
    sq = false;
    tx = false;
    er = false;
    im = false;
    mv = false;
    movedoing = false;
    scmode.innerText = "원중";
    flmode.innerText = "바닥";
    stmode.innerText = "직선";
    sqmode.innerText = "사각형";
    txmode.innerText = "텍스트";
    reset.innerText = "지우개";
    immode.innerText = "이미지";
    mvmode.innerText = "옮기기";
  }
}
function stModeClick() {
  if (st === true) {
    st = false;
    stmode.innerText = "직선";
  } else {
    fl = false;
    st = true;
    sq = false;
    sc = false;
    tx = false;
    er = false;
    im = false;
    mv = false;
    movedoing = false;
    stmode.innerText = "직선중";
    flmode.innerText = "바닥";
    sqmode.innerText = "사각형";
    scmode.innerText = "원";
    txmode.innerText = "텍스트";
    reset.innerText = "지우개";
    immode.innerText = "이미지";
    mvmode.innerText = "옮기기";
  }
}
function txModeClick() {
  if (tx === true) {
    tx = false;
    txmode.innerText = "텍스트";
  } else {
    fl = false;
    tx = true;
    st = false;
    sq = false;
    sc = false;
    er = false;
    im = false;
    mv = false;
    movedoing = false;
    txmode.innerText = "텍스트중";
    flmode.innerText = "바닥";
    stmode.innerText = "직선";
    sqmode.innerText = "사각형";
    scmode.innerText = "원";
    reset.innerText = "지우개";
    immode.innerText = "이미지";
    mvmode.innerText = "옮기기";
  }
}
function imModeClick() {
  if (im === true) {
    im = false;
    immode.innerText = "이미지";
  } else {
    fl = false;
    im = true;
    tx = false;
    st = false;
    sq = false;
    sc = false;
    er = false;
    mv = false;
    movedoing = false;
    immode.innerText = "이미지중";
    txmode.innerText = "텍스트";
    flmode.innerText = "바닥";
    stmode.innerText = "직선";
    sqmode.innerText = "사각형";
    scmode.innerText = "원";
    reset.innerText = "지우개";
    mvmode.innerText = "옮기기";
  }
}
function mvModeClick() {
  if (mv === true) {
    mv = false;
    mvmode.innerText = "옮기기";
  } else {
    mv = true;
    er = false;
    st = false;
    sq = false;
    sc = false;
    fl = false;
    tx = false;
    im = false;
    stmode.innerText = "직선";
    sqmode.innerText = "사각형";
    scmode.innerText = "원";
    reset.innerText = "지우개";
    mvmode.innerText = "옮기기 중";
    flmode.innerText = "바닥";
    txmode.innerText = "텍스트";
    immode.innerText = "이미지";
  }
}
function eraserClick() {
  if (er === true) {
    er = false;
    reset.innerText = "지우개";
  } else {
    er = true;
    st = false;
    sq = false;
    sc = false;
    tx = false;
    im = false;
    mv = false;
    movedoing = false;
    stmode.innerText = "직선";
    sqmode.innerText = "사각형";
    scmode.innerText = "원";
    mvmode.innerText = "옮기기";
    txmode.innerText = "텍스트";
    immode.innerText = "이미지";
    reset.innerText = "지우개 중";
  }
}
//되돌리기 버튼
function flEraserClick() {
  arFloor.pop();
  drawRects();
}
function sqEraserClick() {
  arSquare.pop();
  drawRects();
}
function scEraserClick() {
  arCircle.pop();
  drawRects();
}
function stEraserClick() {
  arStraight.pop();
  drawRects();
}
function txEraserClick() {
  arText.pop();
  drawRects();
}
function imEraserClick() {
  arImg.pop();
  drawRects();
}

//격자무늬
bg();

function bg() {
  for (let x = 0.5; x < 1301; x += 10) {
    ctx1.moveTo(x, 0);
    ctx1.lineTo(x, 800);
  }
  for (let y = 0.5; y < 801; y += 10) {
    ctx1.moveTo(0, y);
    ctx1.lineTo(1300, y);
  }
  ctx1.strokeStyle = "#eee";
  ctx1.stroke();
}

//바닥
selfloor.onchange = function (e) {
  floor = selfloor.value;
};
//색상
selcolor.onchange = function (e) {
  color = selcolor.value;
};

//바닥
function draw1() {
  let img = new Image();
  img.src = "http://localhost:5555/uploads/장판.jpg";
  img.onload = function () {
    ctx3.fillStyle = ctx3.createPattern(img, "repeat");
  };
}
function draw2() {
  let img = new Image();
  img.src = "http://localhost:5555/uploads/대리석.jpg";
  img.onload = function () {
    ctx4.fillStyle = ctx4.createPattern(img, "repeat");
  };
}

//가구
function list11Click() {
  listv = 11;
}
function list12Click() {
  listv = 12;
}
function list13Click() {
  listv = 13;
}
function list14Click() {
  listv = 14;
}
function list21Click() {
  listv = 21;
}
function list22Click() {
  listv = 22;
}
function list23Click() {
  listv = 23;
}
function list24Click() {
  listv = 24;
}
function list31Click() {
  listv = 31;
}
function list32Click() {
  listv = 32;
}
function list33Click() {
  listv = 33;
}
function list34Click() {
  listv = 34;
}

//텍스트 입력
function addInput(x, y) {
  const input = document.createElement("input");

  input.type = "text";
  input.style.position = "fixed";
  input.style.left = x - 4 + "px";
  input.style.top = y - 4 + "px";

  input.onkeydown = handleEnter;

  document.body.appendChild(input);

  input.focus();

  textdrawing = true;
}
function handleEnter(e) {
  let keyCode = e.keyCode;
  if (keyCode === 13) {
    drawText(
      this.value,
      parseInt(this.style.left, 10),
      parseInt(this.style.top, 10)
    );
    document.body.removeChild(this);
    textdrawing = false;
  }
}
function drawText(txt, x, y) {
  ctx2.textBaseline = "top";
  ctx2.textAlign = "left";
  ctx2.font = font;
  ctx2.fillText(txt, x - 449, y - 233);
  property = "text";
  arText.push(new Text(txt, x - 449, y - 233, property));
}

//사각형 직접 입력하기 부분
function handleRangeChange(event) {
  const size = event.target.value;
  sqw = size;
}
function handleLangeChange(event) {
  const saze = event.target.value;
  sqh = saze;
}

if (sqWidth) {
  sqWidth.addEventListener("input", handleRangeChange);
}
if (sqheight) {
  sqheight.addEventListener("input", handleLangeChange);
}
let 버튼 = document.getElementById("ok");
버튼.onclick = function (event) {
  event.preventDefault();
  border = lineWidth.value;
  property = "square";
  arSquare.unshift(
    new Square(
      100,
      100,
      parseInt(sqw) + 100,
      parseInt(sqh) + 100,
      color,
      border,
      property
    )
  );
  drawRects();
};

//원 직접 입력하기 부분
function handleAangeChange(event) {
  const sizer = event.target.value;
  cca = sizer;
}
if (ccWidth) {
  ccWidth.addEventListener("input", handleAangeChange);
}
let 바튼 = document.getElementById("okay");
바튼.onclick = function (event) {
  event.preventDefault();
  border = lineWidth.value;
  property = "circle";
  arCircle.unshift(
    new Circle(100, 100, parseInt(cca) + 100, color, border, property)
  );
  drawRects();
};
//초기화
let 초기화 = document.getElementById("clear");
초기화.onclick = function (e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  ctx5.clearRect(0, 0, canvas.width, canvas.height);
  arFloor.length = 0;
  arSquare.length = 0;
  arStraight.length = 0;
  arCircle.length = 0;
  arText.length = 0;
  arImg.length = 0;
};

//마우스 좌표 구하기
function canvasX(clientX) {
  let bound = canvas.getBoundingClientRect();
  let bw = 5;
  return (clientX - bound.left - bw) * (canvas.width / (bound.width - bw * 2));
}
function canvasY(clientY) {
  let bound = canvas.getBoundingClientRect();
  let bw = 5;
  return (clientY - bound.top - bw) * (canvas.height / (bound.height - bw * 2));
}
//도형등 위치 찾기
function getFloor(x, y) {
  for (let i = 0; i < arFloor.length; i++) {
    let r = arFloor[i];
    if (x > r.sx && x < r.ex && y > r.sy && y < r.ey) {
      move = 1;
      return i;
    }
  }
  return -1;
}
function getSquare(x, y) {
  for (let i = 0; i < arSquare.length; i++) {
    let r = arSquare[i];
    if (x > r.sx && x < r.ex && y > r.sy && y < r.ey) {
      move = 2;
      return i;
    }
  }
  return -1;
}
function getCircle(x, y) {
  for (let i = 0; i < arCircle.length; i++) {
    let r = arCircle[i];
    if (r.ex >= r.sx) {
      if (
        x < r.ex &&
        x > r.sx - (r.ex - r.sx) &&
        y < r.sy + (r.ex - r.sx) &&
        y > r.sy - (r.ex - r.sx)
      ) {
        move = 3;
        return i;
      }
    } else if (r.ex < r.sx) {
      if (
        x > r.ex &&
        x < r.sx - (r.ex - r.sx) &&
        y > r.sy + (r.ex - r.sx) &&
        y < r.sy - (r.ex - r.sx)
      ) {
        move = 3;
        return i;
      }
    }
  }
  return -1;
}
function getStraight(x, y) {
  for (let i = 0; i < arStraight.length; i++) {
    let r = arStraight[i];
    if (r.ex >= r.sx) {
      if (x > r.sx && x < r.sx + 20 && y > r.sy && y < r.sy + 20) {
        return i;
      }
    } else if (r.ex < r.sx) {
      if (x < r.sx && x > r.sx - 20 && y > r.sy && y < r.sy + 20) {
        return i;
      }
    }
  }
  return -1;
}
function getText(x, y) {
  for (let i = 0; i < arText.length; i++) {
    let r = arText[i];
    if (x > r.x && x < r.x + 50 && y > r.y && y < r.y + 10) {
      return i;
    }
  }
  return -1;
}
function getImg(x, y) {
  for (let i = 0; i < arImg.length; i++) {
    let r = arImg[i];
    if (x > r.sx && x < r.ex && y > r.sy && y < r.ey) {
      move = 4;
      return i;
    }
  }
  return -1;
}
// 화면 지우고 모든 도형을 순서대로 다 그림
function drawRects() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  ctx5.clearRect(0, 0, canvas.width, canvas.height);
  let i, r;
  for (i = arFloor.length - 1; i > -1; i--) {
    r = arFloor[i];
    ctx3.lineWidth = r.border;
    ctx4.lineWidth = r.border;
    if (r.color == 1) {
      draw1();
      ctx3.fillRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
      ctx3.strokeRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
    } else if (r.color == 2) {
      draw2();
      ctx4.fillRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
      ctx4.strokeRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
    }
  }
  for (i = arSquare.length - 1; i > -1; i--) {
    r = arSquare[i];
    ctx.lineWidth = r.border;
    ctx.fillStyle = r.color;
    ctx.fillRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
    ctx.strokeRect(r.sx, r.sy, r.ex - r.sx, r.ey - r.sy);
  }
  for (i = arCircle.length - 1; i > -1; i--) {
    r = arCircle[i];
    ctx.lineWidth = r.border;
    ctx.beginPath();
    if (r.ex >= r.sx) {
      ctx.arc(r.sx, r.sy, r.ex - r.sx, 0, 360);
    } else if (r.ex < r.sx) {
      ctx.arc(r.sx, r.sy, r.sx - r.ex, 0, 360);
    }
    ctx.fillStyle = r.color;
    ctx.fill();
    ctx.stroke();
  }
  for (i = arStraight.length - 1; i > -1; i--) {
    r = arStraight[i];
    ctx.lineWidth = r.border;
    ctx.beginPath();
    ctx.moveTo(r.sx, r.sy);
    ctx.lineTo(r.ex, r.ey);
    ctx.stroke();
  }
  for (i = arText.length - 1; i > -1; i--) {
    r = arText[i];
    ctx2.textBaseline = "top";
    ctx2.textAlign = "left";
    ctx2.font = font;
    ctx2.fillText(r.txt, r.x, r.y);
  }
  for (i = arImg.length - 1; i > -1; i--) {
    r = arImg[i];
    ctx5.drawImage(r.img, r.sx, r.sy);
  }
}

//마우스 클릭
canvas.onclick = function (e) {
  if (tx) {
    drawRects();
    if (textdrawing) return;
    addInput(e.clientX, e.clientY);
  }
  if (er) {
    e.preventDefault();
    // 클릭한 좌표 구하기
    sx = canvasX(e.clientX);
    sy = canvasY(e.clientY);
    moving = getSquare(sx, sy);

    if (moving != -1) {
      let r = arSquare[moving];
      arSquare.splice(moving, 1);

      drawRects();
    }
  }
  if (er) {
    moving = getCircle(sx, sy);
    e.preventDefault();
    // 클릭한 좌표 구하기
    sx = canvasX(e.clientX);
    sy = canvasY(e.clientY);
    if (moving != -1) {
      let r = arCircle[moving];
      arCircle.splice(moving, 1);
      drawRects();
    }
  }
  if (er) {
    moving = getFloor(sx, sy);
    e.preventDefault();
    // 클릭한 좌표 구하기
    sx = canvasX(e.clientX);
    sy = canvasY(e.clientY);
    if (moving != -1) {
      let r = arFloor[moving];
      arFloor.splice(moving, 1);
      drawRects();
    }
  }
  if (er) {
    moving = getText(sx, sy);
    e.preventDefault();
    // 클릭한 좌표 구하기
    sx = canvasX(e.clientX);
    sy = canvasY(e.clientY);
    if (moving != -1) {
      let r = arText[moving];
      arText.splice(moving, 1);

      drawRects();
    }
  }
  if (er) {
    moving = getStraight(sx, sy);
    e.preventDefault();
    // 클릭한 좌표 구하기
    sx = canvasX(e.clientX);
    sy = canvasY(e.clientY);
    if (moving != -1) {
      let r = arStraight[moving];
      arStraight.splice(moving, 1);
      drawRects();
    }
  }
  if (er) {
    moving = getImg(sx, sy);
    e.preventDefault();
    // 클릭한 좌표 구하기
    sx = canvasX(e.clientX);
    sy = canvasY(e.clientY);
    if (moving != -1) {
      let r = arImg[moving];
      arImg.splice(moving, 1);
      drawRects();
    }
  }
  moving = -1;
};

//마우스 다운 이벤트
canvas.onmousedown = function (e) {
  e.preventDefault();
  // 클릭한 좌표 구하기
  sx = canvasX(e.clientX);
  sy = canvasY(e.clientY);
  // 도형을 클릭한 것이 아니면 그리기 시작
  if (fl) {
    if (moving == -1) {
      floordrawing = true;
    }
    //그 위치에 도형이 있는지 조사
  }
  if (sq) {
    if (moving == -1) {
      squaredrawing = true;
    }
  }
  if (sc) {
    if (moving == -1) {
      circledrawing = true;
    }
  }
  if (st) {
    straightdrawing = true;
  }
  if (im) {
    if (moving == -1) {
      imgdrawing = true;
    }
  }
  if (imgdrawing) {
    if (moving == -1) {
      function draw11() {
        let list = listv;
        let img11 = new Image();
        img11.src = "http://localhost:5555/uploads/의자1.jpg";
        img11.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img11.width;
          let ey = sy + img11.height;
          property = "image";
          ctx5.drawImage(img11, sx, sy);
          arImg.unshift(new Img(img11, sx, sy, ex, ey, list, property));
        };
      }
      function draw12() {
        let list = listv;

        let img12 = new Image();
        img12.src = "http://localhost:5555/uploads/의자2.jpg";
        img12.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img12.width;
          let ey = sy + img12.height;
          property = "image";
          ctx5.drawImage(img12, sx, sy);
          arImg.unshift(new Img(img12, sx, sy, ex, ey, list, property));
        };
      }
      function draw13() {
        let list = listv;
        let img13 = new Image();
        img13.src = "http://localhost:5555/uploads/의자3.jpg";
        img13.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img13.width;
          let ey = sy + img13.height;
          property = "image";
          ctx5.drawImage(img13, sx, sy);
          arImg.unshift(new Img(img13, sx, sy, ex, ey, list, property));
        };
      }
      function draw14() {
        let list = listv;

        let img14 = new Image();
        img14.src = "http://localhost:5555/uploads/의자4.jpg";
        img14.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img14.width;
          let ey = sy + img14.height;
          property = "image";
          ctx5.drawImage(img14, sx, sy);
          arImg.unshift(new Img(img14, sx, sy, ex, ey, list, property));
        };
      }
      function draw21() {
        let list = listv;
        let img3 = new Image();
        img3.src = "http://localhost:5555/uploads/책상1.jpg";
        img3.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img3.width;
          let ey = sy + img3.height;
          property = "image";
          ctx5.drawImage(img3, sx, sy);
          arImg.unshift(new Img(img3, sx, sy, ex, ey, list, property));
        };
      }
      function draw22() {
        let list = listv;
        let img22 = new Image();
        img22.src = "http://localhost:5555/uploads/책상2.jpg";
        img22.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img22.width;
          let ey = sy + img22.height;
          property = "image";
          ctx5.drawImage(img22, sx, sy);
          arImg.unshift(new Img(img22, sx, sy, ex, ey, list, property));
        };
      }
      function draw23() {
        let list = listv;
        let img23 = new Image();
        img23.src = "http://localhost:5555/uploads/책상3.jpg";
        img23.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img23.width;
          let ey = sy + img23.height;
          property = "image";
          ctx5.drawImage(img23, sx, sy);
          arImg.unshift(new Img(img23, sx, sy, ex, ey, list, property));
        };
      }
      function draw24() {
        let list = listv;
        let img24 = new Image();
        img24.src = "http://localhost:5555/uploads/책상4.jpg";
        img24.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img24.width;
          let ey = sy + img24.height;
          property = "image";
          ctx5.drawImage(img24, sx, sy);
          arImg.unshift(new Img(img24, sx, sy, ex, ey, list, property));
        };
      }
      function draw31() {
        let list = listv;
        let img31 = new Image();
        img31.src = "http://localhost:5555/uploads/침대1.jpg";
        img31.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img31.width;
          let ey = sy + img31.height;
          property = "image";
          ctx5.drawImage(img31, sx, sy);
          arImg.unshift(new Img(img31, sx, sy, ex, ey, list, property));
        };
      }
      function draw32() {
        let list = listv;
        let img32 = new Image();
        img32.src = "http://localhost:5555/uploads/침대2.jpg";
        img32.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img32.width;
          let ey = sy + img32.height;
          property = "image";
          ctx5.drawImage(img32, sx, sy);
          arImg.unshift(new Img(img32, sx, sy, ex, ey, list, property));
        };
      }
      function draw33() {
        let list = listv;
        let img33 = new Image();
        img33.src = "http://localhost:5555/uploads/침대3.jpg";
        img33.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img33.width;
          let ey = sy + img33.height;
          property = "image";
          ctx5.drawImage(img33, sx, sy);
          arImg.unshift(new Img(img33, sx, sy, ex, ey, list, property));
        };
      }
      function draw34() {
        let list = listv;
        let img34 = new Image();
        img34.src = "http://localhost:5555/uploads/침대4.jpg";
        img34.onload = function () {
          e.preventDefault();
          let sx = canvasX(e.clientX);
          let sy = canvasY(e.clientY);
          let ex = sx + img34.width;
          let ey = sy + img34.height;
          property = "image";
          ctx5.drawImage(img34, sx, sy);
          arImg.unshift(new Img(img34, sx, sy, ex, ey, list, property));
        };
      }
      if (listv == 11) {
        draw11();
      }
      if (listv == 12) {
        draw12();
      }
      if (listv == 13) {
        draw13();
      }
      if (listv == 14) {
        draw14();
      }
      if (listv == 21) {
        draw21();
      }
      if (listv == 22) {
        draw22();
      }
      if (listv == 23) {
        draw23();
      }
      if (listv == 24) {
        draw24();
      }
      if (listv == 31) {
        draw31();
      }
      if (listv == 32) {
        draw32();
      }
      if (listv == 33) {
        draw33();
      }
      if (listv == 34) {
        draw34();
      }
    }
  }
  //옮기기 순서
  if (mv) {
    if (moving == -1) {
      moving = getCircle(sx, sy);
      movedoing = true;
    }
    if (moving == -1) {
      moving = getSquare(sx, sy);
      movedoing = true;
    }
    if (moving == -1) {
      moving = getImg(sx, sy);
      movedoing = true;
    }
    if (moving == -1) {
      moving = getFloor(sx, sy);
      movedoing = true;
    }
  }
};
//마우스 무브 이벤트
canvas.onmousemove = function (e) {
  e.preventDefault();
  //마우스 좌표 구하기
  ex = canvasX(e.clientX);
  ey = canvasY(e.clientY);
  // 화면 다시 그리고 현재 도형 그림
  if (floordrawing) {
    drawRects();
    ctx3.lineWidth = lineWidth.value;
    ctx4.lineWidth = lineWidth.value;
    if (floor == 1) {
      draw1();
      ctx3.fillRect(
        Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(sy.toFixed(0) / 10) * 10,
        Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10
      );
      ctx3.strokeRect(
        Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(sy.toFixed(0) / 10) * 10,
        Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10
      );
    } else if (floor == 2) {
      draw2();
      ctx4.fillRect(
        Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(sy.toFixed(0) / 10) * 10,
        Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10
      );
      ctx4.strokeRect(
        Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(sy.toFixed(0) / 10) * 10,
        Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10
      );
    }
  }
  if (squaredrawing) {
    drawRects();
    ctx.lineWidth = lineWidth.value;
    ctx.fillStyle = color;
    ctx.fillRect(
      Math.round(sx.toFixed(0) / 10) * 10,
      Math.round(sy.toFixed(0) / 10) * 10,
      Math.round(ex.toFixed(0) / 10) * 10 - Math.round(sx.toFixed(0) / 10) * 10,
      Math.round(ey.toFixed(0) / 10) * 10 - Math.round(sy.toFixed(0) / 10) * 10
    );
    ctx.strokeRect(
      Math.round(sx.toFixed(0) / 10) * 10,
      Math.round(sy.toFixed(0) / 10) * 10,
      Math.round(ex.toFixed(0) / 10) * 10 - Math.round(sx.toFixed(0) / 10) * 10,
      Math.round(ey.toFixed(0) / 10) * 10 - Math.round(sy.toFixed(0) / 10) * 10
    );
  }
  if (circledrawing) {
    drawRects();
    ctx.lineWidth = lineWidth.value;
    ctx.beginPath();
    if (ex >= sx) {
      ctx.arc(
        Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(sy.toFixed(0) / 10) * 10,
        Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10,
        0,
        360
      );
    } else if (ex < sx) {
      ctx.arc(
        Math.round(sx.toFixed(0) / 10) * 10,
        Math.round(sy.toFixed(0) / 10) * 10,
        Math.round(sx.toFixed(0) / 10) * 10 -
          Math.round(ex.toFixed(0) / 10) * 10,
        0,
        360
      );
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }
  if (straightdrawing) {
    drawRects();
    ctx.lineWidth = lineWidth.value;
    ctx.beginPath();
    ctx.moveTo(
      Math.round(sx.toFixed(0) / 10) * 10,
      Math.round(sy.toFixed(0) / 10) * 10
    );
    ctx.lineTo(
      Math.round(ex.toFixed(0) / 10) * 10,
      Math.round(ey.toFixed(0) / 10) * 10
    );
    ctx.stroke();
  }
  // 상대적인 마우스 이동 거리만큼 도형 이동

  //옮기기(통합)
  if (movedoing) {
    drawRects();
    if (move == 1) {
      if (moving != -1) {
        let r = arFloor[moving];
        r.sx +=
          Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10;
        r.sy +=
          Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10;
        r.ex +=
          Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10;
        r.ey +=
          Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10;
        sx = ex;
        sy = ey;
        drawRects();
      }
    }
    if (move == 2) {
      if (moving != -1) {
        let r = arSquare[moving];
        r.sx +=
          Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10;
        r.sy +=
          Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10;
        r.ex +=
          Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10;
        r.ey +=
          Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10;
        sx = ex;
        sy = ey;
        drawRects();
      }
    }
    if (move == 3) {
      if (moving != -1) {
        let r = arCircle[moving];
        r.sx +=
          Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10;
        r.sy +=
          Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10;
        r.ex +=
          Math.round(ex.toFixed(0) / 10) * 10 -
          Math.round(sx.toFixed(0) / 10) * 10;
        r.ey +=
          Math.round(ey.toFixed(0) / 10) * 10 -
          Math.round(sy.toFixed(0) / 10) * 10;
        sx = ex;
        sy = ey;
        drawRects();
      }
    }
    if (move == 4) {
      if (moving != -1) {
        let r = arImg[moving];
        r.sx += ex - sx;
        r.sy += ey - sy;
        r.ex += ex - sx;
        r.ey += ey - sy;
        sx = ex;
        sy = ey;
        drawRects();
      }
    }
  }
};
//마우스 업 이벤트
canvas.onmouseup = function (e) {
  // 좌표 정규화해서 새로운 도형을 배열에 추가
  if (floordrawing) {
    let x1 = Math.min(sx, ex);
    let y1 = Math.min(sy, ey);
    let x2 = Math.max(sx, ex);
    let y2 = Math.max(sy, ey);
    border = lineWidth.value;
    property = "floor";
    arFloor.unshift(new Floor(x1, y1, x2, y2, color, border, property));
    floordrawing = false;
  }
  if (squaredrawing) {
    let x1 = Math.min(sx, ex);
    let y1 = Math.min(sy, ey);
    let x2 = Math.max(sx, ex);
    let y2 = Math.max(sy, ey);
    border = lineWidth.value;
    property = "square";
    arSquare.unshift(new Square(x1, y1, x2, y2, color, border, property));
    squaredrawing = false;
  }
  if (circledrawing) {
    let x1 = sx;
    let y1 = sy;
    let x2 = ex;
    let y2 = ey;
    border = lineWidth.value;
    property = "circle";
    arCircle.unshift(new Circle(x1, y1, x2, y2, color, border, property));
    circledrawing = false;
  }
  if (straightdrawing) {
    let x1 = sx;
    let y1 = sy;
    let x2 = ex;
    let y2 = ey;
    border = lineWidth.value;
    property = "straight";
    arStraight.unshift(new Straight(x1, y1, x2, y2, color, border, property));
    straightdrawing = false;
  }
  if (imgdrawing) {
    imgdrawing = false;
  }
  moving = -1;
};

if (flmode) {
  flmode.addEventListener("click", flModeClick);
}

if (sqmode) {
  sqmode.addEventListener("click", sqModeClick);
}

if (scmode) {
  scmode.addEventListener("click", scModeClick);
}

if (stmode) {
  stmode.addEventListener("click", stModeClick);
}

if (txmode) {
  txmode.addEventListener("click", txModeClick);
}

if (mvmode) {
  mvmode.addEventListener("click", mvModeClick);
}

if (immode) {
  immode.addEventListener("click", imModeClick);
}

if (flEraser) {
  flEraser.addEventListener("click", flEraserClick);
}

if (sqEraser) {
  sqEraser.addEventListener("click", sqEraserClick);
}

if (scEraser) {
  scEraser.addEventListener("click", scEraserClick);
}

if (stEraser) {
  stEraser.addEventListener("click", stEraserClick);
}

if (txEraser) {
  txEraser.addEventListener("click", txEraserClick);
}

if (imEraser) {
  imEraser.addEventListener("click", imEraserClick);
}

if (reset) {
  reset.addEventListener("click", eraserClick);
}

if (list11) {
  list11.addEventListener("click", list11Click);
}

if (list12) {
  list12.addEventListener("click", list12Click);
}

if (list13) {
  list13.addEventListener("click", list13Click);
}

if (list14) {
  list14.addEventListener("click", list14Click);
}

if (list21) {
  list21.addEventListener("click", list21Click);
}

if (list22) {
  list22.addEventListener("click", list22Click);
}

if (list23) {
  list23.addEventListener("click", list23Click);
}

if (list24) {
  list24.addEventListener("click", list24Click);
}

if (list31) {
  list31.addEventListener("click", list31Click);
}

if (list32) {
  list32.addEventListener("click", list32Click);
}

if (list33) {
  list33.addEventListener("click", list33Click);
}

if (list34) {
  list34.addEventListener("click", list34Click);
}
