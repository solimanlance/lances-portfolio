import { useEffect, useRef, useState } from "react";
import {
  VIEW,
  ZONES,
  ZONE_LABEL_Y,
  ZONE_EDGE,
  LINES,
  CROSSING,
  STATIONS,
  LABEL_LINE_HEIGHT,
  LEGEND,
} from "@/data/mapLayout";
import { stationName } from "./stations";

const PAD = 6; // breathing room around each station's button, in map units
const pct = (v, of) => `${(v / of) * 100}%`;

// Before fonts load we can't measure labels, so start each button on its circle.
function circleBoxes() {
  return Object.fromEntries(
    Object.entries(STATIONS).map(([id, { x, y }]) => [id, { x: x - 14, y: y - 14, width: 28, height: 28 }])
  );
}

// The desktop map: one hand-placed inline SVG, with a real <button> laid over
// each station so it's keyboard- and screen-reader-operable. Positions come
// from mapLayout.js, words come from content.json.
export default function TransitMap({ stations, ui, openId, onToggle }) {
  const svg = useRef(null);
  const [lit, setLit] = useState(null);
  const [hot, setHot] = useState(null);
  const [boxes, setBoxes] = useState(circleBoxes);

  // Size each button to its station's circle + label (getBBox is in map
  // units, so the buttons scale with the SVG and never need re-measuring).
  useEffect(() => {
    const measure = () => {
      const next = {};
      svg.current.querySelectorAll("[data-station]").forEach((g) => {
        const { x, y, width, height } = g.getBBox();
        next[g.dataset.station] = { x, y, width, height };
      });
      setBoxes(next);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  const zoneLabel = (year) => ui.zones.find((z) => z.year === year)?.label;
  const lineHover = (line) => ({
    onMouseEnter: () => setLit(line),
    onMouseLeave: () => setLit(null),
  });

  return (
    <div className="map-figure">
      <svg ref={svg} viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="img" aria-label={ui.mapTitle} data-lit={lit ?? undefined}>
        <g className="fade">
          {ZONES.slice(1).map((z) => (
            <line key={z.year} className="zone-edge" x1={z.x0} y1={ZONE_EDGE.y0} x2={z.x0} y2={ZONE_EDGE.y1} />
          ))}
          {ZONES.map((z) => (
            <text key={z.year} className="zone-label" x={(z.x0 + z.x1) / 2} y={ZONE_LABEL_Y} textAnchor="middle">
              {zoneLabel(z.year)}
            </text>
          ))}
        </g>

        {/* pathLength=1 lets one dash value draw every path */}
        <g className="line line--projects" {...lineHover("projects")}>
          <path className="track draw" pathLength="1" d={LINES.projects} />
          <path className="track track--branch draw" pathLength="1" d={LINES.hackathon} style={{ animationDelay: "250ms" }} />
          <path className="track track--wip fade" d={LINES.wip} />
        </g>
        <g className="line line--work" {...lineHover("work")}>
          <path className="track draw" pathLength="1" d={LINES.work} style={{ animationDelay: "150ms" }} />
        </g>
        <circle className="crossing fade" cx={CROSSING.x} cy={CROSSING.y} r="4" />

        <g className="fade">
          {stations.map((s) => {
            const at = STATIONS[s.id];
            if (!at) return null;
            const state = `${hot === s.id ? " is-hot" : ""}${openId === s.id ? " is-open" : ""}`;
            return (
              <g key={s.id} className={`station station--${s.line}${state}`} data-station={s.id}>
                <circle className="station-dot" cx={at.x} cy={at.y} r="9" />
                <text className="station-label" x={at.label.x} y={at.label.y} textAnchor={at.label.anchor}>
                  {s.label.split("\n").map((line, i) => (
                    <tspan key={i} x={at.label.x} dy={i ? LABEL_LINE_HEIGHT : 0}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </g>

        <g className="legend fade" aria-hidden="true">
          {[
            ["work", "var(--canada)", 6],
            ["projects", "var(--expo)", 6],
            ["hackathon", "var(--expo)", 3],
          ].map(([key, colour, width], i) => {
            const y = LEGEND.y + i * LEGEND.row;
            return (
              <g key={key}>
                <line x1={LEGEND.x} y1={y} x2={LEGEND.x + LEGEND.swatch} y2={y} stroke={colour} strokeWidth={width} />
                <text x={LEGEND.x + LEGEND.swatch + 8} y={y + 4}>
                  {ui.legend[key]}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="map-hits">
        {stations.map((s) => {
          const b = boxes[s.id];
          if (!b) return null;
          return (
            <button
              key={s.id}
              type="button"
              className="map-hit"
              style={{
                left: pct(b.x - PAD, VIEW.w),
                top: pct(b.y - PAD, VIEW.h),
                width: pct(b.width + 2 * PAD, VIEW.w),
                height: pct(b.height + 2 * PAD, VIEW.h),
              }}
              aria-label={stationName(s, ui)}
              aria-controls={s.id}
              aria-expanded={openId === s.id}
              data-opens={s.id}
              onClick={(e) => onToggle(s.id, e.currentTarget)}
              onMouseEnter={() => setHot(s.id)}
              onMouseLeave={() => setHot(null)}
              onFocus={() => setHot(s.id)}
              onBlur={() => setHot(null)}
            />
          );
        })}
      </div>
    </div>
  );
}
