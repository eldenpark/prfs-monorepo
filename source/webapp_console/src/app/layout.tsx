import "@taigalabs/prfs-react-components/src/react_components.scss";
import "./globals.scss";

import React from "react";
import { Metadata } from "next";
import TopProvider from "./TopProvider";

export const metadata: Metadata = {
  title: "Prfs Console",
  description: "Where proofs are made",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
        <TopProvider>{children}</TopProvider>
      </body>
    </html>
  );
}
