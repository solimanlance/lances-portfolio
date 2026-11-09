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

// The desktop map: one hand-placed inline SVG. Positions come from
// mapLayout.js, words come from content.json.
export default function TransitMap({ stations, ui }) {
  const zoneLabel = (year) => ui.zones.find((z) => z.year === year)?.label;

  return (
    <div className="map-figure">
      <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} role="img" aria-label={ui.mapTitle}>
        <g>
          {ZONES.slice(1).map((z) => (
            <line key={z.year} className="zone-edge" x1={z.x0} y1={ZONE_EDGE.y0} x2={z.x0} y2={ZONE_EDGE.y1} />
          ))}
          {ZONES.map((z) => (
            <text key={z.year} className="zone-label" x={(z.x0 + z.x1) / 2} y={ZONE_LABEL_Y} textAnchor="middle">
              {zoneLabel(z.year)}
            </text>
          ))}
        </g>

        <g className="line line--projects">
          <path className="track" d={LINES.projects} />
          <path className="track track--branch" d={LINES.hackathon} />
          <path className="track track--wip" d={LINES.wip} />
        </g>
        <g className="line line--work">
          <path className="track" d={LINES.work} />
        </g>
        <circle className="crossing" cx={CROSSING.x} cy={CROSSING.y} r="4" />

        <g>
          {stations.map((s) => {
            const at = STATIONS[s.id];
            if (!at) return null;
            return (
              <g key={s.id} className={`station station--${s.line}`} data-station={s.id}>
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

        <g className="legend" aria-hidden="true">
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
    </div>
  );
}
