import { useEffect } from "react";

import "@/styles/globals.css";
import LogRocket from "logrocket";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    LogRocket.init("k58rnb/hieudodev");
  }, []);

  return <Component {...pageProps} />;
}
