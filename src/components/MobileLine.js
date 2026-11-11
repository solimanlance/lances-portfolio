import { Fragment } from "react";

const MONTH = /^\d{4}-\d{2}$/;

// Newest first: ongoing stations (no end date) at the top in content order,
// then by end date, latest first.
function newestFirst(stations) {
  return [...stations].sort((a, b) => {
    if (!a.end || !b.end) return (a.end ? 1 : 0) - (b.end ? 1 : 0);
    return b.end.localeCompare(a.end);
  });
}

// Which zone a station sits under: the year it ended, or for ongoing work the
// year it started (the newest zone while that's still TODO).
function zoneYear(s, newest) {
  if (s.end) return Number(s.end.slice(0, 4));
  return MONTH.test(s.start) ? Number(s.start.slice(0, 4)) : newest;
}

// Under 700px the map becomes one vertical line, newest at the top.
export default function MobileLine({ stations, ui, openId, onToggle }) {
  const newest = Math.max(...ui.zones.map((z) => z.year));
  const sorted = newestFirst(stations);
  const zones = [...ui.zones]
    .sort((a, b) => b.year - a.year)
    .map((z) => ({ ...z, stations: sorted.filter((s) => zoneYear(s, newest) === z.year) }))
    .filter((z) => z.stations.length > 0);
  const first = sorted[0]?.id;
  const last = sorted[sorted.length - 1]?.id;

  return (
    <ol className="mline">
      {zones.map((z) => (
        <Fragment key={z.year}>
          <li className={`mline-zone${z.year === zones[0].year ? " is-first" : ""}`} aria-hidden="true">
            {z.label}
          </li>
          {z.stations.map((s) => {
            const where = `${s.id === first ? " is-first" : ""}${s.id === last ? " is-last" : ""}`;
            return (
              <li key={s.id} className={`mline-stop mline-stop--${s.line}${s.wip ? " is-wip" : ""}${where}`}>
                <button
                  type="button"
                  className="mline-button"
                  aria-controls={s.id}
                  aria-expanded={openId === s.id}
                  data-opens={s.id}
                  onClick={(e) => onToggle(s.id, e.currentTarget)}
                >
                  <span className="mline-dot" aria-hidden="true" />
                  <span className="mline-name">{s.label.replace(/\n/g, " ")}</span>
                  <span className="mline-dates">{s.dates}</span>
                  {s.wip && <span className="sr-only">{ui.wip}</span>}
                </button>
              </li>
            );
          })}
        </Fragment>
      ))}
    </ol>
  );
}
