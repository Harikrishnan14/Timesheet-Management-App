import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNavbarRoutes = ["/login"];

  return (
    <main className={`${inter.className} max-w-[1440px] mx-auto`}>
      {!hideNavbarRoutes.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </main>
  );
}
