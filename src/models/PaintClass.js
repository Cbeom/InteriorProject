import Paint from "./Paint";

export class Shape {
  constructor(sx, sy, ex, ey, name) {
    this.name = name;
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
  }
}

export class SubShape extends Shape {
  constructor(sx, sy, ex, ey, name, border, color) {
    super(sx, sy, ex, ey, name);
    this.border = border;
    this.color = color;
  }
  async paintSave(installer, shape) {
    const paint = await Paint.create({
      owner: installer._id,
      name: shape.name,
      sxPos: shape.sx,
      syPos: shape.sy,
      exPos: shape.ex,
      eyPos: shape.ey,
      color: shape.color,
      border: shape.border,
    });
    return paint;
  }
}

export class ImgShape extends Shape {
  constructor(sx, sy, ex, ey, name, img) {
    super(sx, sy, ex, ey, name);
    this.img = img;
  }
}

export class backUpdatePaint extends Shape {
  constructor(id, sx, sy, ex, ey, color, border, name) {
    super(sx, sy, ex, ey, name);
    this.id = id;
    this.color = color;
    this.border = border;
  }
  async updatePaint(id, shapeId, shape) {
    const paint = await Paint.findByIdAndUpdate(
      shapeId,
      {
        owner: id,
        name: shape.name,
        sxPos: shape.sx,
        syPos: shape.sy,
        exPos: shape.ex,
        eyPos: shape.ey,
        color: shape.color,
        border: shape.border,
      },
      { new: true }
    );
    return paint;
  }
}
export class updateImgShape extends Shape {
  constructor(sx, sy, ex, ey, name, img) {
    super(sx, sy, ex, ey, name);
    this.img = img;
  }
}
