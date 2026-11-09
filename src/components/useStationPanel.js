import { useCallback, useEffect, useRef, useState } from "react";

// One station panel open at a time. Remembers which button opened it so focus
// can go back there on close, and whether any station has been opened this
// visit (the hint hides after that).
export default function useStationPanel() {
  const [openId, setOpenId] = useState(null);
  const [opened, setOpened] = useState(false);
  const current = useRef(null);
  const opener = useRef(null);

  const close = useCallback((returnFocus) => {
    current.current = null;
    setOpenId(null);
    if (returnFocus) opener.current?.focus();
  }, []);

  // A second click on the open station closes it; focus is already on it.
  const toggle = useCallback(
    (id, button) => {
      if (current.current === id) return close(false);
      current.current = id;
      opener.current = button;
      setOpenId(id);
      setOpened(true);
    },
    [close]
  );

  useEffect(() => {
    if (!openId) return;
    const onKey = (e) => {
      if (e.key === "Escape") close(true);
    };
    // A click outside the panel closes it. Clicks on station buttons are
    // theirs to handle (open another, or toggle this one shut).
    const onClick = (e) => {
      if (e.target.closest(".panel, [data-opens]")) return;
      close(document.getElementById(openId)?.contains(document.activeElement));
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openId, close]);

  return { openId, opened, toggle, close };
}
