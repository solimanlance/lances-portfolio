import { Html, Head, Main, NextScript } from "next/document";
import content from "../../content.json"

export default function Document() {
  return (
    <Html lang={content.meta.lang}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
