import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import { years_data } from "@/data/yearsData";
import { Year } from "@/types/data.type";
import { Suspense } from "react";
import EveryWorks from "./_components/EveryWorks";

export const metadata = basicMeta;

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const year: Year = years_data.find((e) => e.year === slug)!;

    if (slug.length > 0 && year) {
        return (
            <Suspense fallback={<Loading />}>
                <EveryWorks year={year.year} />
            </Suspense>
        );
    }
}
