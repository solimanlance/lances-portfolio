import Head from "next/head";
import content from "../../content.json";
import Hero from "@/components/Hero";
import TransitMap from "@/components/TransitMap";
import MapHint from "@/components/MapHint";
import StationPanels from "@/components/StationPanels";
import useStationPanel from "@/components/useStationPanel";

const { meta, ui, hero, stations } = content;

export default function Home() {
  const { openId, opened, toggle, close } = useStationPanel();

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
            <TransitMap stations={stations} ui={ui} openId={openId} onToggle={toggle} />
            <MapHint ui={ui} done={opened} />
          </div>
        </nav>
      </main>

      <StationPanels stations={stations} ui={ui} openId={openId} onClose={close} />
    </>
  );
}
