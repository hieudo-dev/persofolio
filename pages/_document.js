import { Head, Html, Main, NextScript } from "next/document";

import { Analytics } from "@vercel/analytics/react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
