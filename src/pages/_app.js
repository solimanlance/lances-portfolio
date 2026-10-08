import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-mono",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${grotesk.variable} ${mono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
