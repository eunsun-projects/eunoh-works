import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import QueryProvider from "@/providers/QueryProvider";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { basicMeta } from "./basicMeta";
import { rubic } from "./fonts";
import "./globals.css";

export const metadata: Metadata = basicMeta;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = headers();
    const header_url = headersList.get("x-url") || undefined;
    let lastSegment = undefined;

    // URL 객체 생성
    if (header_url) {
        const url = new URL(header_url);

        // pathname에서 마지막 부분 추출
        const pathSegments = url.pathname.split("/");
        lastSegment = pathSegments.pop() || pathSegments.pop();
    }

    return (
        <html lang="ko">
            <body className={`${rubic.className} w-full h-dvh p-[0px] m-[0px] box-border`}>
                <QueryProvider>
                <section className="w-full h-full flex flex-col relative">
                    <Header slug={lastSegment} />
                    <main className="flex-1 h-full w-full flex overflow-auto">{children}</main>
                        <Footer slug={lastSegment} />
                    </section>
                </QueryProvider>
                <Analytics />
            </body>
        </html>
    );
}
