// Small helpers shared by the map, the mobile line and the panels.

// content.json placeholders start with "TODO" (some links are just "TODO").
export const isTodo = (value) => typeof value === "string" && value.startsWith("TODO");

// A station's one-line name, for buttons and screen readers.
export const stationName = (s, ui) =>
  [s.label.replace(/\n/g, " "), s.dates, s.wip && ui.wip].filter(Boolean).join(", ");
