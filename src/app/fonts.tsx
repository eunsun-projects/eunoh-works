import { Alumni_Sans_Collegiate_One, Gothic_A1, Rubik, Rubik_Bubbles, Rubik_Mono_One, Silkscreen } from "next/font/google";

export const rubic = Rubik({
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});
export const rubicBubbles = Rubik_Bubbles({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
});
export const gothicA1 = Gothic_A1({
    weight: ["100", "200", "300", "400", "500", "600"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});
export const alumni = Alumni_Sans_Collegiate_One({
    weight: ["400"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});
export const rubicmono = Rubik_Mono_One({
    weight: ["400"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});
export const silkscreen = Silkscreen({
    weight: ["400"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
});
