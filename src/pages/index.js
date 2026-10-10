import Head from "next/head";
import content from "../../content.json";
import Hero from "@/components/Hero";

const { meta, hero } = content;

export default function Home() {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <main>
        <main className="hero">
        <Hero hero={hero} />
        </main>
      </main>
    </>
  );
}