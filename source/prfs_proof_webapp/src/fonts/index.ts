import { Chivo, Roboto } from "next/font/google";

export const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
});

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
