import Header from "../components/Header/Header";
import "./styles/globals.scss";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import { roboto, courgette } from "./styles/polices";

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
