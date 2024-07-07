import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import { sliceArrayByLimit } from "@/utils/texts/sliceArrayByLimit";
import { Suspense } from "react";
import { getData } from "../layout";
import TextContents from "./_components/TextContents";

export const metadata = basicMeta;

const totalPageArray = (length: number, limit: number) => {
    const slicedPageArray = sliceArrayByLimit(length, limit);

    return slicedPageArray;
};

export default function TextsSlugPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const posts = getData();

    const pageArr = totalPageArray(posts.length, 5);

    const find = posts.find((e) => e.page === slug);

    if (slug.length > 0 && find) {
        return (
            <Suspense fallback={<Loading />}>
                <TextContents post={find} pageArr={pageArr} />
            </Suspense>
        );
    }
}
