import React from "react";

type Seg = { name: string; color: string; amount: number };

const TAU = Math.PI * 2;

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export function Donut({
  data,
  size = 112,
  thickness = 18, // (1) wider slices: was 14
  gapPx = 4,
  bg = "#F7F9FB",
  capStart = "outer",
  capEnd = "inner",
}: {
  data: Seg[];
  size?: number;
  thickness?: number;
  gapPx?: number;
  bg?: string;
  capStart?: "outer" | "inner";
  capEnd?: "outer" | "inner";
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [label, setLabel] = React.useState({ xPct: 50, yPct: 50, pct: 0 });
  const [visible, setVisible] = React.useState(false);

  const w = size,
    h = size;
  const cx = w / 2,
    cy = h / 2;
  const r = (size - thickness) / 2; // leave room so caps don't clip
  const total = data.reduce((s, d) => s + d.amount, 0);

  // Increase effective angular gap so rounded caps don't visually close it.
  // Use ~30% of thickness so even small slices still show a gap.
  const gapAngle = (gapPx + thickness * 0.3) / r; // adjusted gap at centerline

  let cursor = -Math.PI / 2;
  const arcs = data.map((d) => {
    const raw = (d.amount / total) * TAU;
    const inner = Math.max(0.04, raw - gapAngle);
    const start = cursor + gapAngle / 2;
    const end = start + inner;
    cursor += raw;
    return { ...d, start, end, angleCenter: start + inner / 2, sweep: inner };
  });

  // NEW: build a filled path for a ring segment with asymmetric caps
  function ringSlicePath(
    cx: number,
    cy: number,
    rCenter: number, // centerline radius
    thickness: number,
    a0: number, // start angle (radians)
    a1: number, // end angle (radians)
    capStart: "outer" | "inner" = "outer",
    capEnd: "outer" | "inner" = "inner"
  ) {
    const Rout = rCenter + thickness / 2;
    const Rin = rCenter - thickness / 2;

    const largeOuter = a1 - a0 > Math.PI ? 1 : 0;
    const largeInner = a1 - a0 > Math.PI ? 1 : 0;

    const pOut0 = polarToCartesian(cx, cy, Rout, a0);
    const pOut1 = polarToCartesian(cx, cy, Rout, a1);
    const pIn1 = polarToCartesian(cx, cy, Rin, a1);
    const pIn0 = polarToCartesian(cx, cy, Rin, a0);

    // Half-circle cap radius
    const rc = thickness / 2;

    const endCapSweep = capEnd === "outer" ? 0 : 1; // "inner" = concave inward
    const startCapSweep = capStart === "outer" ? 1 : 0; // "outer" = bulge outward

    return [
      `M ${pOut0.x} ${pOut0.y}`,
      `A ${Rout} ${Rout} 0 ${largeOuter} 1 ${pOut1.x} ${pOut1.y}`, // outer perimeter
      `A ${rc} ${rc} 0 0 ${endCapSweep} ${pIn1.x} ${pIn1.y}`, // end cap (inner rounded)
      `A ${Rin} ${Rin} 0 ${largeInner} 0 ${pIn0.x} ${pIn0.y}`, // inner perimeter back
      `A ${rc} ${rc} 0 0 ${startCapSweep} ${pOut0.x} ${pOut0.y}`, // start cap (outer rounded)
      `Z`,
    ].join(" ");
  }

  return (
    <div className="relative group">
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
        {/* background trough */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={bg}
          strokeWidth={Math.max(1, thickness - 4)} // thinner than slices
        />

        {/* slices as FILLED paths (not strokes) */}
        <g>
          {arcs.map((s, i) => (
            <path
              key={s.name}
              d={ringSlicePath(
                cx,
                cy,
                r,
                hovered === i ? thickness + 2 : thickness,
                s.start,
                s.end,
                capStart,
                capEnd
              )}
              fill={data[i].color}
              onMouseEnter={() => {
                const pt = polarToCartesian(
                  cx,
                  cy,
                  r + thickness / 2 + 4,
                  s.angleCenter
                );
                const x = (pt.x / w) * 100;
                const y = (pt.y / h) * 100;
                const pct = Math.round((s.amount / total) * 100 * 10) / 10;
                setLabel({ xPct: x, yPct: y, pct });
                setVisible(true);
                setHovered(i);
              }}
              onMouseLeave={() => {
                setVisible(false);
                setHovered(null);
              }}
            />
          ))}
        </g>
      </svg>

      {/* floating percentage badge */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-[left,top,opacity] duration-200 ease-out"
        style={{
          left: `${label.xPct}%`,
          top: `${label.yPct}%`,
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="rounded-full bg-foreground px-2 py-1 text-background text-xs font-medium shadow">
          {label.pct.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}
