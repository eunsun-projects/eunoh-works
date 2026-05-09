import { Suspense } from "react";
import { basicMeta } from "@/app/basicMeta";
import Loading from "@/app/loading";
import { sliceArrayByLimit } from "@/utils/texts/sliceArrayByLimit";
import { getData } from "../_lib/getData";
import TextContents from "./_components/TextContents";

export const metadata = basicMeta;
export const dynamic = "force-static";

const totalPageArray = (length: number, limit: number) => {
	const slicedPageArray = sliceArrayByLimit(length, limit);

	return slicedPageArray;
};

export default async function TextsSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

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
