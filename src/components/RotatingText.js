import { useEffect, useMemo, useState } from "react";

const TYPE_MS = 45;
const ERASE_MS = 22;
const HOLD_MS = 2500;
const NEXT_MS = 300;
const STRIKE_MS = 400; // pause before a strike word gets its line
const REDUCED_MS = 3000; // reduced motion: whole phrases,


const toPhrase = (p) => (typeof p === "string" ? { text: p } : p);

export default function RotatingText({ phrases: entries }) {
  const phrases = useMemo(() => entries.map(toPhrase), [entries]);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].text.length);
  const [phase, setPhase] = useState("hold"); // "type" | "hold" | "erase"
  const [struck, setStruck] = useState(Boolean(phrases[0].strike));
  const [reduced, setReduced] = useState(null); // unknown until hydrated


useEffect(() => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  const update = () => setReduced(query.matches);
  update();
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}, []);

useEffect(() => {
  const phrase = phrases[index];
  if (reduced === null) return;
  const show = (i, n, strike) => {
    setIndex(i);
    setLength(n);
    setStruck(strike);
  };
  let timeout;

  if (reduced) {
    // each phrase in its final state: full text, strike already drawn
    if (length !== phrase.text.length) show(index, phrase.text.length, Boolean(phrase.strike));
    timeout = setTimeout(() => {
      const next = (index + 1) % phrases.length;
      show(next, phrases[next].text.length, Boolean(phrases[next].strike));
    }, REDUCED_MS);
  } else if (phase === "type") {
    timeout =
      length < phrase.text.length
        ? setTimeout(() => setLength(length + 1), TYPE_MS)
        : setTimeout(() => setPhase("hold"), 0);
  } else if (phase === "hold") {
    timeout =
    phrase.strike && !struck
      ? setTimeout(() => setStruck(true), STRIKE_MS)
      : setTimeout(() => setPhase("erase"), HOLD_MS);
  } else {
    timeout =
      length > 0
        ? setTimeout(() => setLength(length - 1), ERASE_MS)
        : setTimeout(() => {
          show((index + 1) % phrases.length, 0, false);
          setPhase("type");
        }, NEXT_MS);
  }
  return () => clearTimeout(timeout);
}, [reduced, phrases, index, length, phase, struck]);

return (
  <>
    <span aria-hidden="true">
      <Typed phrase={phrases[index]} length={length} struck={struck} />
    </span>
    {!reduced && <span className="caret" aria-hidden="true" />}
    <span className="sr-only">{phrases.map((p) => p.text).join(" ")}</span>
  </>
);
}

// the first `length` characters, with the strike/highlight word wrapped once
// typing reaches it.
function Typed({ phrase, length, struck }) {
  const shown = phrase.text.slice(0, length);
  const word = phrase.strike || phrase.highlight;
  const at = word ? phrase.text.indexOf(word) : -1;
  if (at < 0 || length <= at) return shown;
  return (
    <>
      {shown.slice(0, at)}
      <span className={phrase.strike ? `strike${struck ? " is-struck" : ""}` : "hl"}>
        {shown.slice(at, at + word.length)}
      </span>
      {shown.slice(at + word.length)}
    </>
  );
}
