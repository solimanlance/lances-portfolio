// "Click a station…" under the map, with a station circle as its bullet.
// Pointer and touch wording are both in the HTML; CSS picks one. Once a
// station has been opened it hides, keeping its space so nothing shifts.
export default function MapHint({ ui, done }) {
  return (
    <p className={`map-hint${done ? " is-done" : ""}`}>
      <svg className="map-hint-dot" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" />
      </svg>
      <span className="hint-pointer">{ui.hint}</span>
      <span className="hint-touch">{ui.hintTouch}</span>
    </p>
  );
}
