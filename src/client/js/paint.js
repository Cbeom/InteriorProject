import {
  squarePaint,
  imgPaint,
  CirclePaint,
  StraightPaint,
  FloorPaint,
} from "./updatePaint";

export let square = [];
export let img = [];
export let circle = [];
export let straight = [];
export let floor = [];

let paint;

const drawContainer = document.querySelector(".drawingless");
const paints = drawContainer.dataset.paints;

// 사각형
// 원
// 직선
// 이미지
// 그리는 함수 제작

function loadPaint() {
  const paintArr = JSON.parse(paints);
  paintArr.forEach((el) => {
    switch (el.name) {
      case "square":
        paint = new squarePaint(
          el._id,
          el.sxPos,
          el.syPos,
          el.exPos,
          el.eyPos,
          el.color,
          el.border,
          el.name
        );
        square.push(paint);
        break;
      case "circle":
        paint = new CirclePaint(
          el._id,
          el.sxPos,
          el.syPos,
          el.exPos,
          el.eyPos,
          el.color,
          el.border,
          el.name
        );
        circle.push(paint);
        break;
      case "straight":
        paint = new StraightPaint(
          el._id,
          el.sxPos,
          el.syPos,
          el.exPos,
          el.eyPos,
          el.color,
          el.border,
          el.name
        );
        straight.push(paint);
        break;
      case "image":
        paint = new imgPaint(
          el._id,
          el.sxPos,
          el.syPos,
          el.exPos,
          el.eyPos,
          el.color,
          el.name,
          el.list
        );
        img.push(paint);
        break;
      case "floor":
        paint = new FloorPaint(
          el._id,
          el.sxPos,
          el.syPos,
          el.exPos,
          el.eyPos,
          el.color,
          el.border,
          el.name
        );
        floor.push(paint);
        break;
    }
  });
}

function init() {
  if (paints) {
    loadPaint();
    console.log(square);
  }
}

init();
