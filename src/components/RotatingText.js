import { useEffect, useMemo, useState } from "react";

const TYPE_MS = 45;
const ERASE_MS = 22;
const HOLD_MS = 2500;
const NEXT_MS = 300;
const STRIKE_MS = 400; // pause before a strike word gets its line

const toPhrase = (p) => (typeof p === "string" ? { text: p } : p);

export default function RotatingText({ phrases: entries }) {
  const phrases = useMemo(() => entries.map(toPhrase), [entries]);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].text.length);
  const [phase, setPhase] = useState("hold"); // "type" | "hold" | "erase"
  const [struck, setStruck] = useState(Boolean(phrases[0].strike));


useEffect(() => {
  const phrase = phrases[index];
  let timeout;

  if (phase === "type") {
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
          setIndex((index + 1) % phrases.length);
          setStruck(false);
          setPhase("type");
        }, NEXT_MS);
  }
  return () => clearTimeout(timeout);
}, [phrases, index, length, phase, struck]);

return (
  <>
    <span>
      <Typed phrase={phrases[index]} length={length} struck={struck} />
    </span>
    <span className="caret" aria-hidden="true" />
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
