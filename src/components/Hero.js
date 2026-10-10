import { Fragment } from "react";
import { isTodo } from "./stations";

// left column: the stacked name, the rotating line, the intro and the links.
export default function Hero({ hero }) {
  return (
    <div className="hero-text">
      <h1 className="hero-name">{hero.name}</h1>
      <p className="hero-intro">{hero.intro}</p>
      <p className="hero-links">
        {hero.links.map((link, i) => (
          <Fragment key={link.label}>
            {i > 0 && " - "}
            {isTodo(link.href) ? (
              <a className="todo" href="#" title={link.href}>
                {link.label}
              </a>
            ) : (
              <a href={link.href}>{link.label}</a>
            )}
          </Fragment>
        ))}
      </p>
    </div>
  );
}