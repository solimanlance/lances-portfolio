import Head from "next/head";
import content from "../../content.json";

const { meta, hero } = content;

export default function Home() {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <main>
        <h1>{hero.name}</h1>
        <p>{hero.intro}</p>
      </main>
    </>
  );
}