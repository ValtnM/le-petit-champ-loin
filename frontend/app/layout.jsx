import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./styles/globals.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { roboto, courgette } from "./styles/polices.js";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        style={{
          "--font-roboto": roboto.style.fontFamily,
          "--font-courgette": courgette.style.fontFamily,
        }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
