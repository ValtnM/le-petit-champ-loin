import type { Metadata } from "next";
import Header from "../components/Header";
import "../styles/globals.scss";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { roboto, courgette } from "./polices";





// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body style={{
          "--font-roboto": roboto.style.fontFamily,
          "--font-courgette": courgette.style.fontFamily,
        } as React.CSSProperties}>
        <Header />
        {children}
      </body>
    </html>
  );
}
