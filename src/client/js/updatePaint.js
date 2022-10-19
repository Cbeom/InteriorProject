export class updatePaint {
  constructor(_id, sx, sy, ex, ey, color) {
    this.id = _id;
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
    this.color = color;
  }
}

export class squarePaint extends updatePaint {
  constructor(_id, sx, sy, ex, ey, color, border, name) {
    super(_id, sx, sy, ex, ey, color);
    this.border = border;
    this.name = name;
  }
}

export class imgPaint extends updatePaint {
  constructor(_id, sx, sy, ex, ey, name) {
    super(_id, sx, sy, ex, ey, color);
    this.name = name;
    this.list = list;
  }
}
export class CirclePaint extends updatePaint {
  constructor(_id, sx, sy, ex, ey, color, border, name) {
    super(_id, sx, sy, ex, ey, color);
    this.border = border;
    this.name = name;
  }
}
export class StraightPaint extends updatePaint {
  constructor(_id, sx, sy, ex, ey, color, border, name) {
    super(_id, sx, sy, ex, ey, color);
    this.border = border;
    this.name = name;
  }
}

export class FloorPaint extends updatePaint {
  constructor(_id, sx, sy, ex, ey, color, border, name) {
    super(_id, sx, sy, ex, ey, color);
    this.border = border;
    this.name = name;
  }
}
