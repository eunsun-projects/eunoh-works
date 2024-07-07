import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import { Suspense } from "react";
import WorksMain from "./_components/WorksMain";

export const metadata = basicMeta;

export default function WorksPage() {
    return (
        <Suspense fallback={<Loading />}>
            <WorksMain />
        </Suspense>
    );
}
