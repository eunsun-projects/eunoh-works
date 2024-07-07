import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import { worksData } from "@/data/worksData";
import { years_data } from "@/data/yearsData";
import { Plaiceholder, Year } from "@/types/data.type";
import { getBase64 } from "@/utils/works/getBase64";
import { Suspense } from "react";
import EveryWorks from "./_components/EveryWorks";

export const metadata = basicMeta;

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const year: Year = years_data.find((e) => e.year === slug)!;
    const works = worksData[year.year];
    const images = works.map((e) => e.src);
    const blurredImages = (await Promise.all(images.map((image) => getBase64(image)))) as Plaiceholder[];

    if (slug.length > 0 && year) {
        return (
            <Suspense fallback={<Loading />}>
                <EveryWorks year={year.year} blurredImages={blurredImages} />
            </Suspense>
        );
    }
}
