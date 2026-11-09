// Hand-placed layout for the desktop map, in SVG user units. Transit maps are
// drawn by hand, so nothing here is computed: move a station by editing its
// numbers. Copy (labels, zone names) lives in content.json; this file only
// says where things go.
//
// Zones run left to right by year. '26 is the widest (~41%) because it holds
// the newest work; '24 is the narrowest. A label must stay inside its zone,
// so check the boundaries below when you nudge one.

export const VIEW = { w: 800, h: 460 };

export const ZONES = [
  { year: 2024, x0: 0, x1: 220 },
  { year: 2025, x0: 220, x1: 470 },
  { year: 2026, x0: 470, x1: 800 },
];
export const ZONE_LABEL_Y = 36;
export const ZONE_EDGE = { y0: 54, y1: 440 };

// Line paths. Projects runs left to right, then 45° down; the dashed WIP
// stretch carries on from Campus Insights into '26. Work crosses the diagonal.
export const LINES = {
  projects: "M30 180 H325 L440 295 H460",
  wip: "M460 295 H760",
  hackathon: "M165 180 V90",
  work: "M350 235 H770",
};

// Where Work crosses the Projects diagonal: a plain dot, not a station.
export const CROSSING = { x: 380, y: 235 };

// Station centres and label anchors. `y` on a label is the first baseline;
// later lines (from "\n" in the label) follow at LABEL_LINE_HEIGHT.
export const LABEL_LINE_HEIGHT = 23;
export const STATIONS = {
  stocksim: { x: 75, y: 180, label: { x: 75, y: 218, anchor: "middle" } },
  hellohacks: { x: 165, y: 90, label: { x: 165, y: 68, anchor: "middle" } },
  wildlife: { x: 288, y: 180, label: { x: 288, y: 158, anchor: "middle" } },
  insights: { x: 460, y: 295, label: { x: 466, y: 333, anchor: "end" } }, // kept left of the '25/'26 edge
  eoas: { x: 540, y: 235, label: { x: 540, y: 213, anchor: "middle" } },
  portfolio: { x: 585, y: 295, label: { x: 585, y: 333, anchor: "middle" } },
  nba: { x: 705, y: 295, label: { x: 705, y: 333, anchor: "middle" } },
};

// Legend, bottom-left: one row per line.
export const LEGEND = { x: 20, y: 396, row: 18, swatch: 26 };
