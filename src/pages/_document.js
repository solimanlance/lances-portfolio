import { Html, Head, Main, NextScript } from "next/document";
import content from "../../content.json";

export default function Document() {
  return (
    <Html lang={content.meta.lang}>
      <Head>
        {/* Without JS the panels can't open, so show them all as a plain list. */}
        <noscript>
          <style>{`.panel[hidden]{display:block}.panel{position:static!important;width:auto;max-width:40rem;height:auto!important;margin:16px}.map-hint{display:none}`}</style>
        </noscript>
      </Head>
      <body className="bg-bg text-ink antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
