import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from 'react';
import radicals, {
  Radicals,
  Radical as RadicalType,
  Direction,
  Stroke as StrokeType,
} from '../utils/radicals';

export interface Props extends React.SVGProps<SVGGElement> {
  radical: Radicals | RadicalType;
  dir?: Direction;
  size: number;
}

interface StrokeProps extends React.SVGProps<SVGPathElement> {
  radicalStroke: StrokeType;
  size: number;
}

function Stroke({ radicalStroke, size, ...props }: StrokeProps): JSX.Element {
  useEffect(() => {
    console.log(radicalStroke.points);
  }, [radicalStroke]);
  const d = useMemo(() => {
    const [start, ...rest] = radicalStroke.points;
    return `M ${start[0] * size},${start[1] * size} L ${rest
      .map(([x, y]) => `${x * size},${y * size}`)
      .join(' L ')} ${radicalStroke.closed ? 'Z' : ''}`;
  }, [radicalStroke, size]);
  return <path {...props} d={d} />;
}

function RenderInside({
  radical,
  size,
  strokeWidth = 0,
  margin = 5,
}: {
  radical: RadicalType;
  size: number;
  strokeWidth?: number;
  margin?: number;
}): JSX.Element | null {
  const { inside } = radical;
  const top = useMemo(() => {
    return radical.strokes.reduce((acc, cur) => {
      return Math.min(
        acc,
        cur.points.reduce((acc2, cur2) => Math.min(acc2, cur2[1]), Infinity),
      );
    }, Infinity);
  }, [radical]);
  if (inside?.type === 'circle') {
    return (
      <circle
        stroke="red"
        cx={inside.x * size}
        cy={inside.y * size}
        r={inside.r * size - strokeWidth - margin}
      />
    );
  }
  if (inside?.type === 'rect') {
    return (
      <rect
        stroke="red"
        x={inside.x * size + strokeWidth + margin}
        y={inside.y * size + strokeWidth + margin}
        width={inside.w * size - strokeWidth * 2 - margin * 2}
        height={inside.h * size - strokeWidth * 2 - margin * 2}
      />
    );
  }
  return (
    <rect
      stroke="red"
      x={margin}
      y={top * size - size - strokeWidth + margin}
      width={size - margin * 2}
      height={size - margin * 2}
    />
  );
}

export default function Radical({
  radical,
  dir,
  size,
  strokeWidth,
  ...props
}: Props): JSX.Element {
  const rad = typeof radical === 'string' ? radicals[radical] : radical;
  const [keyMap] = useState(() => new WeakMap());
  const keyIndex = useRef(0);
  const getKey = useCallback(
    (obj) => {
      const curKey = keyMap.get(obj);
      if (curKey != null) {
        return curKey;
      }
      const newKey = `key-${keyIndex.current}`;
      keyIndex.current += 1;
      keyMap.set(obj, newKey);
      return newKey;
    },
    [keyMap],
  );
  return (
    <g strokeWidth={strokeWidth} {...props}>
      {rad.strokes.map((stroke) => (
        <Stroke radicalStroke={stroke} size={size} key={getKey(stroke)} />
      ))}
      <RenderInside
        size={size}
        strokeWidth={typeof strokeWidth !== 'string' ? strokeWidth : undefined}
        radical={rad}
      />
    </g>
  );
}
