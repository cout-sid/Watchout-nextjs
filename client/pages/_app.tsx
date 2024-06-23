import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
// import { LoginProvider } from "@/context/LoginContext";
// import { authOptions } from "./api/auth/[...nextauth]";
import {SessionProvider} from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const router=useRouter();
  const noNavbarRoutes = ['/'];

  return (
    <SessionProvider session={pageProps.session}>
    {/* <LoginProvider> */}
      {!noNavbarRoutes.includes(router.pathname) && <Navbar />}
      {/* <div className={noNavbarRoutes.includes(router.pathname) ? '' : 'pb-40 pt-20'}>
       */}
       <div className="pb-40 pt-20">
        <Component {...pageProps} />
      </div>
    {/* </LoginProvider> */}
    </SessionProvider>
  );
}
