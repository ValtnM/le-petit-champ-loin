import { Roboto, Courgette } from "next/font/google";

// Importation des polices
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-roboto'
});

export const courgette = Courgette({
    subsets: ["latin"],
    weight: "400",
    variable: '--font-courgette'
});
