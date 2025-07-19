import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // if (status === "unauthenticated") {
    //   router.push("/login");
    // }

    // if (status === "authenticated" && router.pathname === "/login") {
    //   router.push("/");
    // }

  }, [status, router])

  return <>{children}</>;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const hideNavbarRoutes = ["/login"];

  return (
    <SessionProvider session={session}>
      <AuthGuard>
        <main className={`${inter.className} max-w-[1440px] mx-auto`}>
          {!hideNavbarRoutes.includes(router.pathname) && <Navbar />}
          <Component {...pageProps} />
        </main>
      </AuthGuard>
    </SessionProvider>
  );
}
