import { useEffect, useLayoutEffect, useRef } from "react";
import { BAR_COLOUR, isTodo } from "./stations";

const SHEET = "(max-width: 699px)";
const GAP = 16; // between the station and the panel
const MARGIN = 16; // from the viewport edge

// Beside its station on the map, flipping sides when it would run off-screen.
// Under 700px the CSS turns it into a bottom sheet and these styles are cleared.
function place(panel, id) {
  const station = document.querySelector(`[data-station="${id}"]`);
  if (window.matchMedia(SHEET).matches || !station) {
    panel.style.left = panel.style.top = "";
    return;
  }
  const box = station.getBoundingClientRect(); // circle + label: keep clear of both
  const dot = station.querySelector(".station-dot").getBoundingClientRect();
  const w = panel.offsetWidth;
  const h = panel.offsetHeight;
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;

  let x = box.right + GAP;
  if (x + w > vw - MARGIN) x = box.left - GAP - w;
  x = Math.max(MARGIN, Math.min(x, vw - MARGIN - w));
  let y = dot.top + dot.height / 2 - 22; // bar level with the station
  y = Math.max(MARGIN, Math.min(y, vh - MARGIN - h));

  panel.style.left = `${x + window.scrollX}px`;
  panel.style.top = `${y + window.scrollY}px`;
}

// Every station's panel is in the HTML from the start, hidden until opened.
export default function StationPanels({ stations, ui, openId, onClose }) {
  const refs = useRef({});

  useLayoutEffect(() => {
    const panel = refs.current[openId];
    if (!panel) return;
    place(panel, openId);
    panel.focus({ preventScroll: true });
  }, [openId]);

  useEffect(() => {
    if (!openId) return;
    const replace = () => place(refs.current[openId], openId);
    window.addEventListener("resize", replace);
    return () => window.removeEventListener("resize", replace);
  }, [openId]);

  return (
    <div className="panels">
      {stations.map((s) => (
        <section
          key={s.id}
          id={s.id}
          ref={(el) => (refs.current[s.id] = el)}
          className="panel"
          role="dialog"
          aria-labelledby={`${s.id}-title`}
          tabIndex={-1}
          hidden={openId !== s.id}
          style={{ "--c": BAR_COLOUR[s.line] }}
        >
          <div className="panel-bar">
            <h2 id={`${s.id}-title`} className="panel-title">
              {s.title}
            </h2>
            <span className="panel-meta">
              {s.wip && <span className="panel-wip">{ui.wip}</span>}
              <span className="panel-dates">{s.dates}</span>
            </span>
            <button type="button" className="panel-close" aria-label={ui.close} onClick={() => onClose(true)}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="panel-body">
            <p className="panel-tagline">{s.tagline}</p>
            {s.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="panel-stack">{s.stack.join(" · ")}</p>
            {s.links.length > 0 && (
              <p className="panel-links">
                {s.links.map((link, i) => (
                  <span key={link.label + i}>
                    {i > 0 && " · "}
                    {isTodo(link.href) ? (
                      <a className="todo" href="#" title={link.href}>
                        {link.label}
                      </a>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
