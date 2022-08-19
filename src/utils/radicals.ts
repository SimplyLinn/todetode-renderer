export type Stroke = {
  points: [x: number, y: number][];
  closed?: boolean;
};

export const LEFT = Symbol('left');
export const RIGHT = Symbol('right');
export const UP = Symbol('up');
export const DOWN = Symbol('down');

export type Direction = typeof LEFT | typeof RIGHT | typeof UP | typeof DOWN;

interface BaseRadical {
  strokes: Stroke[];
  inside:
    | {
        type: 'rect';
        x: number;
        y: number;
        w: number;
        h: number;
      }
    | {
        type: 'circle';
        x: number;
        y: number;
        r: number;
      }
    | null;
  directional?: boolean;
}

interface DirectionalRadical extends BaseRadical {
  directional: true;
  baseDirection: Direction;
  enabledDirections: Direction[];
}

interface DirectionlessRadical extends BaseRadical {
  directional?: false;
}

export type Radical = DirectionalRadical | DirectionlessRadical;

function asRadical(radical: Radical): Radical {
  return radical;
}

function circleInTriangle(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
): { type: 'circle'; x: number; y: number; r: number } {
  const a = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  const b = Math.sqrt((x2 - x3) ** 2 + (y2 - y3) ** 2);
  const c = Math.sqrt((x3 - x1) ** 2 + (y3 - y1) ** 2);
  const p = a + b + c;
  const area =
    (Math.max(x1, x2, x3) - Math.min(x1, x2, x3)) *
    (Math.max(y1, y2, y3) - Math.min(y1, y2, y3));
  const r = area / p;
  const x = (x1 + x2 + x3) / 3;
  const y = (y1 + y2 + y3) / 3;
  return { type: 'circle', x, y, r };
}

const radicals = {
  WATER: asRadical({
    strokes: [
      {
        points: [
          [0, 1],
          [1, 1],
        ],
      },
    ],
    inside: null,
  }),
  FLY_WINGLESS: asRadical({
    strokes: [
      {
        points: [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      },
    ],
    inside: {
      type: 'rect',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
  }),
  FLY_WINGED: asRadical({
    strokes: [
      {
        points: [
          [0, 0],
          [1 / 3, 0],
          [1 / 3, 1],
          [2 / 3, 1],
          [2 / 3, 0],
          [1, 0],
        ],
      },
    ],
    inside: {
      type: 'rect',
      x: 1 / 3,
      y: 0,
      w: 1 / 3,
      h: 1,
    },
  }),
  TREE: asRadical({
    strokes: [
      {
        points: [
          [1 / 2, 0],
          [1 / 2, 1],
        ],
      },
    ],
    inside: null,
  }),
  RAIN: asRadical({
    strokes: [
      {
        points: [
          [0, 0],
          [1 / 2, 1],
          [1, 0],
        ],
      },
    ],
    inside: circleInTriangle(0, 0, 1 / 2, 1, 1, 0),
  }),
  WIND: asRadical({
    strokes: [
      {
        points: [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      },
    ],
    directional: true,
    baseDirection: RIGHT,
    enabledDirections: [RIGHT, LEFT],
    inside: {
      type: 'rect',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
  }),
  FIRE: asRadical({
    strokes: [
      {
        points: [
          [0, 1],
          [1 / 2, 0],
          [1, 1],
        ],
      },
    ],
    inside: circleInTriangle(0, 0, 1 / 2, 0, 1, 1),
  }),
  BERD: asRadical({
    strokes: [
      {
        points: [
          [1 / 2, 0],
          [1 / 2, 1],
        ],
      },
      {
        points: [
          [0, 1 / 2],
          [1, 1 / 2],
        ],
      },
    ],
    inside: null,
  }),
  TODE: asRadical({
    strokes: [
      {
        points: [
          [0, 1],
          [0, 0],
          [1, 0],
          [1, 1],
        ],
      },
    ],
    inside: {
      type: 'rect',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
  }),
  BOT: asRadical({
    strokes: [
      {
        points: [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 0],
        ],
        closed: true,
      },
    ],
    inside: {
      type: 'rect',
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    },
  }),
  LIKE: asRadical({
    strokes: [
      {
        points: [[1 / 2, 1 / 2]],
      },
    ],
    inside: null,
  }),
};

export type Radicals = keyof typeof radicals;

export default radicals;
