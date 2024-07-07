import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import { Suspense } from "react";
import About from "./_components/About";

export const metadata = basicMeta;

export default function AboutPage() {
    return (
        <Suspense fallback={<Loading />}>
            <About />
        </Suspense>
    );
}
