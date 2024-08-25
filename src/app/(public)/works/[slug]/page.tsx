import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import { worksData } from "@/data/worksData";
import { years_data } from "@/data/yearsData";
import { Year } from "@/types/data.type";
import { Suspense } from "react";
import EveryWorks from "./_components/EveryWorks";
import getBlurredImageAsBase64 from "@/utils/works/getBlurredImgAsBase64";

export const metadata = basicMeta;

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const year: Year = years_data.find((e) => e.year === slug)!;
    const works = worksData[year.year];
    const images = works.map((e) => e.src);
    const blurredImages = await Promise.all(
        images.map((image) => getBlurredImageAsBase64(image))
    );

    if (slug.length > 0 && year) {
        return (
            <Suspense fallback={<Loading />}>
                {blurredImages.length > 0 && (
                    <EveryWorks
                        year={year.year}
                        blurredImages={blurredImages}
                    />
                )}
            </Suspense>
        );
    }
}
