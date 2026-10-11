import { useEffect, useMemo, useState } from "react";

const TYPE_MS = 45;
const ERASE_MS = 22;
const HOLD_MS = 2500;
const NEXT_MS = 300;

const toPhrase = (p) => (typeof p === "string" ? { text: p } : p);

export default function RotatingText({ phrases: entries }) {
  const phrases = useMemo(() => entries.map(toPhrase), [entries]);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].text.length);
  const [phase, setPhase] = useState("hold"); // "type" | "hold" | "erase"


useEffect(() => {
  const phrase = phrases[index];
  let timeout;

  if (phase === "type") {
    timeout =
      length < phrase.text.length
        ? setTimeout(() => setLength(length + 1), TYPE_MS)
        : setTimeout(() => setPhase("hold"), 0);
  } else if (phase === "hold") {
    timeout = setTimeout(() => setPhase("erase"), HOLD_MS);
  } else {
    timeout =
      length > 0
        ? setTimeout(() => setLength(length - 1), ERASE_MS)
        : setTimeout(() => {
            setIndex((index + 1) % phrases.length);
            setPhase("type");
          }, NEXT_MS);
  }
  return () => clearTimeout(timeout);
}, [phrases, index, length, phase]);

return (
  <>
    <span>{phrases[index].text.slice(0, length)}</span>
    <span className="caret" aria-hidden="true" />
  </>
);
}
