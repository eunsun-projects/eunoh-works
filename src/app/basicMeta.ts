import { Metadata } from "next";

export const basicMeta: Metadata = {
    title: "Eun Oh's Home",
    description: "Eun Oh's Home",
    generator: "Next.js",
    applicationName: "Eun Oh's Home",
    keywords: ["eunoh", "art", "development"],
    authors: [{ name: "EunOh" }, { name: "EunOh", url: "https://eunoh.top" }],
    creator: "EunOh",
    publisher: "EunOh",
    metadataBase: new URL("https://eunoh.top"),
    alternates: {
        canonical: "/",
        languages: {
            "ko-KR": "/",
        },
    },
    openGraph: {
        title: "Eun Oh's Home",
        description: "Eun Oh's Home",
        url: "https://eunoh.top",
        siteName: "Eun Oh's Home",
        images: [
            {
                url: "https://raw.githubusercontent.com/EunOh1/public/f66e0067229129127878b70adb58304fcbabd6db/balzac.jpg",
                width: 800,
                height: 600,
            },
        ],
        locale: "ko_KR",
        type: "website",
    },
    icons: {
        icon: "/favicon.png",
        shortcut: "/favicon.png",
        apple: "/favicon.png",
        other: {
            rel: "apple-touch-icon-precomposed",
            url: "/favicon.png",
        },
    },
};

export const basicViewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
    viewportFit: "cover",
};
