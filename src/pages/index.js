import Head from "next/head";
import content from "../../content.json";
import Hero from "@/components/Hero";
import TransitMap from "@/components/TransitMap";

const { meta, ui, hero, stations } = content;

export default function Home() {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <main className="hero">
        <Hero hero={hero} />
        <nav className="map" aria-label={ui.mapTitle}>
          <div className="map-inner">
            <TransitMap stations={stations} ui={ui} />
          </div>
        </nav>
      </main>
    </>
  );
}
